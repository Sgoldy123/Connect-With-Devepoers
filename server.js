import express from 'express'
import connectDB from './config/db.js';
const app=express();

import usersRoute from './routes/api/users.js';
import postsRoute from './routes/api/post.js';
import authRoute from './routes/api/auth.js';
import profileRoute from './routes/api/profile.js';
import path from 'path'

//Database connection
connectDB();

//middleware
app.use(express.json());

// api routes

app.use('/api/users',usersRoute);
app.use('/api/posts',postsRoute);
app.use('/api/auth',authRoute);
app.use('/api/profile',profileRoute);


//heroku production
if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>console.log(`server is running at ${PORT}`))