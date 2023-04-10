import mongoose from "mongoose";

  const dbConnection= ()=>{
    mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log('DB connection established');
})
.catch((error)=>{
    console.log(error)
})
};
export default dbConnection;
