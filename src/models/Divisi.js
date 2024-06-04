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
    },

    create: async (nama_divisi) => {
        try {
            const response = await prisma.divisi.create({
                data: {
                    nama_divisi: nama_divisi
                }
            })
            
            return response
        } catch (error) {
            throw new Error(error.message)
        }
    },

    update: async (id, nama_divisi) => {
        try {
            const response = await prisma.divisi.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    nama_divisi: nama_divisi
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Divisi