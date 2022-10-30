/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // if (!this.root) return 0;
    // let traverStack = [this], sum, curr;

    // while (traverStack.length) {
    //   curr = traverStack.pop();               
    //   sum += curr.val;                       console.log(curr.val);

    //   for (let child of curr.children)
    //     traverStack.push(child);
    // }
    // return sum;


    if (!this.root) return 0;

    let total = this.root.val;

    function sumHelper(node) {     //console.log(node);
      // go through all the children for a Node
      for (let child of node.children) {
        // accumulate all values
        total += child.val;
        // if it has any children
        if (child.children.length > 0) {
          // recurse with the child as the root
          sumHelper(child);
        }
      }
    }

    sumHelper(this.root);
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    let count = this.root.val % 2 === 0 ? 1 : 0;

    function countEvensHelper(node) {                     //console.log(node);
      // go through all the children for a Node
      for (let child of node.children) {
        // count the child if the value is even
        if (child.val % 2 === 0) count++;
        // if it has any children
        if (child.children.length > 0) {
          // recurse with the child as the root
          countEvensHelper(child);
        }
      }
    }

    countEvensHelper(this.root);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    // let traverStack = [this], count = 0;

    // while (traverStack.length) {
    //   let curr = traverStack.pop();
    //   if (curr.val > lowerBound) count++;

    //   for (let child of curr.children)
    //     traverStack.push(child);
    // }
    // return count;

    if (!this.root) return 0;

    let count = this.root.val > lowerBound ? 1 : 0;

    function countEvensHelper(node) {
      // go through all the children for a Node
      for (let child of node.children) {
        // count the child if the value is greater than lowerBound
        if (child.val > lowerBound) count++;
        // if it has any children
        if (child.children.length > 0) {
          // recurse with the child as the root
          countEvensHelper(child);
        }
      }
    }
    countEvensHelper(this.root);
    return count; 
  }
}

module.exports = { Tree, TreeNode };
