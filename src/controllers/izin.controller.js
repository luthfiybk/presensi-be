const { decode } = require('jsonwebtoken')
const Izin = require('../models/Izin')
const jwt = require('jsonwebtoken')
const {formatISO} = require('date-fns/formatISO')

const IzinController = {
    getAll: async (req, res) => {
        try {
            const response = await Izin.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    applyIzin: async (req, res) => {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized - Missing Token" });
        }

        const decodedToken = jwt.verify(token.split(" ")[1], "secret_key");

        if (!decodedToken || !decodedToken.nip) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        console.log(req.file, 'file')
        try {
            const dateString = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }).slice(0, 10);

            const userId = decodedToken.nip
            const statusId = 4
            const keterangan = req.body.keterangan
            const file = req.file

            const data = {
                tanggal: formatISO(new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }), { representation: 'basic' }),
                statusId: statusId,
                keterangan: keterangan,
                file: file.filename,
                userId: userId
            }

            const response = await Izin.applyIzin(data)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = IzinController