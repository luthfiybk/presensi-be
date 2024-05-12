const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const Izin = {
    getAll: async () => {
        try {
            const response = await prisma.izin.findMany()

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
    }
}

module.exports = Izin