const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/task')
const notfound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})
app.use(express.static('./public'))
// setting up middleware
app.use(express.json()) // if we don't use this then we won't have the data in req.body
app.use('/api/v1/tasks', tasks)
app.use(notfound)
app.use(errorHandlerMiddleware)

const port = 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()