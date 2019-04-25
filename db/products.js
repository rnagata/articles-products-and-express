'use strict';

let products = [];

function post(obj){
  console.log('Called dbObject.post');
  let search = products.reduce((prev, item) => {
    if (item.name === obj.name){
      return item;
    }
  }, undefined);
  if (search){
    console.log('Product already exists');
    return {"success" : false};
  } else if (obj.name.length <= 0){
    console.log('Product name is too short');
    return {"success" : false};
  } else if (obj.price < 1){
    console.log('Product price must be 1 or more');
    return {"success" : false};
  } else if (obj.inventory < 1){
    console.log('Product inventory must be 1 or more');
    return {"success" : false};
  }

  let product = {
    name : obj.name,
    price : parseFloat(obj.price),
    inventory : parseFloat(obj.inventory)
  }
  product.id = products.length;
  products.push(product);
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
  
  // let target;
  // products.forEach((product) => {
  //   if (product.id === parseFloat(params.id)){
  //     target = product;
  //   }
  // });
  // if (target){
  //   target.price = parseFloat(params.price);
  // }
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
  }
}

function get(){
  return products;
}

module.exports = {
  post,
  put,
  _delete,
  get,
}

