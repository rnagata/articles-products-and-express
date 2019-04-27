'use strict';

let products = [];
let counter = 0;

function post(propertyParams){
  let newProduct = {};
  let search;

  search = products.find((product) => {
    if (product.name === propertyParams.name){
      return product;
    }
  });

  if (search){
    return {
      success : false,
      message : "Product already exists.",
    }
  }

  if (propertyParams.name.length <= 0){
    return { 
      success : false,
      message : "Product name must be one or more characters in length.",
    }
  }

  if (propertyParams.price < 1){
    return {
      success : false,
      message : "Product price must be one or greater.",
    }
  }

  if (propertyParams.inventory < 1){
    return {
      success : false,
      message : "Product inventory must be one or greater.",
    }
  }

  newProduct.id = counter;
  newProduct.name = propertyParams.name;
  newProduct.price = parseFloat(propertyParams.price);
  newProduct.inventory = parseInt(propertyParams.inventory);
  products.push(newProduct);
  counter++;

  return {
    success : true,
    message : "Product added."
  };
}

function put(propertyParams, target){
  if (parseFloat(propertyParams.price) < 0){
    return {
      success : false,
      message : "Price must be greater than zero.",
    }
  }
  if (parseInt(propertyParams.inventory) < 0){
    return {
      success: false,
      message: "Inventory must be greater than zero.",
    }
  }

  let editedProduct = products.find((product) => {
    if (product.id === parseInt(target)){
      return product;
    }
  });
  if (!editedProduct){
    return {
      success : false,
      message : "Product not found."
    }
  } 

  if (propertyParams.name !== ''){
    editedProduct.name = propertyParams.name;
  }
  if (propertyParams.price !== ''){
    editedProduct.price = parseFloat(propertyParams.price);
  }
  if (propertyParams.inventory !== ''){
    editedProduct.inventory = parseInt(propertyParams.inventory);
  }
  
  return {
    success : true,
    message : 'Product successfully edited.',
  }
}

function _delete(target){
  let search = products.find((product) => {
    if (product.id === parseInt(target)){
      return product;
    }
  });
  if (search){
    products.splice(products.indexOf(search), 1);
    return {
      success : true,
      message : `Successfully deleted ${target}`,
    }
  } else {
    return {
      success : false,
      message : `Failed to delete ${target}`,
    }
  }
}

function getProduct(target){
  if (!target){
    return {
      success : false,
      message : "No product given.",
    };
  } else {
    let returnValue = products.find((product) => {
      if (product.id === parseInt(target)){
        return product;
      }
    });

    return returnValue;
  }
}

function getProducts(){
  return products;
}

module.exports = {
  post,
  put,
  _delete,
  getProduct,
  getProducts,
}