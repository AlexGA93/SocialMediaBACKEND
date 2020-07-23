const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoURI");

//connect to MongoDB with promise
const connectDB = async () => {
  /*
  async ensures that the function returns a promise, 
  and wraps non-promises in it
  */
  try {
    await mongoose.connect(db, {
      //*
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    /*
    The function execution “pauses” at the line (*) 
    and resumes when the promise settles, with mongoose connection 
    becoming its result.
    */
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

//export
module.exports = connectDB;
