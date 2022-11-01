const { juejin } = require('./api/juejin')

juejin().then((e) => {
  console.log(e);
}).catch((r) => {
  console.log(e);
})