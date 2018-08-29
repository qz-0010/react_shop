const path = require('path');
const config = require('../../../config');
const multer = require('multer');
const GoodModel = require('../GoodModel');
const wrapAsyncFn = require('../../wrapAsyncFn');
const ServiceError = require('../../ServiceError');

const getGoodsByPage = wrapAsyncFn(async (req, res, next) => {
  let goods = await GoodModel.find();
  let page = parseInt(req.params.page);
  let pageLength = 25;
  let out = [];

  for( let i = pageLength * (page - 1); (i < pageLength * page && i < goods.length); i++ ) {
    let { title, price, image } = goods[i];
    let imgPath = path.parse(image);

    out.push({ title, price, img: `${config.relPathToImages}/${imgPath.base}` });
  }

  res.send({goods: out});
});

const uploadImage = (req, res) => {  
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
        return cb(new ServiceError('MIMETYPE', { img: { message: 'mimetype' } }));
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
    image: `${req.file.destination}/${req.file.filename}`
  });
  res.send({good: {title, price, img: `${config.relPathToImages}/${req.file.filename}`}});
  return good;
});

module.exports = {
  uploadImage,
  saveGood,
  getGoodsByPage
};
