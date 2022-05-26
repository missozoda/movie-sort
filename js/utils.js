let $ = function(selector, node = document){
  return(node.querySelector(selector))
}

let createElement = function(tagName, className, text){
  let element = document.createElement(tagName);
  element.setAttribute("class", className);
  element.textContent = text;
  return(element);
}