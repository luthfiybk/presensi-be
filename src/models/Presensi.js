const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const Presensi = {
    getAll: async () => {
        try {
            const response = await prisma.presensi.findMany()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getByNIP: async (userId) => {
        try {
            const response = await prisma.presensi.findUnique({
                where: {
                    userId: userId
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    presensiMasuk: async (nip, latitude, longitude, tanggal, jam_msk) => {
        try {
            const response = await prisma.presensi.create({
                data: {
                    user: { connect: { nip: nip }},
                    latitude: latitude,
                    longitude: longitude,
                    tanggal: tanggal,
                    jamMasuk: jam_msk,
                    status: {
                        connect: {
                            id: 1
                        }
                    }
                }
            })

            console.log(response)

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    presensiPulang: async (userId, tanggal, data) => {
        try {
            const response = await prisma.presensi.update({
                where: {
                    userId: userId,
                    tanggal: tanggal
                },
                data: {
                    ...data
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Presensi