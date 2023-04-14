const { default: axios } = require("axios");
const cheerio = require('cheerio');
const mounts = [{ i: 1, t: 'Ocak' }, { i: 2, t: 'Şubat' }, { i: 3, t: 'Mart' }, { i: 4, t: 'Nisan' }, { i: 5, t: 'Mayıs' }, { i: 6, t: 'Haziran' }, { i: 7, t: 'Temmuz' }, { i: 8, t: 'Ağustos' }, { i: 9, t: 'Eylül' }, { i: 10, t: 'Ekim' }, { i: 11, t: 'Kasım' }, { i: 12, t: 'Aralık' }]

module.exports = async (data) => {
    const count = data?.count || 20;
    if (isNaN(Number(count))) return [];

    const ii = count > 80 ? 5 : count > 60 ? 4 : count > 40 ? 3 : count > 20 ? 2 : 1;
    let newsList = [];

    await getNews(ii)
    async function getNews(i) {
        const page = i == 1 ? '' : `page/${i}/`;
        const response = await axios.get(`https://www.haber.com/son-dakika/${page}`);
        const $ = cheerio.load(response.data);

        $('.col-12.toinfinite').each((index, element) => {
            const datas = $(element).find('.row.align-items-center')
            const text = datas.find('.kanews-post-headline.truncate.truncate-3').text().trim();
            const _date = datas.find('.mt-1').text().trim();
            const category = datas.find('.kanews-category').text().trim();
            const image = datas.find('.kanews-post-thumb img').attr('data-lazy-src')
            const link = datas.find('a').attr('href');

            const date = (_date.split(' - ')[0] + ' ' + _date.split(' - ')[2].split(':').map(m => m.length === 1 ? '0' + m : m).join(':'))
                .replace(' ' + _date.split(' ')[1] + ' ', '/' + mounts.find(f => f.t == _date.split(' ')[1]).i + '/')
                .split('/').map(m => m.length === 1 ? '0' + m : m).join('/')

            const timespan = Number(new Date(date.split(' ')[0].split('/').reverse().join('-') + ' ' + date.split(' ')[1]))

            newsList.push({
                timespan,
                category,
                date,
                text,
                image,
                link
            });
        });
        if (i - 1 > 0) await getNews(i - 1);
    }

    const _news = newsList.sort((a, b) => b.timespan - a.timespan).slice(0, data.count).map(({ timespan, ...rest }) => rest);
    const news = await Promise.all(_news.map(async (m) => {
        let New = await getNew(m.link);
        return ({ ...m, details: New.text, sharer: New.sharer })
    }))
    return news;
};

async function getNew(link) {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    const div = $('.entry-content-inner').html();
    const text = div.split('</p>').map(m =>
        ['<p>', '<h2>', '</h2>', '<p class="accordion-p">']
            .reduce((acc, f) => acc.replaceAll(f, ''), m)
            .split('\n').filter(f => !f?.includes('<img')).join('\n')
    ).filter(f => f.trim().length > 0).map(m => m.toUpperCase() == m ? `\n${m}` : m).join('\n');
    const name = $('.kanews-post-author-name.author.vcard')?.text() || null;
    const image = $('.author-avatar.circle-animation img')?.attr('data-lazy-src')?.replace('-48x48','') || null;
    return { text, sharer: { name, image } };
}