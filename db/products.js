'use strict';

let products = [];

function post(obj){
  let product = {
    name : obj.name,
    price : parseFloat(obj.price),
    inventory : parseFloat(obj.inventory)
  }
  product.id = products.length;
  products.push(product);
}

function put(params){
  let target;
  products.forEach((product) => {
    if (product.id === parseFloat(params.id)){
      target = product;
    }
  });
  if (target){
    target.price = parseFloat(params.price);
  }
}

function _delete(params){
  let target;
  products.forEach((product) => {
    if (product.id === parseFloat(params.id)){
      target = product;
    }
  });
  if (target && target.inventory > 0){
    target.inventory--; 
  }
}

function get(){
  // console.log(products.map((item) => {
  //   item.name.toString();
  //   item.price.toString();
  //   item.inventory.toString();
  //   item.id.toString();
  //   return item;
  // }));
  return products;
  
}

module.exports = {
  post,
  put,
  _delete,
  get,
}

