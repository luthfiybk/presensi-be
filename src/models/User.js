const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const User = {
    getAll: async () => {
        try {
            const response = await prisma.user.findMany()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getByNIP: async (userId) => {
        try {
            const response = await prisma.user.findUnique({
                where: {
                    nip: userId
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getByEmail: async (email) => {
        try {
            const response = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    create: async (data) => {
        try {
            const response = await prisma.user.create({
                data: {
                    ...data
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    update: async (id, data) => {
        try {
            const response = await prisma.user.update({
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
    },

    delete: async (id) => {
        try {
            const response = await prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = User