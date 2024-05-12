const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const Divisi = {
    getAll: async () => {
        try {
            const response = await prisma.divisi.findMany()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Divisi