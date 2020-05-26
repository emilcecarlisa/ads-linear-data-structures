class DLLNode {
  constructor(element = undefined, next = this, prev = this, isSentinel = false) {
    if(!element && !isSentinel) { console.log(`!! constructing a bad node !!`) }
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.label = "A DoublyLinkedList"
    this.Node = Node;
    this._sentinel = new this.Node(undefined, undefined, undefined, true);
    this._count = 0;
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    // create new node.  It's next is the OLD head.  It's prev is the sentinel.
    let newHead = new DLLNode(element, this._head(), this._sentinel, false);
    // set the OLD head's prev to the new node.
    this._head().prev = newHead
    // set sentinel's next to the NEW head
    this._sentinel.next = newHead
    this._count++;
    return newHead;  
  }

  insertTail(element) {
    let newTail = new DLLNode(element, this._sentinel, this._tail(), false);
    this._tail().next = newTail
    this._sentinel.prev = newTail
    this._count++;
    return newTail;
  }

  removeHead() {
    if (this.count() === 0) {
      return;
    }
    this._count--;
    return this._sentinel.next.remove();
  }

  removeTail() {
    if (this.count() === 0) {
      return;
    } 
    this._count--;
    return this._sentinel.prev.remove();
  }

  remove(node) {
    if (this.count() === 0) {
      return;
    } 
    let nodeToRemove;
    this.forEach((iteratedElement, index, linkedList, iteratedNode) => {
      if(iteratedElement === node.element) { 
        nodeToRemove = iteratedNode
      }
    });
    if(nodeToRemove) {
      this._count--;
      return nodeToRemove.remove()
    } else {
      return
    }    
  }

  forEach(callback, context = this) {
    let index = 0
    if (this.count() === 0) { return; };
    let currentNode = this._sentinel.next;
    while (currentNode._active) {
      callback(currentNode.element, index, context, currentNode);
      currentNode = currentNode.next;
      index++;
    };
  }

  count() {
    return this._count; 
  }
}

export default DoublyLinkedList;