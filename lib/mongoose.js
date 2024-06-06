import mongoose from "mongoose";

export function mongooseConnect() {
    if(mongoose.connection.readyState===1){
        console.log("MongoUri Working22");
        return mongoose.connection.asPromise();
    }else{
        const uri= process.env.MONGODB_URI;
        console.log("MongoUri Working21");
        return mongoose.connect(uri);
    }
}