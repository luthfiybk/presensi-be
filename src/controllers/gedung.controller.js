const Gedung = require('../models/Gedung')
const { getAll } = require('./presensi.controller')

const GedungController = {
    getAll: async (req, res) => {
        try {
            const response = await Gedung.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    add: async (req, res) => {
        try {
            const response = await Gedung.add()

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = GedungController