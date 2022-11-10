require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// ! adding a comment using nvim
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./shared-services/db')
const cookieParser = require('cookie-parser')
// ! error handler
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFoundMiddleware = require('./middlewares/not-found')
// ! Routers imports
const invoiceRouter = require('./steg-soned/ssRoutes')
const userRouter = require('./user/userRoutes')
const cinRouter = require('./cin/cinRoutes')
const creditCardRouter = require('./credit-card/creditRoutes')
const bulletinRouter = require('./bulletin3/bulletinRoutes')
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors({origin: 'http://localhost:4200', credentials: true}))
// app.use(morgan('default'))
app.use(morgan('tiny'))

// ! USING COOKIE PARSER
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/invoice', invoiceRouter)
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/identity', cinRouter)
app.use('/api/v1/credit-card', creditCardRouter)
app.use('/api/v1/bulletin', bulletinRouter)






app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Live on : http://localhost:${port}`))
    } catch (error) {
       console.log(`there was an error : ${error}`) 
    }
}

start()
