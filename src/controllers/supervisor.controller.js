const Supervisor = require('../models/Supervisor')
const moment = require('moment-timezone')

const SupervisorController = {
    dashboard: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.dashboard(divisiId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    getKaryawan: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.getKaryawan(divisiId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    getIzin: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.getIzin(divisiId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    getPresensi: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.getPresensi(divisiId)
            const mappedResponse = response.map((item) => {
                return{
                    ...item,
                    tanggal: moment(item.tanggal).tz('Asia/Jakarta').format('YYYY-MM-DD'),
                    jamMasuk: moment(item.jamMasuk).tz('Asia/Jakarta').format('HH:mm:ss')
                }
            })

            return res.status(200).json(mappedResponse)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = SupervisorController