const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const Status = {
    getAll: async () => {
        try {
            const response = await prisma.status.findMany({
                take: 4
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Status