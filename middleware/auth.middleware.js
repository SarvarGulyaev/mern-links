const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'})
        }
        //verify -  Метод проверки JWT используется для проверки токена.
        // Он принимает два аргумента: один — это строковое значение токена,
        // а второй — секретный ключ для проверки того, является ли токен
        // действительным или нет.
        // Метод проверки возвращает объект декодирования, в котором мы
        // сохранили токен.
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded //Создаем любое поле, куда сохраняем токен.
        next()

    } catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}