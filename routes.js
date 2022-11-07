// const { routes } = require('./controller/UserController')

const UserController = require('./controller/UserController')
const AuthController = require('./controller/AuthController')

const _routes = [
    // http://localhost:8000/api/users
    ['users', UserController],
    // http://localhost:8000/api/login
    ['', AuthController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes