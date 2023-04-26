// const mongoose = require('mongoose')
// const mongoURI='mongodb://localhost:27017';
// const connecttoMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongoose")
//     })
// }
// module.exports=connecttoMongo;

const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;


