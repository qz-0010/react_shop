const config = require('../../../config');
const GoodModel = require('../GoodModel');
const wrapAsyncFn = require('../../wrapAsyncFn');
const ServiceError = require('../../ServiceError');

// const compareErrors = require('../../compareErrors');
//  0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

const getAll = wrapAsyncFn(async (req, res, next) => {
  const goods = await GoodModel.find();

  res.send(goods);
  return goods;
});

const uploadImage = (req, res) => {
  const multer = require('multer');
  
  const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  const maxFileSize = 1000 * 1000 * 8;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.pathToImages)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: maxFileSize
    },
    fileFilter: function(req, file, cb) {
      // cb(null, false)
      if(validMimeTypes.indexOf(file.mimetype) === -1) {
        return cb(new ServiceError('UploadService', { img: { message: 'mimetype' } }));
      }

      cb(null, true);
    }
  });

  return upload.single('img');
}

const saveGood = wrapAsyncFn(async (req, res, next) => {
  const { title, price } = req.body;

  const good = await GoodModel.create({
    title, 
    price, 
    image: `${req.file.destination}/${Date.now()}-${req.file.originalname}`
  });
  res.end(good);
  return good;
});

module.exports = {
  getAll,
  uploadImage,
  saveGood
};
