const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const RefrenceToken = require("../models/refreshToken")
// const cookies = require('cookie')


const isAuthenticatedUser = async (req, res, next) => {
    // console.log(req);

    const token = req.headers.authorization;
    console.log(token);
    // return false

    // 
    // console.log(tokken)
    // const token = req.cookies.jwtToken;

    // return false
    // const token = req.cookies.jwtToken;
    // console.log("token")


    const splitToken = token.split(" ");
    const newToken = splitToken[1]
    // console.log(newToken)



    // check refreshToken and access token

    // const refreshToken = RefrenceToken.findAll()
    // if (!refreshToken.token) {
    //     return res.status(401).json({ message: "Refresh token is missing" });
    // }


    if (!newToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
        console.log(decoded);
       
        const user = await User.findByPk(decoded.userId)
        if (!user) {
            return res.status(404).send({ message: "user not fount and authorize" })
        }
        req.user = decoded;
        // req.user = User.findByPk(decodedData.id);

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}

module.exports = { isAuthenticatedUser }