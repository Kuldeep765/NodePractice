const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const userRegister = async (req, res) => {

    console.log("object")

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
        console.error(error);
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
        console.log(req.body, "body data")

        return res.status(200).send({ message: 'Login success', success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: `Error in Login Form ${error.message}` })
    }
}

const userList = async (req, res) => {
    try {

        const allUser = await User.findAll()
        return res.status(200).send({ message: "All user", allUser })

    } catch (error) {
        console.log(error)
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
        console.error(error);
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
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = { userRegister, userLogin, userList, getParticularUser, deleteUser }