import express from 'express'
import cors from 'cors'


import signup from './routes/signup'
import signin from './routes/signin'
import txn from './routes/txn'
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/v1/signup',signup)
app.use('/api/v1/signin',signin)
app.use('/api/v1/txn',txn)

// const mongoConnect = async ()=>{
//     try{
//         await mongoose.connect("")
//     }catch(e:any){
//         console.log("Error connecting to mongoDb",e);
//     }
// }

// mongoConnect();

app.listen(3000,()=>{
    console.log("Server is running on 3000");
})