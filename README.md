#### Modül İndirme:

```bash
  npm install news-turkey
```

#### Örnek Kullanım:
```js
const news = require('news-turkey')
const date = () => new Date()

console.log(date(), 'System opened!')

setTimeout(async () => {
    // "count"    : Kaç tane haberin gösterileceğini belirleyebilirsiniz.
    // "category" : Haber kategorisini belirleyebilirsiniz.
    // "tag"      : Haber etiketleri arasında belirttiğiniz tag olan haberleri alınmasını sağlayabilirsiniz.
    const information = await news({ count: 3 });
    console.log(information);
}, 2000);

// Farklı bir kullanım şekli:
// news({ count: 3 }).then(information => {
//     console.log(information)
// })
```

#### Örnek Çıktı:
```json
[
    {
        "category": "...",
        "title": "...",
        "description": [
            { "text": "..." },
            { "image": "https://trthaber.com//dosyalar/images/...jpg" },
            { "text": "..." },
        ],
        "image": "https://trthaberstatic.cdn.wp.trt.com.tr/...jpg",
        "link": "https://trthaber.com/haber/gundem/...html",
        "source": "...",
        "date": "01.01.2001 21:21",
        "updateDate": "01.01.2001 21:22",
        "newTags": [
            { "link": "https://www.trthaber.com/etiket/.../", "title": "..." },
            {...}
        ]
    }
    {...},
    {...}
]
```

[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

#### Geri Bildirim

**E-posta:** me@cihatksm.com adresinden bana ulaşın.

#### Bilgi

Bu modülde trthaber.com web sitesindeki haberler yer almaktadır.
<br>
Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.