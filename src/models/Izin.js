const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const Izin = {
    getAll: async () => {
        try {
            const response = await prisma.$queryRaw`
                SELECT Izin.id, User.nip, User.nama, Izin.tanggal, Izin.statusId, Izin.keterangan, Status.nama_status as 'status' FROM Izin
                LEFT JOIN User ON Izin.userId = User.nip
                LEFT JOIN Status ON Izin.statusId = Status.id
            `

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getById: async (izinId) => {
        try {
            const response = await prisma.$queryRaw`
                SELECT User.nip, User.nama, Izin.tanggal, Izin.statusId, Izin.keterangan, Izin.file, Status.nama_status FROM Izin
                LEFT JOIN User ON Izin.userId = User.nip
                LEFT JOIN Status ON Izin.statusId = Status.id
                WHERE Izin.id = ${izinId}
            `

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    applyIzin: async (data) => {
        try {
            const response = await prisma.izin.create({
                data: {
                    ...data
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    updateIzin: async (id, statusId) => {
        try {
            const response = await prisma.izin.update({
                where: {
                    id: id
                },
                data: {
                    statusId: statusId
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    approveIzin: async (izinId, statusId) => {
        try {
            const response = await prisma.izin.update({
                where: {
                    id: izinId
                },
                data: {
                    statusId: statusId
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    rejectIzin: async (izinId, statusId) => {
        try {
            const response = await prisma.izin.update({
                where: {
                    id: izinId
                },
                data: {
                    statusId: statusId
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Izin