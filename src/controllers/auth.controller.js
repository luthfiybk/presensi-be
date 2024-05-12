const LogActivity = require('../models/LogActivity')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AuthController = {
    login: async (req, res, next) => {
        try {
            let user
            const { identifier, password } = req.body

            if (!identifier || !password) {
                return res.status(400).json({ message: 'Username and password are required!' })
            }

            if(identifier.includes('@')) {
                user = await User.getByEmail(identifier)
            } else {
                user = await User.getByNIP(identifier)
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(401).json({ message: 'Password is incorrect!' })
            }

            const token = await jwt.sign(
                { 
                    nip: user.nip,
                    roleId: user.roleId,
                }, 
                "secret_key", 
                { 
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400 
                }
            )

            LogActivity.login({
                userId: user.nip,
                activity: 'Login'
            })
    
            res.status(200).json({ token: token, nip: user.nip, roleId: user.roleId })
            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    logout: async (req, res) => {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized - Missing Token" });
        }

        const decodedToken = jwt.verify(token.split(" ")[1], "secret_key");

        if (!decodedToken || !decodedToken.nip) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        try {
            LogActivity.logout({
                userId: decodedToken.nip,
                activity: 'Logout'
            })

            req.session.destroy()

            res.status(201).json({ message: 'Logout success!' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = AuthController