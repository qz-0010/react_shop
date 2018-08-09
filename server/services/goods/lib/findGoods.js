const GoodModel = require('../GoodModel');

const getAll = () => GoodModel.find();

module.exports.getAll = getAll;
