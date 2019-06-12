const express = require('express')
const connectDB = require('./config/db')

const app = express()
const cors = require('cors')

// Connect to Mongo
connectDB()

// use body parser in express as json 
app.use(express.json({ extended: false }));

// cors errors

app.use(cors())

// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    
//     res.header(
//         'Access-Control-Allow-Headers', 
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token '
//     );
//     if(req.method === 'OPTIONS'){ 
//         res.header('Acess-Control-Allow-Methods', 'PUT, POST, GET, DELETE, *')
//         return res.status(200).json({})
//     } 
//     next()
    
// })

app.get('/', (req,res)=> res.send('API is running'))



// Define Routes
app.use('/api/registerUser', require('./routes/api/registerUser.js'));
app.use('/api/authUser', require('./routes/api/authUser'));
app.use('/api/recipe', require('./routes/api/recipe'));
app.use('/api/cookbook', require('./routes/api/cookbook'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`server started on ${PORT}`)})