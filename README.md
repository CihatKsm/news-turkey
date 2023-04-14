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
    //count parametresi ile kaç haberin çekileceğini belirleyebilirsiniz.
    const information = await news({ count: 5 })
    console.log(information)
}, 2000);
```

#### Örnek Çıktı:
```json
[
    {
        "category": "Teknoloji",
        "date": "01/01/2023 12:34",
        "text": "...",
        "image": "...jpg",
        "link": "https://www.haber.com/.../",
        "details": "...",
        "sharer": {
            "name": "...",
            "image": "...jpg"
        }
    },
    {...},
    {...},
    {...},
    {...}
]
```

[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

#### Geri Bildirim

**E-posta:** me@cihatksm.com adresinden bana ulaşın.

#### Bilgi

Bu modülde haber.com/son-dakika web sitesindeki haberler yer almaktadır.
<br>
Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.