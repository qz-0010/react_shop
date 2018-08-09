const Model = require('./GoodModel');

const goods = [
  {
    title: 'test good 1',
    price: 2000
  },
  {
    title: 'test good 2',
    price: 2000
  },
  {
    title: 'test good 3',
    price: 2000
  }
];

for (var i = 1; i < 11; i++) {
  let item = {
    title: 'good title ' + i,
    price: 1000 * i
  };

  let model = new Model(item);

  model.save();
}
