'use strict';

const alphabet = '0123456789';
const ID_length = 8;
let products = [];

function post(propertyParams){
  let newProduct = {};
  let ID_wip = '';
  let search;

  while (ID_wip.length < ID_length){
    ID_wip += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    if (ID_wip.length === ID_length){
      let repeat = products.find((product) => {
        if (product.id === ID_wip){
          return product;
        }
      });

      if (repeat){
        ID_wip = '';
      }
    }
  }

  search = products.find((product) => {
    if (product.name === propertyParams.name){
      return product;
    }
  });

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

function put(propertyParams, target){
  let editedProduct = products.find((product) => {
    if (product.id === parseInt(target)){
      return product;
    }
  })
  
  if (editedProduct){
    if (propertyParams.name !== ''){
      editedProduct.name = propertyParams.name;
    }
    
    if (propertyParams.price !== '' && parseFloat(propertyParams.price) > 0){
      editedProduct.price = parseFloat(propertyParams.price);
    }

    if (propertyParams.inventory !== '' && parseInt(propertyParams.inventory) > 0){
      editedProduct.inventory = parseInt(propertyParams.inventory); 
    }
  
    return {
      "success" : true,
      "message" : `${editedProduct.id} edited.`,
    }
  } else {
    return {
      "success" : false,
      "message" : `Failed to find the target object.`,
    }
  }
}

function _delete(target){
  let search = products.find((product, index) => {
    if (product.id === parseInt(target)){
      return product;
    }
  });
  if (search){
    products.splice(products.indexOf(search), 1);
    return {
      "success" : true,
      "message" : `Successfully deleted ${target}`,
    }
  } else {
    return {
      "success" : false,
      "message" : `Failed to delete ${target}`,
    }
  }
}

function get(target){
  if (!target){
    return products;
  } else {
    let returnValue = products.find((product) => {
      if (product.id === parseInt(target)){
        return product;
      }
    });

    return returnValue;
  }
}

module.exports = {
  post,
  put,
  _delete,
  get,
}