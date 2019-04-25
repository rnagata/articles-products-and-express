'use strict';

const alphabet = '0123456789';
const ID_length = 8;
let products = [];

// INCOMING: { name: String, price: String, inventory: String }
// RESULT: { id: Number, name: String, price: Number, inventory: Number }


function post(propertyParams){
  let newProduct = {};
  let ID_wip = '';
  let search;

  while (ID_wip.length < ID_length){
    ID_wip += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    if (ID_wip.length === ID_length){
      let repeat = products.reduce((prev, product) => {
        if (product.id === ID_wip){
          return product;
        }
      }, undefined);

      if (repeat){
        ID_wip = '';
      }
    }
  }

  search = products.reduce((prev, product) => {
    if (product.name === propertyParams.name){
      return product;
    }
  }, undefined);

  if (search){
    return {
      "success" : false,
      "message" : "Product already exists.",
    }
  }

  if (propertyParams.name.length <= 0){
    return { 
      "success" : false,
      "message" : "Product name must be one character or more.",
    }
  }

  if (propertyParams.price < 1){
    return {
      "success" : false,
      "message" : "Product price must be one or more.",
    }
  }

  if (propertyParams.inventory < 1){
    return {
      "success" : false,
      "message" : "Product inventory must be one or more.",
    }
  }

  newProduct.id = parseInt(ID_wip);
  newProduct.name = propertyParams.name;
  newProduct.price = parseFloat(propertyParams.price);
  newProduct.inventory = parseInt(propertyParams.inventory);

  products.push(newProduct);
  return {"success" : true};
}


function put(obj){
  console.log('Calling put with ', obj);
  let search = products.reduce((prev, item) => {
    console.log('Trying to match ID with ', item.name);
    if (item.id === parseFloat(obj.id)){
      console.log('Item.id ', item.id);
      console.log('Obj.id ', obj.id);
      return item;
    }
    return prev;
    
  }, undefined);
  if (search){
    console.log('Editing: ', search);
    if (search.name !== obj.name){
      search.name = obj.name;
    }
    if (search.price !== obj.price){
      search.price = parseFloat(obj.price);
    }
    if (search.inventory !== obj.inventory){
      search.inventory =parseFloat(obj.inventory);
    }
    console.log('Result of put', search);
    return {
      "success" : true,
      "id" : search.id
    }
  } else {
    console.log('Can\'t edit');
    return {"success" : false}
  }
}

function _delete(params){
  console.log(params);
  let target;
  let _index;
  products.forEach((product, index) => {
    if (product.id === parseFloat(params.id)){
      target = product;
      _index = index;
    }
  });
  if (target){
    products.splice(_index, 1);
    return {"success" : true};
  } else {
    return {"success" : false};
  }
}

function get(target){
  if (!target){
    return products;
  } else {
    let returnValue = products.reduce((prev, product) => {
      if (product.id === parseInt(target)){
        return product;
      }
    }, undefined);

    return returnValue;
  }
}

module.exports = {
  post,
  put,
  _delete,
  get,
}

