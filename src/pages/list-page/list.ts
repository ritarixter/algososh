import { ElementStates } from "../../types/element-states";
import { IList } from "../../types/types";

export class  LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  getSize: () => number;
  deleteTail: () => void;
  deleteHead: () => void;
  deleteByIndex: (index: number) => void;
  addByIndex: (element: T, index: number) => void;
  toArray: () => IList[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  deleteHead() {
    if (this.head) this.head = this.head?.next;
    this.size--;
  }

  deleteTail() {
    let current;
    if (!this.head?.next) {
      this.head = null;
    } else {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.size--;
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      let current = this.head;
      if (index === 0) {
        if (this.head) this.head = this.head?.next;
      } else {
        let prev = null;
        let currIndex = 0;
        while (currIndex++ < index) {
          prev = current;
          if (current) {
            current = current.next;
          }
        }
        if (prev?.next) prev.next = current?.next ? current.next : null;
      }
    }
    this.size--;
  }

  addByIndex (element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new LinkedListNode(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        if (prev) prev.next = node;
        node.next = curr;
      }

      this.size++;
    }
  }

  getSize() {
    return this.size;
  }

  toArray() {
    const list: IList[] = [];
    let current;
    if (this.head === null) {
      return list;
    } else {
      current = this.head;
      while (current.next) {
        list.push({
          number: String(current.value),
          elState: ElementStates.Default,
          isProgressing: false,
        });
        current = current.next;
      }
      list.push({
        number: String(current.value),
        elState: ElementStates.Default,
        isProgressing: false,
      });
    }
    return list;
  }
}
