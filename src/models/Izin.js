const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const Izin = {
    count: async () => {
        try {
            const response = await prisma.izin.count()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getAll: async (nama, tanggal, statusId, divisiId, limit, offset) => {
        try {
            const response = await prisma.$queryRaw(Prisma.sql`
                SELECT Izin.id, User.nip, User.nama, Izin.tanggal, Izin.statusId, Izin.keterangan, Status.nama_status as 'status' FROM Izin
                LEFT JOIN User ON Izin.userId = User.nip
                LEFT JOIN Status ON Izin.statusId = Status.id
                WHERE
                (User.nama LIKE CONCAT('%', ${nama}, '%') OR User.nama IS NULL)
                AND (Izin.tanggal LIKE CONCAT('%', ${tanggal}, '%') OR Izin.tanggal IS NULL)
                AND (Izin.statusId IS NULL OR Izin.statusId = ${statusId} OR ${statusId} IS NULL)
                AND (User.divisiId = ${divisiId} OR ${divisiId} IS NULL)
                ORDER BY Izin.tanggal DESC
                LIMIT ${limit}
                OFFSET ${offset}
            `)

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