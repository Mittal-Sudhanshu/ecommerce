const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'images/jpeg' || file.mimetype === 'images/jpg' || file.mimetype === 'images/png') {
//         cb(null, true);
//     }
//     else {
//         cb({ message: 'Unsupported file format' }, false);
//     }
// }

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 },
    // fileFilter: fileFilter
});

module.exports = upload;