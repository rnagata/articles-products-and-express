'use strict';

let articles = [];

function createArticle(propertyParams){
  let newArticle = {}; 
  let search;

  search = articles.find((article) => {
    if (article.title === propertyParams.title){
      return article;
    }
  });

  if (search){
    return {
      success : false,
      message : "article already exists.",
    }
  }
  
  newArticle.title = propertyParams.title;
  newArticle.author = propertyParams.author;
  newArticle.body = propertyParams.body;
  newArticle.urlTitle = encodeURI(propertyParams.title);
  articles.push(newArticle);

  return {
    success : true,
    message : "Article added.",
  };
}

function editArticle(propertyParams, target){
  let editedArticle = articles.find((article) => {
    if (article.title === target){
      return article;
    }
  })
  
  if (editedArticle){
    if (propertyParams.title !== ''){
      editedArticle.title = propertyParams.title;
    }
    if (propertyParams.author !== ''){
      editedArticle.author = propertyParams.author;
    }
    if (propertyParams.body !== ''){
      editedArticle.body = propertyParams.body;
    }
    
    return {
      success : true,
      message : `${editedArticle.title} edited.`,
    }
  } else {
    return {
      success : false,
      message : `Failed to find the target object.`,
    }
  }
}

function deleteArticle(target){
  let search = articles.find((article) => {
    if (article.title === target){
      return article;
    }
  });
  if (search){
    articles.splice(articles.indexOf(search), 1);
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

function getArticle(target){
  if (!target){
    return {
      success : false,
      message : "No article given."
    }
  } else {
    let returnValue = articles.find((article) => {
      if (article.title === target){
        return article;
      }
    });

    return returnValue;
  }
}

function getArticles(){
  return articles;
}

module.exports = {
  createArticle,
  editArticle,
  deleteArticle,
  getArticle,
  getArticles,
}