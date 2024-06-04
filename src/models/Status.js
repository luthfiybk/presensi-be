const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const Status = {
    getAll: async () => {
        try {
            const response = await prisma.status.findMany()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    update: async (id, data) => {
        try {
            const response = await prisma.status.update({
                where: {
                    id: parseInt(id)
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

module.exports = Status