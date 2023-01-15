const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://rahul:M9vEbVTLbZiSs0vh@votesys.12rd05i.mongodb.net/voting_system?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}).then((result)=>{
    console.log("MongoAtlas connected..")
});

module.exports = mongoose;

