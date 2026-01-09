import mongoose from 'mongoose'
import {DB_NAME} from "../constants.js"

const connectDB = async () => {
    try{

       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
       console.log(`\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
       

    }
    catch(error){
        console.log("MONGODB CONNECTION ERROR - ",error);
        process.exit(1);
        
    }
}


export default connectDB
.then(()=>{
    app.listen(process.env.listen || 8000 , ()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed..!!" , err);
    
})