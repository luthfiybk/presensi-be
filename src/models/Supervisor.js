const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const Supervisor = {
    dashboard: async (divisiId) => {
        try {
            const response = await prisma.$queryRaw`
                SELECT 'Jumlah Karyawan' as kolom, CAST(count(*) as CHAR) as total FROM User WHERE roleId = 2 AND divisiId = ${divisiId} UNION ALL
                SELECT 'Jumlah Karyawan yang Presensi' as kolom, CAST(count(*) as CHAR) as total FROM Presensi UNION ALL
                SELECT 'Jumlah Karyawan yang Izin' as kolom, CAST(count(*) as CHAR) as total FROM Izin
            `

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getKaryawan: async (divisiId) => {
        try {
            const response = prisma.$queryRaw`
                SELECT User.nip, User.nama, Divisi.nama_divisi as 'divisi', User.email FROM User
                LEFT JOIN Divisi ON User.divisiId = Divisi.id
                LEFT JOIN Role ON User.roleId = Role.id
                WHERE User.divisiId = ${divisiId} AND User.roleId = 2
            `

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getIzin: async (divisiId) => {
        try {
            const response = await prisma.$queryRaw`
                SELECT Izin.id, User.nip, User.nama, Izin.statusId, Izin.keterangan, Status.nama_status as 'status', Izin.tanggal FROM Izin
                LEFT JOIN User ON User.nip = Izin.userId
                LEFT JOIN Status ON Status.id = Izin.statusId
                WHERE User.divisiId = ${divisiId}
            `

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getPresensi: async (divisiId) => {
        try {
            const response = await prisma.$queryRaw`
                SELECT Presensi.id, User.nip, User.nama, Presensi.tanggal, Presensi.jamMasuk, Status.nama_status as 'status', Presensi.statusId FROM Presensi
                LEFT JOIN User ON User.nip = Presensi.userId
                LEFT JOIN Status ON Status.id = Presensi.statusId
                WHERE User.divisiId = ${divisiId}
            `

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Supervisor