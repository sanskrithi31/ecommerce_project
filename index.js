import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import auRoute from './routes/auRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'


dotenv.config();


connectDB();



const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use('/api/v1/auth',auRoute);
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoutes)

app.get('/', (req,res)=>{
    res.send('<h1>Welcome to Sporting Goods</h1>')
})


const port = process.env.port || 8000 ;



app.listen(port, ()=>{
    console.log(`Server running on ${process.env.dev_mode} mode on port ${port}`.bgBlue.yellow);
});

