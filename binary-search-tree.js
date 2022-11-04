class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let curr = this.root;
    var newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    while (curr) {
      if (val === curr.val) return undefined;

      if (val < curr.val) {
        if (curr.left === null) {
          curr.left = newNode;
          return this;
        }
        curr = curr.left;

      } else {
        if (curr.right === null) {
          curr.right = newNode;
          return this;
        }
        curr = curr.right;
      }
    }
  }


  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, curr = this.root) {

    var newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    if (val < curr.val) {
      if (curr.left === null) {
        curr.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, curr.left);
      }
    } else {
      if (curr.right === null) {
        curr.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, curr.right);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let curr = this.root;
    if (val === curr.val) return curr;

    while (curr) {
      if (val < curr.val) {
        curr = curr.left;
      } else if (val > curr.val) {
        curr = curr.right;
      } else {
        return curr;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, curr = this.root) {
    if (this.root === null) return undefined;

    if (val === curr.val) return curr;

    if (val < curr.val) {
      if (curr.left === null) return undefined;
      return this.findRecursively(val, curr.left);

    } else if (val > curr.val) {
      if (curr.right === null) return undefined;
      return this.findRecursively(val, curr.right);
    }
    return curr;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let curr = this.root;

    function traverse(curr) {
      data.push(curr.val); // visit
      curr.left && traverse(curr.left); // go left if there's a left
      curr.right && traverse(curr.right); // go right if there's a right
    }
    traverse(curr);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let data = [];
    let curr = this.root;

    function traverse(curr) {

      curr.left && traverse(curr.left); // go left if there's a left
      data.push(curr.val); // visit
      curr.right && traverse(curr.right); // go right if there's a right
    }
    traverse(curr);
    return data;
  }

  dfsInOrderIterative() {
    let curr = this.root;
    let stack = [];
    let dfs = [];
    while (stack.length > 0 || curr) {
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop();
      if (curr) {
        dfs.push(curr.val);
        curr = curr.right;
      }
    }
    return dfs;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let data = [];
    let curr = this.root;

    function traverse(curr) {

      curr.left && traverse(curr.left); // go left if there's a left
      curr.right && traverse(curr.right); // go right if there's a right
      data.push(curr.val); // visit
    }
    traverse(curr);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let curr = this.root;
    let queue = [];
    let data = [];

    queue.push(curr);

    while (queue.length) {

      curr = queue.shift();
      data.push(curr.val);

      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;
    // This is the traversing loop:
    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    } // Stops when finds the val
    //Condition 1: no leaves
    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        // Condition 2: with 2 children
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else { // Condition 3: one child
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    if (current === null) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    // if the tree is too small, return
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (current) {
      // Current is largest and has a left subtree and 2nd largest is the largest in that subtree
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      // Current is parent of largest and largest has no children so current is 2nd largest
      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }
      current = current.right;
    }
  }
}

module.exports = BinarySearchTree;
