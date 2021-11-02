const fs = require('fs')

module.exports = {
    devServer: {
        disableHostCheck: true,
        https: {
            key: fs.readFileSync('./certs/example.com+5-key.pem'),
            cert: fs.readFileSync('./certs/example.com+5.pem'),
        },
        public: 'https://18.219.3.111:443'
    }
}