// class BinaryTree {
//   // class Node {

//   // }
//   constructor () {

//   }
//   Node () {

//   }
// }
// 
var BinaryTree = function () {
  this.root = null;

  this.rule = function (node, newNode) {
    return newNode.key > node.key
  }


  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  this.insert = function (key) {
    var newNode = new Node(key);
    if (this.root === null) {
      root = newNode;
    } else {
      this.insertNode(root, new Node);
    }
  }

  this.inserNode = function (node, newNode) {
    if (this.rule(node, newNode)) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
}