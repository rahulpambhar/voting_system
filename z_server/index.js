const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors');
app.use(cors({
    origin: '*'
}));



const usersRoute =require('./routes/users')

app.use('/', usersRoute);

app.listen(8000, () => {
    console.log("8000 -> listning")
})