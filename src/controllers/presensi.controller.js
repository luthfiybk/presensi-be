const Presensi = require('../models/Presensi')
const jwt = require('jsonwebtoken')
const { formatISO } = require('date-fns/formatISO')
const moment = require('moment-timezone')
const { format } = require('date-fns')

const PresensiController = {
    getAll: async (req, res) => {
        try {
            const response = await Presensi.getAll()

            const mappedResponse = response.map((item) => {
                return {
                    ...item,
                    jamMasuk: moment(item.jamMasuk).tz('Asia/Jakarta').format('HH:mm:ss'),
                }
            
            })

            return res.status(200).json(mappedResponse)
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
            const jam = moment.tz('Asia/Jakarta').format('HH')

            let status_id

            if (parseInt(jam) >= 8 && jam <= 9) {
                status_id = 1
            } else if (parseInt(jam) > 9 && jam <= 12) {
                status_id = 2
            }

            const tanggal = formatISO(new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }), { representation: 'basic' })
            const jamMasuk = formatISO(new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }), { representation: 'basic' })
            
            const data = {
                latitude: latitude,
                longitude: longitude,
                tanggal: tanggal,
                jamMasuk: jamMasuk
            }

            console.log(data, 'data')

            const response = await Presensi.presensiMasuk(nip, data, status_id)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    // presensiPulang: async (req, res) => {
    //     console.log(req.headers)
    //     let token = req.headers.authorization;

    //     if (!token || !token.startsWith("Bearer ")) {
    //         return res.status(401).json({ error: "Unauthorized - Missing Token" });
    //     }

    //     const decodedToken = jwt.verify(token.split(" ")[1], "secret_key");

    //     if (!decodedToken || !decodedToken.nip) {
    //         return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    //     }

    //     try {
    //         // const tanggal = formatISO(new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }), { representation: 'basic' })
    //         const today = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')
    //         const jamKeluar  = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' })
    //         const userId = decodedToken.nip

    //         const response = await Presensi.presensiPulang(userId, today, jamKeluar)

    //         return res.status(201).json(response)
    //     } catch (error) {
    //         return res.status(500).json({ message: error.message })
    //     }
    // },

    getByDate: async (req, res) => {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized - Missing Token" });
        }

        const decodedToken = jwt.verify(token.split(" ")[1], "secret_key");

        if (!decodedToken || !decodedToken.nip) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        try {
            const tanggal = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')
            const userId = decodedToken.nip

            const response = await Presensi.getByDate(tanggal, userId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    setAlpha: (req, res) => {
        try {
            const fetchUser = Presensi.getByDate(new Date(), null)
            
            if(!fetchUser) {
                const response = Presensi.setAlpha()
                
                return res.status(201).json(response)
            }

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params

            const response = await Presensi.getById(id)

            const mappedResponse = response.map((item) => {
                return {
                    ...item,
                    tanggal: moment(item.tanggal).tz('Asia/Jakarta').format('YYYY-MM-DD'),
                    jamMasuk: moment(item.jamMasuk).tz('Asia/Jakarta').format('HH:mm:ss'),
                }
            })

            return res.status(200).json(mappedResponse)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = PresensiController