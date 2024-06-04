const Divisi = require('../models/Divisi')

const DivisiController = {
    getAll: async (req, res) => {
        try {
            const response = await Divisi.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    create: async (req, res) => {
        try {
            const { nama_divisi } = req.body

            const response = await Divisi.create(nama_divisi)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    update: async (req, res) => {
        const { id } = req.params
        const { nama_divisi } = req.body

        try {
            const response = await Divisi.update(id, nama_divisi)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = DivisiController