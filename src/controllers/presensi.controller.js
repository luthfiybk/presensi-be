const Presensi = require('../models/Presensi')
const jwt = require('jsonwebtoken')
const { formatISO } = require('date-fns/formatISO')
const moment = require('moment-timezone')
const { format } = require('date-fns')
const Titik = require('../models/Titik')
const { check } = require('prisma')

const PresensiController = {
    getAll: async (req, res) => {
        try {
            const nama = req.query.search || ''
            const date = req.query.date || ''
            const status = req.query.status || null
            const divisi = req.query.division || null
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const offset = req.query.offset || (page - 1) * limit

            console.log(status)
            const response = await Presensi.getAll(nama, date, status, divisi, limit, offset)

            const mappedResponse = response.map((item) => {
                return {
                    ...item,
                    jamMasuk: moment(item.jamMasuk).tz('Asia/Jakarta').format('HH:mm:ss'),
                }
            
            })

            const total_presensi = await Presensi.count()

            return res.status(200).json({ total_data: total_presensi, data: mappedResponse })
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

        const decodedToken = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

        if (!decodedToken || !decodedToken.nip) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        try {
            const nip = decodedToken.nip
            const latitude = parseFloat(req.body.latitude)
            const longitude = parseFloat(req.body.longitude)
            const jam = moment.tz('Asia/Jakarta').format('HH')
            const menit = moment.tz('Asia/Jakarta').format('mm')
            const detik = moment.tz('Asia/Jakarta').format('ss')

            const near_titik = await Titik.getNearest(latitude, longitude)

            if(near_titik.length > 0) {
                let status_id
    
                if (parseInt(jam) >= 8 && jam <= 9) {
                    status_id = 1
                } else if (parseInt(jam) > 9 && jam <= 12) {
                    status_id = 2
                } else {
                    status_id = 3
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
                console.log(response, 'response')
    
                return res.status(201).json(response)
            } else {
                return res.status(400).json({ message: 'Cant find nearest point' }) 
            }

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    check: async (req, res) => {
        try {
            const nip = req.decodedToken.nip
            const tanggal = moment().tz('Asia/Jakarta').format('YYYY-MM-DD')

            const response = await Presensi.check(nip, tanggal)

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