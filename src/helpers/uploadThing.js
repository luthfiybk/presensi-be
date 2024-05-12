const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'application/pdf') {
            cb(null, true)
        } else {
            return cb(new Error('Only PDFs are allowed'))
        }
    }
})

module.exports = upload