const express = require('express');
const User = require('./models/userModel')
const userRoute = require('./routes/userRoute')
const app = express();
const dotenv = require('dotenv')
const RefrenceToken = require('./models/refreshToken')
// app.get('/', (req, res) => {
//     console.log("Hello world!")
// })

app.use(express.json());
dotenv.config()

app.use("/v1/user", userRoute);

User.sync({ force: false });
RefrenceToken.sync({ force: false });
const port = 3000

app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})