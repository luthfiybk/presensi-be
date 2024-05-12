const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const Admin = {
    dashboard: async () => {
        try {
            const response = await prisma.$queryRaw(Prisma.sql`
                SELECT 'Jumlah User' as kolom, CAST(count(*) as CHAR) as total FROM User UNION ALL
                SELECT 'Jumlah Karyawan' as kolom, CAST(count(*) as CHAR) as total FROM User WHERE roleId = 2 UNION ALL
                SELECT 'Jumlah Karyawan yang Presensi' as kolom, CAST(count(*) as CHAR) as total FROM Presensi UNION ALL
                SELECT 'Jumlah Karyawan yang Izin' as kolom, CAST(count(*) as CHAR) as total FROM Izin
            `)

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Admin