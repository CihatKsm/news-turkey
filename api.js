const { default: axios } = require("axios");
const cheerio = require('cheerio');
const mounts = [{ i: 1, t: 'Ocak' }, { i: 2, t: 'Şubat' }, { i: 3, t: 'Mart' }, { i: 4, t: 'Nisan' }, { i: 5, t: 'Mayıs' }, { i: 6, t: 'Haziran' }, { i: 7, t: 'Temmuz' }, { i: 8, t: 'Ağustos' }, { i: 9, t: 'Eylül' }, { i: 10, t: 'Ekim' }, { i: 11, t: 'Kasım' }, { i: 12, t: 'Aralık' }]

module.exports = async ({ count, category, tag }) => {
    if (!count) return new Error('count option is required.');
    if (isNaN(Number(count))) return new Error('count option must be a number.');
    if (Number(count) > 200) return new Error('count option must be less than 200.');

    const id = (x) => (Math.random() * (Number(`0.${Date.now()}`))).toString(36).substring(2);
    const pages = Math.floor(Number(count) / 20) + (Number(count) % 20 > 0 ? 1 : 0);
    let newsList = [];

    for (let page = 0; page < pages; page++) {
        const { data } = await axios.get(`https://trthaber.com/ajax/getHeadlineNews/${page + 1}/`).catch(e => ({ data: null })) || { data: null };
        if (!data) continue;
        const $ = cheerio.load(data);
        $('.row .standard-card').each((i, element) => {
            const ctgry = $(element).find('.text-frame .category-tag').text().trim() || null;
            const lnk = $(element).find('.text-frame .title a').attr('href') || null;
            const txt = $(element).find('.text-frame .title').text().trim() || null;
            const img = $(element).find('.image-frame.with-icon picture img').attr('data-src') || null;
            newsList.push({ id: id(), category: ctgry, title: txt, image: img, link: lnk ? 'https://trthaber.com/' + lnk : null });
        });
    }

    for (let newData of newsList) {
        const { data } = await axios.get(newData.link).catch(e => ({ data: null })) || { data: null };
        if (!data) continue;
        const $ = cheerio.load(data);

        let newTags = [];
        let newDesc = [];
        $('.news-tags .tags a').each((i, e) => newTags.push({ link: $(e).attr('href'), title: $(e).text().trim() }))
        $('.news-content p').each((i, element) => {
            const _image = $(element).find('img').attr('src');
            const image = _image ? 'https://trthaber.com/' + _image : null;
            const text = $(element).text().trim().replaceAll('  ', '').length > 0 ? $(element).text().trim().replaceAll('  ', '') : null;
            if (image && text) newDesc.push({ image, text })
            if (image && !text) newDesc.push({ image })
            if (!image && text) newDesc.push({ text })
        })

        newsList.push({
            id: newData.id.split('').reverse().join(''),
            category: newData.category,
            title: newData.title,
            description: newDesc,
            image: newData.image,
            link: newData.link,
            source: $('.source-date-container .source').text().trim()?.replace('KAYNAK', '') || null,
            date: $('.source-date-container .created-date')
                .text().trim()?.replaceAll('\n', '')?.replaceAll('  ', '')?.replace('HABER GİRİŞ', '').split(', ')[0] || null,
            updateDate: $('.source-date-container .updated-date-content').text()?.replace(', ', '') || null,
            newTags
        })
        newsList = newsList.filter(f => f.id !== newData.id)
    }

    if (category) newsList = newsList.filter(f => f.category == category)
    if (tag) newsList = newsList.filter(f => f?.newTags?.map(m => m?.title).includes(tag))
    newsList = newsList.slice(0, Number(count));
    return newsList;
};