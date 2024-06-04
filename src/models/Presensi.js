const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const Presensi = {
    getAll: async () => {
        try {
            const response = await prisma.$queryRaw`
                SELECT Presensi.id, User.nip, User.nama, Presensi.tanggal, Presensi.jamMasuk, Presensi.statusId, Status.nama_status as 'status' 
                FROM Presensi
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

    presensiMasuk: async (nip, data, id) => {
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
                            id: id
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

    // presensiPulang: async (userId, tanggal, jamKeluar) => {
    //     console.log(jamKeluar)
    //     try {
    //         const response = await prisma.$queryRaw`
    //             UPDATE Presensi SET jamKeluar = ${jamKeluar} WHERE userId = ${userId} AND tanggal = ${tanggal}
    //         `

    //         return response
    //     } catch (error) {
    //         throw new Error(error.message)
    //     }
    // },

    getByDate: async (tanggal, nip) => {
        try {
            const response = await prisma.$queryRaw(Prisma.sql`
                SELECT * FROM Presensi WHERE tanggal LIKE ${tanggal} AND (userId IS NULL OR userId = ${nip} OR ${nip} IS NULL)
            `)

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    setAlpha: async (userId) => {
        try {
            const response = await prisma.presensi.create({
                data: {
                    tanggal: new Date(),
                    jamMasuk: new Date(),
                    userId: userId,
                    statusId: 3
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getById: async (id) => {
        try {
            const response = await prisma.$queryRaw`
                SELECT Presensi.id, User.nip, User.nama, Presensi.tanggal, Presensi.jamMasuk, Presensi.statusId, Status.nama_status as 'status', Presensi.latitude, Presensi.longitude FROM Presensi
                LEFT JOIN User ON Presensi.userId = User.nip
                LEFT JOIN Status ON Presensi.statusId = Status.id
                WHERE Presensi.id = ${id}
            `

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Presensi