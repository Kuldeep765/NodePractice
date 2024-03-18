const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie');
const RefrenceTokenModel = require('../models/refreshToken')


const userRegister = async (req, res) => {

    try {
        const {
            fname,
            lname,
            city,
            state,
            country,
            numbers,
            email,
            password

        } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashepassword = await bcrypt.hash(password, salt);

        // if (!fname || !lname || !city || !state || !country || !numbers || !email || !password || !confirmPassword) {
        //     return res.status(400).json({ error: 'All fields are required' });
        // }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ error: 'Invalid email format' });
        // }

        // if (password !== confirmPassword) {
        //     return res.status(400).json({ error: "Passwords don't match" });
        // }

        const user = await User.create({
            fname,
            lname,
            city,
            state,
            country,
            numbers,
            email,
            password: hashepassword
        });

        return res.status(201).json({ user });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }

}


const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(200).send({ message: 'User Not Found', success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email and password', success: false })
        }
        // console.log(req.body, "body data")

        const AccessToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const RefrenceToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' })

        await RefrenceTokenModel.create({ token: RefrenceToken, user_id: user.id })

        return res.setHeader('Set-Cookie', cookie.serialize('jwtToken', AccessToken, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            maxAge: 3600, // Cookie expires in 1 hour
            path: '/', // Cookie is valid for entire site
            sameSite: 'strict' // Only send the cookie for requests to the same site
        })).status(200).send({ message: 'Login success', success: true });

        // return res.status(200).send({ message: 'Login success', success: true, token })

    } catch (error) {
        // console.log(error)
        return res.status(500).send({ message: `Error in Login Form ${error.message}` })
    }
}

const userList = async (req, res) => {
    try {

        const allUser = await User.findAll()
        // console.log(allUser);
        // return false
        return res.status(200).send({ message: "All user", allUser })

    } catch (error) {
        // console.log(error)
        return res.status(404).json({ message: "Does not fetch alluser" })
    }
}


const getParticularUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.status(200).send({ message: "particular user", user })
    } catch (error) {
        // console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        await user.destroy();
        res.status(204).send({ message: "User delete successfully!" });
    } catch (error) {
        // console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const updateuser = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update(updatedUserData);

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateProperty = async (req, res) => {
    const userId = req.params.id;
    const fname = req.body.fname;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.fname = fname;
        await user.save();

        return res.status(200).json({ message: 'User name updated successfully', user });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const loginUserDetails = async (req, res) => {
    try {



        // const user = await User.findByPk(req.id);
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: "successdully find user", user });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const loginUserUpdate = async (req, res) => {
    try {
        const user = req.user;
        console.log(user, "userUpdate")

        // get user details
        const { fname, lname, city, state } = req.body

        // Update user details
        const updatedUser = await User.update(
            { fname, lname, city, state },
            {
                where: { id: user.userId },
                returning: true
            });
        if (updatedUser[0] === 0) {
            return res.status(404).send({ message: "User not found" })
        }
        return res.status(200).send({ message: "User update successfully!" })
        // res.json(updatedUser[1][0]); // Return the updated user details
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
}
module.exports = { userRegister, userLogin, userList, getParticularUser, deleteUser, updateuser, updateProperty, loginUserDetails, loginUserUpdate }