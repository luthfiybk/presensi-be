const { PrismaClient } = require('@prisma/client')
const { update } = require('./User')
const prisma = new PrismaClient()

const Titik = {
    getAll: async () => {
        try {
            const response = await prisma.titik.findMany()

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    add: async (data) => {
        try {
            const response = await prisma.titik.create({
                data: {
                    ...data
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    update: async (id, nama_titik, latitude, longitude, radius) => {
        try {
            const response = await prisma.titik.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    nama_titik: nama_titik,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    radius: parseInt(radius)
                }
            })

            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Titik