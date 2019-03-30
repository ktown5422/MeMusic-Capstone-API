var axios = require('axios')
var express = require('express')
var router = require('express-promise-router')
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
var app = express()
var credentials = 'Y2VhMDY5NjdhMGY2NDZhODlhMzE1ZDdhNjI4ZTYwYjE6Zjc0OTFiN2FhYzllNGVlOThiZDEyN2MxYjljMzZkMDA='

var PORT = process.env.PORT || 8080

app.use(router())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/healthcheck', async (req, res) => {
    res.send('What hath God wrought?')
})

app.post('/login', async (req, res) => {
    var response = await axios
        .post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`
            }
        });
    
    res.send(response.data.access_token)
})

app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
