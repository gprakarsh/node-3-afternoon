const express = require('express')
const {json} = require('body-parser')
require('dotenv').config()
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const sc = require('./controllers/swag_controller')
const ac = require('./controllers/auth_controller')
const cc = require('./controllers/cart_controller')
const swc = require('./controllers/search_controller')

const app = express()
app.use(json())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false
}))
app.use(checkForSession)
app.use(express.static('./../build'))

app.get(`/api/swag`,sc.read)
app.post(`/api/login`,ac.login)
app.post(`/api/register`,ac.register)
app.post(`/api/signout`,ac.signout)
app.get(`/api/user`,ac.getUser)
app.post(`/api/cart`,cc.add)
app.post(`/api/cart/checkout`,cc.checkout)
app.delete(`/api/cart`,cc.delete)
app.get(`/api/search`,swc.read)

const PORT = process.env.SERVER_PORT
app.listen(PORT,()=>{console.log(`Magic at ${PORT}`)})
