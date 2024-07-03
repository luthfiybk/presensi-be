const Izin = require('../models/Izin')
const jwt = require('jsonwebtoken')
const {formatISO} = require('date-fns/formatISO')

const IzinController = {
    getAll: async (req, res) => {
        try {
            const nama = req.query.search || ''
            const date = req.query.date || ''
            const statusId = req.query.status || null
            const divisiId = req.query.division || null
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const offset = req.query.offset || (page - 1) * limit

            const response = await Izin.getAll(nama, date, statusId, divisiId, limit, offset)

            const total_izin = await Izin.count()

            return res.status(200).json({ total_data: total_izin, data: response })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    applyIzin: async (req, res) => {
        try {
            const userId = req. decodedToken.nip
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
    },

    getById: async (req, res) => {
        try {
            const izinId = req.params.id
            const response = await Izin.getById(izinId)
            const fileUrl = `${process.env.BASE_URL}/api/symlink/file/${response[0].file}`
            response[0].file_link = fileUrl

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    approveIzin: async (req, res) => {
        try {
            if (req.decodedToken.roleId === 3 || req.decodedToken.roleId === 1) {
                const izinId = req.params.id
                const statusId = 5
    
                const response = await Izin.updateIzin(izinId, statusId)
    
                return res.status(200).json(response)
            } else {
                return res.status(403).json({ message: "Forbidden" })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    rejectIzin: async (req, res) => {
        try {
            if(req.decodedToken.roleId === 3 || req.decodedToken.roleId === 1) {
                const izinId = req.params.id
                const statusId = 6
    
                const response = await Izin.updateIzin(izinId, statusId)
    
                return res.status(200).json(response)
            
            } else {
                return res.status(403).json({ message: "Forbidden" })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    updateIzin: async (req, res) => {
        try {
            const izinId = req.params.id
            const statusId = req.body.statusId

            const response = await Izin.updateIzin(izinId, statusId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = IzinController