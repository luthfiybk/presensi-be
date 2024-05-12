const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const LogActivity = {
    getAll: async () => {
        try {
            const response = await prisma.logActivity.findMany()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    login: async (data) => {
        try {
            const response = await prisma.logActivity.create({
                data: {
                    ...data
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    logout: async (data) => {
        try {
            const response = await prisma.logActivity.create({
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

module.exports = LogActivity