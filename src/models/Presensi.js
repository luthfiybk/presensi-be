const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const Presensi = {
    getAll: async () => {
        try {
            const response = await prisma.$queryRaw`
                SELECT User.nip, User.nama, Presensi.tanggal, Presensi.jamMasuk, Presensi.jamKeluar, Status.nama_status FROM Presensi
                LEFT JOIN User ON Presensi.userId = User.nip
                LEFT JOIN Status ON Presensi.statusId = Status.id
            `

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

    presensiMasuk: async (nip, data) => {
        try {
            
            const response = await prisma.presensi.create({
                data: {
                    ...data,
                    user: { 
                        connect: { 
                            nip: nip
                        }
                    },
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