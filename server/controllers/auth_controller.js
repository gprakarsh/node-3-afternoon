const users = require('./../models/users')

let id = 1;

module.exports = {
    login: (req, res, next) => {
        let { username, password } = req.body
        let index = users.findIndex((user) => {
            return user.username === username && user.password === password
        })
        if (index !== -1) {
            req.session.user.username = username
            res.status(200).send(req.session.user)
        }
        else {
            res.sendStatus(500)
        }
    },
    register: (req, res, next) => {
        let { username, password } = req.body;
        users.push({ id: id, username: username, password: password })
        id++
        req.session.user.username = username
        res.status(200).send(req.session.user)
    },
    signout: (req, res, next) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    },

}

