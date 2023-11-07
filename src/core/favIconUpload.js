
import multer from 'multer';
import bodyParser from 'body-parser';
import sharp from 'sharp';

const crypto = require('crypto');
const fs = require('fs');

import { faviconUploadDir } from '../config';

var storage = multer.diskStorage({
    destination: faviconUploadDir,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {

            if (err) return cb(err);
            let ext;

            switch (file.mimetype) {
                case 'image/png':
                    ext = '.png';
                    break;
            }

            cb(null, raw.toString('hex') + ext);
        });
    }
});

var upload = multer({ storage: storage });

let data = [
    {
        filename: 'android-icon-36x36.png',
        size: 36
    },
    {
        filename: 'android-icon-48x48.png',
        size: 48
    },
    {
        filename: 'android-icon-72x72.png',
        size: 72
    },
    {
        filename: 'android-icon-96x96.png',
        size: 96
    },
    {
        filename: 'android-icon-144x144.png',
        size: 144
    },
    {
        filename: 'android-icon-192x192.png',
        size: 192
    },
    {
        filename: 'apple-icon.png',
        size: 192
    },
    {
        filename: 'apple-icon-57x57.png',
        size: 57
    },
    {
        filename: 'apple-icon-60x60.png',
        size: 60
    },
    {
        filename: 'apple-icon-72x72.png',
        size: 72
    },
    {
        filename: 'apple-icon-76x76.png',
        size: 76
    },
    {
        filename: 'apple-icon-114x114.png',
        size: 114
    },
    {
        filename: 'apple-icon-120x120.png',
        size: 120
    },
    {
        filename: 'apple-icon-144x144.png',
        size: 144
    },
    {
        filename: 'apple-icon-152x152.png',
        size: 152
    },
    {
        filename: 'apple-icon-180x180.png',
        size: 180
    },
    {
        filename: 'apple-icon-192x192.png',
        size: 192
    },
    {
        filename: 'favicon.ico',
        size: 24
    },
    {
        filename: 'favicon-16x16.png',
        size: 16
    },
    {
        filename: 'favicon-32x32.png',
        size: 32
    },
    {
        filename: 'favicon-96x96.png',
        size: 96
    },
    {
        filename: 'ms-icon-70x70.png',
        size: 70
    },
    {
        filename: 'ms-icon-144x144.png',
        size: 144
    },
    {
        filename: 'ms-icon-150x150.png',
        size: 150
    },
    {
        filename: 'ms-icon-310x310.png',
        size: 310
    },
    {
        filename: 'apple-touch-icon.png',
        size: 180
    }
];

const removeFile = (fileName) => {
    try {
        if (fs.existsSync(faviconUploadDir + fileName)) {
            fs.unlink(faviconUploadDir + fileName, (err) => {
                if (err) throw err;
                console.log('successfully deleted');
            });
        }
    } catch (error) {
        console.log(`Remove favicon failed: ${error}`)
    }
}

const favIconUpload = app => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // -------------- Remove Favicon -------------- //
    app.post('/removeFaviconLogoFile', function (req, res, next) {
        if (!req.user) {
            res.send(403);
        } else {
            next();
        }
    }, upload.single('file'), async (req, res, next) => {
        try {
            req.body && req.body.file && removeFile(req.body.file);
            await res.send({ status: 'SuccessFully removed!' });
        } catch (error) {
            res.send({ status: 'Failed to remove favicon file ' + error });
        }
    });

    // -------------- Upload Favicon -------------- //
    app.post('/uploadFavIcon', function (req, res, next) {
        if (!req.user) {
            res.send(403);
        } else {
            next();
        }
    }, upload.single('file'), async (req, res, next) => {
        try {

            let file = req.file;

            sharp(file.path).toFile(faviconUploadDir + 'favicon.png', function (err) {
                console.log(err)
            });

            await Promise.all([
                data.map(async (o) => {
                    sharp(file.path)
                        .resize(o.size, o.size)
                        .toFile(faviconUploadDir + o.filename, function (err) {
                            console.log({ err })
                        });
                })
            ]);
            await res.send({ status: 'SuccessFully uploaded!', file });

        } catch (error) {
            res.send({ status: 'Oops! Something happened ' + error });
        }
    });
}

export default favIconUpload;