const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri : 'http://localhost:3000',
        clientId: '1b3edb6b63a442f0853c5a087366bac8',
        clientSecret: '2be65731a92940ad86108a1c851a5f26',
        refreshToken,
    })
    spotifyApi
        .refreshAccessToken()
        .then(data => {
            res.json({
                accesToken : data.body.accesToken,
                expiresIn : data.body.expireIn,
            })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    })

app.post('/login', (req, res) => {
    const code = req.body.code 
    const spotifyApi = new SpotifyWebApi({
        redirectUri : 'http://localhost:3000',
        clientId: '1b3edb6b63a442f0853c5a087366bac8',
        clientSecret: '2be65731a92940ad86108a1c851a5f26'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accesToke: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expireIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
}) 
//  Falta crear el condicional de manejo de log in.
app.listen(3004)



// 25: 15