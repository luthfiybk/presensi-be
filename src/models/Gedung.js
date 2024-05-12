const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const Gedung = {
    getAll: async () => {
        try {
            const response = await prisma.gedung.findMany()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    add: async () => {
        try {
            const response = await prisma.gedung.create({
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

module.exports = Gedung