
import { selectionSorting,bubbleSorting } from "./sorting-page.utils";
const value = [ 8, 10, 1, 4]
const res = [1, 4, 8, 10]
const res1 = [10, 8, 4 ,1]
describe("Алгоритм сортировки Выбор работают корректно", function () {
  const setState = jest.fn();

  it('Алгоритм сортировки Выбор с несколькими элементами по возрастанию работает корректно', () => {
    expect(selectionSorting(value,true,setState,setState,setState)).toEqual(res);
  });

  it('Алгоритм сортировки Выбор с несколькими элементами по убыванию работает корректно', () => {
    expect(selectionSorting(value,false,setState,setState,setState)).toEqual(res1);
  });

  it('Алгоритм сортировки Выбор с одним элементом по убыванию работает корректно', () => {
    expect(selectionSorting([1],false,setState,setState,setState)).toEqual([1]);
  });

  it('Алгоритм сортировки Выбор с одним элементом по возврастанию работает корректно', () => {
    expect(selectionSorting([1],true,setState,setState,setState)).toEqual([1]);
  });

  it('Алгоритм сортировки Выбор с пустым массивом по возврастанию работает корректно', () => {
    expect(selectionSorting([],true,setState,setState,setState)).toEqual([]);
  });

  it('Алгоритм сортировки Выбор с пустым массивом по возврастанию работает корректно', () => {
    expect(selectionSorting([],false,setState,setState,setState)).toEqual([]);
  });
 
  })

describe("Алгоритм сортировки Пузырьком работают корректно", function () {
  const setState = jest.fn();
  
  it('Алгоритм сортировки Выбор с несколькими элементами по возрастанию работает корректно', () => {
      expect(bubbleSorting(value,true,setState,setState,setState)).toEqual(res);
    });
  
   it('Алгоритм сортировки Выбор с несколькими элементами по убыванию работает корректно', () => {
      expect(bubbleSorting(value,false,setState,setState,setState)).toEqual(res1);
    });
  
  it('Алгоритм сортировки Выбор с одним элементом по убыванию работает корректно', () => {
      expect(bubbleSorting([1],false,setState,setState,setState)).toEqual([1]);
    });
  
  it('Алгоритм сортировки Выбор с одним элементом по возврастанию работает корректно', () => {
      expect(bubbleSorting([1],true,setState,setState,setState)).toEqual([1]);
    });
  
  it('Алгоритм сортировки Выбор с пустым массивом по возврастанию работает корректно', () => {
      expect(bubbleSorting([],true,setState,setState,setState)).toEqual([]);
    });
  
  it('Алгоритм сортировки Выбор с пустым массивом по возврастанию работает корректно', () => {
      expect(bubbleSorting([],false,setState,setState,setState)).toEqual([]);
    });
   
  })

