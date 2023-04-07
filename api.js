const { default: axios } = require("axios");

module.exports = async (data) => {
    const searchUrl = `https://www.haberler.com/son-dakika/`;
    const searchApi = await axios({ method: 'get', url: searchUrl }).catch((e) => null);
    const output = searchApi?.data;

    let news = [];
    
    let x = output.split('class="hbInRow boxStyle boxRadius hbLastNews"')[1]
    let y = x.split('class="colPageRight"')[0]
    let z = y.split('<div class="hblnTime">')

    return z;
};