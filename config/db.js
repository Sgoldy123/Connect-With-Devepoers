import mongoose from 'mongoose'
import config from 'config'

const db=config.get('mongoURI');

const connectDB=async ()=>{
    try {
        
        await mongoose.connect(db , { useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify:false, useCreateIndex:true});
        console.log("mongo is connected ...");

    } catch (error) {
        
        console.log("error: ",error);
        // exit process with failure..
        process.exit(1);
    }
}

export default connectDB;