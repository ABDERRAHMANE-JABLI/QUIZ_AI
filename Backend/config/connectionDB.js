const mongoose = require("mongoose");

module.exports = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected To Database MongoDB");
    } catch (error) {
        console.log("Connection failed to database", error);
    }
}