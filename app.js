const express = require('express')
const app = express()
const config = require('config')
const mongoose = require('mongoose')

app.use(express.json())

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/link.route'))
app.use('/t', require('./routes/redirect.route'))

const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'))
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log('Server error', e)
        process.exit(1)//Завершает проект
    }
}

start()