
import { selectionSort,bubbleSort } from "./sorting-page.utils";

const value = [
  { number: 59, elState: 'default' },
  { number: 1, elState: 'default' },
  { number: 4, elState: 'default' },
  { number: 62, elState: 'default' },
]

const res = [
  {number: 1, elState: 'modified'},
  {number: 4, elState: 'modified'},
  {number: 59, elState: 'modified'},
  {number: 62, elState: 'modified'},
]

describe("Алгоритм сортировки Выбор/Пузырек работают корректно", function () {
  const setState = jest.fn();

  it('Алгоритм сортировки Выбор по возрастанию работает корректно', () => {
    expect(selectionSort(value,true,setState,setState,setState)).toEqual(res);


  });
 
  })