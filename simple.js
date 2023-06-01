const news = require('./news')
const date = () => new Date()

console.log(date(), 'System opened!')

news({ count: 1 }).then(information => {
    console.log(information);
})