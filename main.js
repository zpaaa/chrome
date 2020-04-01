console.log('hello world!')
// console.log(chrome)
// chrome.bookmarks.getTree(function(bookmarkArray){
//   console.log(bookmarkArray);
// });

//  setDragImage() img 必须在拖动事件之前
var dragIcon = new Image(); 
dragIcon.src = './images/example.gif';
document.querySelector('li').addEventListener('dragstart', function(e){
  console.log(`第${this.value + 1} 个 start`)
  e.dataTransfer.setData("text", {name: 112})
  e.dataTransfer.setDragImage(dragIcon, 100, 100)  
})

//  拖拽过程中持续触发 
// document.querySelector('li').addEventListener('drag', function(){
//   console.log(`第${this.value + 1} 个 drag`)
// })

// document.querySelector('li').addEventListener('dragend', function(){
//   console.log(`第${this.value + 1} 个 dragend`)
// })

// 进入目标元素范围 必须被拖动元素完全在目标元素内才会触发
// document.querySelector('.container').addEventListener('dragenter', function(){
//   console.log(`第${this.value + 1} 个 dragenter`)
// })

// 离开目标元素范围 被拖动元素不完全在目标元素内就会触发
// document.querySelector('.container').addEventListener('dragleave', function(){
//   console.log(`第${this.value + 1} 个 dragleave`)
// })


// 当拖动元素在目标元素范围内时反复触发,不一定完全在目标元素内, 与enter 不同
document.querySelector('.container').addEventListener('dragover', function(e){
  e.preventDefault(); //  必须得阻止默认事件否则drop事件不生效

  // 可以通过这个来做边界判定
  const top  = this.getBoundingClientRect().top
  console.log(`dragover---x: ${e.clientY - top}`)
})

document.querySelector('.container').addEventListener('drop', function(e){
  console.log('drop')
  
  const data = e.dataTransfer.getData("text");
  console.log(data)
})