const express = require('express')
const app = express()
const PORT = process.env.PORT||3500
const path=require('path')
const { logger } = require('./middleware/logger')
const cors = require('cors')
const corsOptions=require('./config/corsOptions')

app.use(logger)

app.use(express.json())

app.use(require('cookie-parser')())

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname,'/public')))

app.use(require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(require('./middleware/errorHandler'))

app.listen(PORT,() => {console.log(`server running on port ${PORT}`)})