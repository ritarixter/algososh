interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHeadIndex: () => number;
  getTailIndex: () => number;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  public container: (T | null)[] = [];
  private readonly size: number = 0;
  tail: number = 0;
  head: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T): void => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = (): void => {
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  isEmpty = () => this.length === 0;

  getSize = () => this.length;

  getHeadIndex = () => this.head;

  getTailIndex = () => this.tail;

  clear = (): void => {
    this.container = Array(this.size);
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  };
}
