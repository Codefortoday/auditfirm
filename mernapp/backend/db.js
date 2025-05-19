const mongoose = require('mongoose');

const mongoURI = "mongodb://anshujain:anshujain1008@cluster0-shard-00-00.tnqd7.mongodb.net:27017,cluster0-shard-00-01.tnqd7.mongodb.net:27017,cluster0-shard-00-02.tnqd7.mongodb.net:27017/auditfirm?ssl=true&replicaSet=atlas-ivp5cx-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");

          // Fetch data after successful connection
          const fetch_data = mongoose.connection.db.collection("sampledata");
          const data = await fetch_data.find({}).toArray();
          global.fetch_data1=data;
          console.log("global.fetch_data");
        
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = mongoDB;
