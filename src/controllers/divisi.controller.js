const Divisi = require('../models/Divisi')

const DivisiController = {
    getAll: async (req, res) => {
        try {
            const response = await Divisi.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = DivisiController