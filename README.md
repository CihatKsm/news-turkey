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
    //count seçeneği haber sayısını belirler, kullanılmaz ise 20 haber gönderilir.
    const information = await news({ count: 5 })
    console.log(information)
}, 2000);
```

#### Örnek Çıktı:
```json
[
    {
        "timespan": 1680968460000,
        "category": "Teknoloji",
        "date": "08/04/2023 18:41",
        "text": "İnstagram Mavi Tik Satışları Zirvede: Rekor Gelir Açıklandı",
        "image": "https://cdn.haber.com/wp-content/uploads/2022/09/instagramdan-hikaye-videolar-artik-parcalara-bolunmeyecek-40663.jpg",
        "link": "https://www.haber.com/instagram-mavi-tik-satislari-zirvede-rekor-gelir-aciklandi-694876/"
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

<small>
Bu modülde [Haber.com](https://haber.com/son-dakika/) web sitesindeki haberler yer almaktadır.
<br>
Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.
</small>