//for mongo db connection string
require('dotenv').config()
//async errors
require('express-async-errors')



const express = require('express');
const app = express();


const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect')
const ProductsRouter = require('./routes/products')

//middlewares

app.use(express.json())

//testing route for browser

app.get('/', (req, res)=>{
    res.send('<h1>Store API </h1><a href="/api/v1/products">Products Route</a>')
})

//products route
app.use('/api/v1/products', ProductsRouter)

//error handler errorMiddlewares
app.use(notFoundMiddleWare)
app.use(errorMiddleware)


const port = process.env.PORT || 3000

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    }catch(error){
        console.log(error)
    }
}
start()