// prints tree in console
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
// sorting an arr
function mergeSort(arr) {
  const half = arr.length / 2;
  if (arr.length <= 1) {
    return arr;
  }
  const left = arr.splice(0, half);
  const right = arr;
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  let sortedArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}

// single node in a tree
class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

// takes arr as argument and returns balanced binary tree;
class Tree {
  constructor(arr) {
    this.root = buildTree(arr, 0, arr.length - 1);
  }

  insert(value, node = this.root) {
    if (!this.root) {
      this.root = new Node(value);
    }
    if (value > node.data) {
      if (node.right !== null) {
        this.insert(value, node.right);
        return;
      }
      node.right = new Node(value);
    } else if (value < node.data) {
      if (node.left !== null) {
        this.insert(value, node.left);
        return;
      }
      node.left = new Node(value);
    }
  }

  #minValue(node) {
    let minV = node.data;

    while (node.left !== null) {
      minv = node.left.data;
      node = node.left;
    }
    return minV;
  }

  delete(value, node = this.root) {
    if (this.root === null) {
      return this.root;
    }

    if (value === this.root.data) {
      this.root = null;
      return this.root;
    }

    if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else {
      if (node.right === null) {
        return node.left;
      } else if (node.left === null) {
        return node.right;
      }

      node.data = this.#minValue(node.right);

      node.right = this.delete(node.data, node.right);
    }
    return node;
  }
  // accepts a value and returns the node with the given value
  find(value, node = this.root) {
    if (this.root === null) {
      return null;
    }

    if (value === node.data) {
      return node;
    }
    if (value > node.data) {
      if (node.data.right !== null) {
        return this.find(value, node.right);
      } else {
        return null;
      }
    } else if (value < node.data) {
      if (node.data.left !== null) {
        return this.find(value, node.left);
      } else {
        return null;
      }
    }
  }

  //   traverse the tree in breadth-first level order and provide each node as the argument to the provided function.
  //  The method returns an array of values if no function is given
  levelOrder(callback = null, root = this.root) {
    if (!root) {
      return [];
    }
    let result = [];
    let queue = [root];
    while (queue.length !== 0) {
      let subarr = [];
      const n = queue.length;
      for (let i = 0; i < n; i++) {
        let node = queue.pop();
        subarr.push(node.data);
        if (node.left) {
          queue.unshift(node.left);
        }
        if (node.right) {
          queue.unshift(node.right);
        }
        if (callback) {
          callback(node.data);
        }
      }
      result.push(subarr);
    }
    if (!callback) {
      return result;
    }
  }

  //   inorder, preorder, and postorder functions that accept a function parameter.
  // Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument.
  // The functions should return an array of values if no function is given.
  preOrder(callback = null, root = this.root, result = []) {
    if (root === null) {
      return;
    }
    if (callback) {
      callback(root.data);
    } else {
      result.push(root.data);
    }
    this.preOrder(callback, root.left, result);
    this.preOrder(callback, root.right, result);

    if (!callback) return result;
  }

  inOrder(callback = null, root = this.root, result = []) {
    if (root === null) {
      return;
    }

    this.inOrder(callback, root.left, result);

    if (callback) {
      callback(root.data);
    } else {
      result.push(root.data);
    }

    this.inOrder(callback, root.right, result);

    if (!callback) return result;
  }

  postOrder(callback = null, root = this.root, result = []) {
    if (root === null) {
      return;
    }
    this.postOrder(callback, root.left, result);
    this.postOrder(callback, root.right, result);
    if (callback) {
      callback(root.data);
    } else {
      result.push(root.data);
      return result;
    }
  }

  //   Height is defined as the number of edges in longest path from a given node to a leaf node.
  height(node = this.root) {
    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  //   Depth is defined as the number of edges in path from a given node to the tree’s root node.
  depth(node, root = this.root, level = 0) {
    if (!node) {
      return null;
    }
    if (root === null) {
      return 0;
    }
    if (node.data === root.data) {
      return level;
    }
    let count = this.depth(node, root.left, level + 1);
    if (count !== 0) return count;
    return this.depth(node, root.right, level + 1);
  }

  //   A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
  isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(
      this.height(node.left) - this.height(node.right)
    );
    return (
      heightDiff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  #traverse(root, array) {
    if (array !== undefined) array.push(root.data);
    if (root.left !== null) {
      this.#traverse(root.left, array);
    }
    if (root.right !== null) {
      this.#traverse(root.right, array);
    }
    return array;
  }

  //   rebalances an unbalanced tree
  rebalance() {
    if (this.isBalanced(this.root)) return this.root;

    let rebalancedNewTreeArray = [];
    rebalancedNewTreeArray = this.#traverse(this.root, rebalancedNewTreeArray);

    let balancedTree = new Tree(rebalancedNewTreeArray);

    this.root = balancedTree.root;
  }
}
// takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
// and turns it into a balanced binary tree full of Node objects appropriately placed
function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }
  const mid = parseInt((start + end) / 2);

  const root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}


// driver func
function driverScript() {
  const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 40));
  const sortedArr = mergeSort(arr);
  console.log(sortedArr);

  const tree = new Tree(sortedArr);
  console.log(tree);
  console.log(tree.isBalanced());
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());
  tree.insert(1030);
  tree.insert(10450);
  tree.insert(123);
  tree.insert(103);
  console.log(tree.isBalanced());
  tree.rebalance();
  console.log(tree.isBalanced());
}

driverScript();
