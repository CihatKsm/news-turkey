const { default: axios } = require('axios');
const api = require('./api');

module.exports = async (datas) => {
    await moduleVersionControl();
    return await api(datas);
}

async function moduleVersionControl() {
    const package = require('./package.json');
    const requestUrl = `http://registry.npmjs.org/${package.name}`;
    const { data } = await axios.get(requestUrl).catch((e) => ({ data: null }));
    const latest = data['dist-tags'].latest;
    if (package.version !== latest) {
        console.log(new Date(), `(${package.name}) New version available! (${latest})`);
        console.log(new Date(), `(${package.name}) Please update your package with "npm i ${package.name}@latest"`);
    }
}