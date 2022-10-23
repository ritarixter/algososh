import { useState as useStateMock } from "react";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./sorting-page.utils";

const value = [{ number: 10, elState: ElementStates.Default }, { number: 47, elState: ElementStates.Default }, { number: 16, elState: ElementStates.Default }]
const res1 = [{ number: 10, elState: ElementStates.Modified }, { number: 16, elState: ElementStates.Modified }, { number: 47, elState: ElementStates.Modified }]
const res2 = [{ number: 47, elState: ElementStates.Modified }, { number: 16, elState: ElementStates.Modified }, { number: 10, elState: ElementStates.Modified }]
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const setArr = jest.fn();
const setLoaderDescending = jest.fn();
const setLoaderAscending = jest.fn();
useStateMock.mockImplementation(init => [init, setArr]);
useStateMock.mockImplementation(init => [init, setLoaderDescending]);
useStateMock.mockImplementation(init => [init, setLoaderAscending]);

describe('Алгоритм сортировки Пузырьком работает корректно', () => {
  it('Сортировка массива из нескольких элементов по возврастанию/убыванию отображается корректно', async () => {
    await bubbleSort(value, false, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith(res1);
    await bubbleSort(value, true, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith(res2);
  });

  it('Сортировка пустого массива по возврастанию/убыванию отображается корректно', async () => {
    await bubbleSort([], false, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([]);
    await bubbleSort([], true, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([]);
  });

  it('Сортировка массива c одним элементом по возврастанию/убыванию отображается корректно', async () => {
    await bubbleSort([{ number: 10, elState: ElementStates.Default }], false, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([{ number: 10, elState: ElementStates.Modified }]);
    await bubbleSort([{ number: 10, elState: ElementStates.Default }], true, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([{ number: 10, elState: ElementStates.Modified }]);
  });
});

describe('Алгоритм сортировки Выбором работает корректно', () => {
  it('Сортировка массива из нескольких элементов по возврастанию/убыванию отображается корректно', async () => {
    await selectionSort(value, false, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith(res1);
    await selectionSort(value, true, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith(res2);
  });

  it('Сортировка пустого массива по возврастанию/убыванию отображается корректно', async () => {
    await selectionSort([], false, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([]);
    await selectionSort([], true, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([]);
  });

  it('Сортировка массива c одним элементом по возврастанию/убыванию отображается корректно', async () => {
    await selectionSort([{ number: 10, elState: ElementStates.Default }], false, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([{ number: 10, elState: ElementStates.Modified }]);
    await selectionSort([{ number: 10, elState: ElementStates.Default }], true, setLoaderDescending, setLoaderAscending, setArr);
    expect(setArr).toHaveBeenLastCalledWith([{ number: 10, elState: ElementStates.Modified }]);
  });
})