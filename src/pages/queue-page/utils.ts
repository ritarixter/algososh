interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead: () => T | null;
  getTail: () => T | null;
  clear: () => void;
} 

export class Queue<T> implements IQueue<T> {
  public container: (T | null)[] = [];
  private readonly size:number = 0
  tail:number = 0
  head:number = 0
  public length:number = 0

  constructor(size:number){
    this.size = size;
    this.container = Array(size)
  }

  enqueue = (item: T): void => {

    this.container[this.tail] = item
    this.tail++
    this.length++

  };

  dequeue = (): void => {
    this.container[this.head] = null
    this.head++
    this.length--
  };

  getHead = (): T | null => {
    if (this.container.length !== 0) {
      return this.container[this.head];
    }
    return null;
  };

  getTail= (): T | null => {
    if (this.container.length !== 0) {
      return this.container[this.tail];
    }
    return null;
  }

  getSize = () => this.length;

  clear = (): void => {
    this.container = []; 
    this.length = 0;
    this.head = 0;
    this.tail = 0
  };
}
