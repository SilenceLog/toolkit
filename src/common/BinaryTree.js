class BinaryTree {
  constructor () {
    this.root = null
  }
  rule (node, newNode) {
    return newNode.key > node.key
  }
  insert (key) {
    let newNode = new Node(key)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  insertNode (node, newNode) {
    if (this.rule(node, newNode)) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
}

class Node {
  constructor (key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

export default BinaryTree
