const Testimonal = require("./models/Testimonal");

const mongoose = require("mongoose");

const createreview = async () => {
  try {
    await mongoose.connect("mongodb://anshujain:anshujain1008@cluster0-shard-00-00.tnqd7.mongodb.net:27017,cluster0-shard-00-01.tnqd7.mongodb.net:27017,cluster0-shard-00-02.tnqd7.mongodb.net:27017/auditfirm?ssl=true&replicaSet=atlas-ivp5cx-shard-0&authSource=admin&retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    const newTestimonial = new Testimonal({
      name: "anshu",
      reviewText: "good",
      rating: "5"
    });

    await newTestimonial.save();
    console.log("review created successfully!");

    mongoose.connection.close(); // Close the database connection
  } catch (error) {
    console.error("Error creating review", error);
  }
};

createreview();
