const Presensi = require('../models/Presensi')
const jwt = require('jsonwebtoken')
const { formatISO } = require('date-fns/formatISO')

const PresensiController = {
    getAll: async (req, res) => {
        try {
            const response = await Presensi.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getByNIP: async (req, res) => {
        try {
            const userId = req.session.userId
            
            const response = await Presensi.getByNIP(userId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    
    presensiMasuk: async (req, res) => {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized - Missing Token" });
        }

        const decodedToken = jwt.verify(token.split(" ")[1], "secret_key");

        if (!decodedToken || !decodedToken.nip) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        try {
            const nip = decodedToken.nip
            const latitude = req.body.latitude
            const longitude = req.body.longitude

            const data = {
                latitude: latitude,
                longitude: longitude,
                tanggal: formatISO(new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }), { representation: 'basic' }),
                jamMasuk: formatISO(new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }), { representation: 'basic' })
            }

            const response = await Presensi.presensiMasuk(nip, data)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    presensiPulang: async (req, res) => {
        try {
            const tanggal = new Date().toISOString().slice(0, 10)
            const jam_plg = new Date().toISOString().slice(11, 19)
            const userId = req.session.userId

            const response = await Presensi.presensiPulang(userId, tanggal, jam_plg)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = PresensiController