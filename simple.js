const news = require('./news')
const date = () => new Date()

console.log(date(), 'System opened!')

news({ count: 5 }).then(information => {
    console.log(information[0])
})

/*\--------------------------------------------------------/*\

    Merhaba, 
    Konu hakkında geliştirmeye yönelik fikirlerin var ise dinlemek/görüşmek isterim.

    Telegram: http://t.me/cihatksm (Hızlı İletişim)
    E-posta: me@cihatksm.com

/*\--------------------------------------------------------\*/