const express = require('express');
const User = require('./models/userModel')
const userRoute = require('./routes/userRoute')
const app = express();

// app.get('/', (req, res) => {
//     console.log("Hello world!")
// })

app.use(express.json());

app.use("/v1/user", userRoute);

User.sync({ force: false });

const port = 3000

app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})