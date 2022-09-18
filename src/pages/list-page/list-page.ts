export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  getSize: () => number;
  print: () => void;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(element: T) {
    const node = new Node(element);
    // ваш код
    if(this.size === 0) {
      this.head = node;
    }
    else {
      let currentNode = this.head
      while (currentNode.next){
        currentNode = currentNode.next
      }
       if (currentNode) currentNode.next = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}