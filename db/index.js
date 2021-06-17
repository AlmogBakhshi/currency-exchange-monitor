const mongoose = require("mongoose");

// Connection to db
module.exports = async () => {
    await mongoose.connect(process.env.DB_CONNECTION,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(res => console.log(`MongoDB Connected: ${res.connection.host}`.cyan.underline.bold))
        .catch(err => {
            console.error(`Error: ${err}`.red);
            process.exit(1);
        })
}