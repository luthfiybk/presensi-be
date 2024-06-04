const Titik = require('../models/Titik')

const TitikController = {
    getAll: async (req, res) => {
        try {
            const response = await Titik.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    add: async (req, res) => {
        try {
            const { nama_titik, latitude, longitude, radius } = req.body

            const data = {
                nama_titik: nama_titik,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                radius: parseInt(radius)
            }
            console.log(data)
            const response = await Titik.add(data)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    update: async (req, res) => {
        const { id } = req.params
        const { nama_titik, latitude, longitude, radius } = req.body

        try {
            const response = await Titik.update(id, nama_titik, latitude, longitude, radius)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = TitikController