const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

async function seeder() {
    try {

        const divisi = await prisma.divisi.createMany({
            data: [
                {
                    nama_divisi: 'IT'
                },
                {
                    nama_divisi: 'Human Resource and Business Partner'
                },
                {
                    nama_divisi: 'Finance'
                },
                {
                    nama_divisi: 'Marketing'
                },
                {
                    nama_divisi: "Production"
                },
                {
                    nama_divisi: "General"
                }
            ]
        })

        const role = await prisma.role.createMany({
            data: [
                {
                    nama_role: 'Admin'
                },
                {
                    nama_role: 'Karyawan'
                },
                {
                    nama_role: 'Supervisor'
                }
            ]
        })

        const status = await prisma.status.createMany({
            data: [
                {
                    nama_status: 'Tepat Waktu',
                    group_status: 'Presensi'
                },
                {
                    nama_status: 'Terlambat',
                    group_status: 'Presensi'
                },
                {
                    nama_status: 'Alpha',
                    group_status: 'Presensi'
                },
                {
                    nama_status: 'Izin Diajukan',
                    group_status: 'Izin'
                },
                {
                    nama_status: 'Izin Disetujui',
                    group_status: 'Izin'
                },
                {
                    nama_status: 'Izin Ditolak',
                    group_status: 'Izin'

                }
            ]
        })

        const user = await prisma.user.createMany({
            data: [
                {
                    nip: '2010311002001',
                    email: 'luthfiybk@ptwpi.co.id',
                    nama: 'Luthfi Arya Manggala',
                    password: await bcrypt.hash('Apahayo1_', 10),
                    roleId: 2,
                    divisiId: 1
                },
                {
                    nip: '2020131191001',
                    email: 'salmafitria@ptwpi.co.id',
                    nama: 'Salma Fitria',
                    password: await bcrypt.hash('Salma1234', 10),
                    roleId: 2,
                    divisiId: 2
                },
                {
                    nip: '2020100302001',
                    email: 'rafliak@ptwpi.co.id',
                    nama: 'Rafli Akbar Putra',
                    password: await bcrypt.hash('Rafli1234', 10),
                    roleId: 2,
                    divisiId: 3
                },
                {
                    nip: '2040110299001',
                    email: 'saveriodav@ptwpi.co.id',
                    nama: 'Saverio Davin Riyandi',
                    password: await bcrypt.hash('Saverio1234', 10),
                    roleId: 2,
                    divisiId: 4
                },
                {
                    nip: '2050150495001',
                    email: 'nikolasarr@ptwpi.co.id',
                    nama: 'Nikolas Arrauf',
                    password: await bcrypt.hash('Nikolas1234', 10),
                    roleId: 2,
                    divisiId: 5
                },
                {
                    nip: '2060280992001',
                    email: 'safrilnur@ptwpi.co.id',
                    nama: 'Safril Nur Azini',
                    password: await bcrypt.hash('Safril1234', 10),
                    roleId: 2,
                    divisiId: 6
                },
                {
                    nip: '3010290899001',
                    email: 'budidar@ptwpi.co.id',
                    nama: 'Budi Darmawan',
                    password: await  bcrypt.hash("Budi2345", 10),
                    roleId: 3,
                    divisiId: 1
                },
                {
                    nip: '3020100598001',
                    email: 'donikur@ptwpi.co.id',
                    nama: 'Doni Kurniawan',
                    password: await  bcrypt.hash("Doni2345", 10),
                    roleId: 3,
                    divisiId: 2
                },
                {
                    nip: '3030210792001',
                    email: "aryotedj@ptwpi.co.id",
                    nama: "Aryo Aryotedjo",
                    password: await bcrypt.hash("Aryo2345", 10),
                    roleId: 3,
                    divisiId: 3
                },
                {
                    nip: '3040170988001',
                    email: "ariandi@ptwpi.co.id",
                    nama: "Ari Andi Kusuma",
                    password: await bcrypt.hash("Arian2345", 10),
                    roleId: 3,
                    divisiId: 4
                },
                {
                    nip: '3050221190001',
                    email: "ditodiy@ptwpi.co.id",
                    nama: "Dito Diyoso",
                    password: await bcrypt.hash("Dito2345", 10),
                    roleId: 3,
                    divisiId: 5
                },
                {
                    nip: '3060070797001',
                    email: "gilangsastra@ptwpi.co.id",
                    nama: "Gilang Kurnia Sastradimaja",
                    password: await bcrypt.hash("Gilang2345", 10),
                    roleId: 3,
                    divisiId: 6
                },
                {
                    nip: '1000090977001',
                    email: 'tri.wahyundo@ptwpi.co.id',
                    nama: 'Tri Wahyundo',
                    password: await bcrypt.hash('P@ssw0rd', 10),
                    roleId: 1,
                    divisiId: null
                }
            ]
        })

        console.log('Seeding success', user, divisi, role, status)

    } catch (error) {
        console.error('Failed to seed database', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

seeder()