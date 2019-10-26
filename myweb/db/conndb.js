var mongoose = require("mongoose");


mongoose.connect(
    "mongodb://localhost:27017/mydated",
    {useNewUrlParser:true} 
);

//commonJS规范
module.exports = mongoose;