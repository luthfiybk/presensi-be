const express = require('express')
const app = express()
const routes = require('./src/routes/index.routes')
const port = process.env.PORT || 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const liveReload = require('connect-livereload')
const cookieParser = require('cookie-parser')
const path = require('path')
const { formatISO } = require('date-fns/formatISO')
const jwt = require('jsonwebtoken')

const corsOptions = {
    origin: process.env.WEB_URL,
    httpOnly: false,
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'strict',
    }
}))
app.use('/public/uploads', express.static(path.join(__dirname, 'public/images')));

app.use(liveReload())

app.use('/api', routes)

console.log(formatISO(new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }), { representation: 'basic' }))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})