const User = require('../models/User')
const bcrypt = require('bcryptjs')

const UserController = {
    getAll: async (req, res) => {
        try {
            const search = req.query.search || ''
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const offset = req.query.offset || (page - 1) * limit
            const roleId = req.query.role || null
            const divisiId = req.query.division || null
            const accessor = req.decodedToken.nip

            const response = await User.getAll(search, limit, offset, roleId, divisiId, accessor)

            const total_users = await User.count()

            res.status(200).json({ message: 'success', total_data: total_users , data: response })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    getByNIP: async (req, res) => {
        try {
            const userId = req.params.userId

            const response = await User.getByNIP(userId)

            res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    create: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const data = {
                nip: req.body.nip,
                nama: req.body.nama,
                email: req.body.email,
                password: hashedPassword,
                roleId: req.body.roleId,
                divisiId: req.body.divisiId || null
            }

            const response = await User.create(data.nip, data.nama, data.email, data.password, data.roleId, data.divisiId)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    update: async (req, res) => {
        try {
            const nip = req.params.nip
            const data = {
                nama: req.body.nama,
                email: req.body.email,
                roleId: req.body.roleId,
                divisiId: req.body.divisiId || null
            }

            const response = await User.update(nip, data)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    

    delete: async (req, res) => {
        try {
            const nip = req.params.nip

            const response = await User.delete(nip)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = UserController