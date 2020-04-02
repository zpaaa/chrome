console.log('hello world!')
console.log(chrome)
chrome.bookmarks.getTree(function(bookmarkArray){
  console.log(bookmarkArray);
});
