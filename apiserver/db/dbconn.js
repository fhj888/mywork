let mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/mydated",
    {useNewUrlParser:true}
);

module.exports = mongoose;