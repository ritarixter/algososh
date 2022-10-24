import { Dispatch, SetStateAction } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IArr } from "../../types/types";
import { setDelay, swap } from "../../utils/utils";

export const selectionSort = async (
  newArr: IArr[],
  minToMax: boolean,
  setLoaderDescending: Dispatch<SetStateAction<boolean>>,
  setLoaderAscending: Dispatch<SetStateAction<boolean>>,
  setArr: Dispatch<SetStateAction<Array<IArr>>>
) => {
  let n = newArr.length;
  if (n === 0) {
    setArr([]);
    return;
  }

  if (n === 1) {
    newArr[0].elState = ElementStates.Changing;
    setArr([...newArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    newArr[0].elState = ElementStates.Modified;
    setArr([...newArr]);
    return;
  }
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    newArr[n - 1].elState = ElementStates.Default;
    for (let j = i + 1; j < n; j++) {
      await setDelay(SHORT_DELAY_IN_MS);
      newArr[j - 1].elState = ElementStates.Default;
      newArr[i].elState = ElementStates.Changing;
      newArr[j].elState = ElementStates.Changing;
      setArr([...newArr]);
      if (
        minToMax
          ? newArr[j].number > newArr[min].number
          : newArr[j].number < newArr[min].number
      ) {
        min = j;
      }
    }
    newArr[i].elState = ElementStates.Modified;
    if (min != i) {
      swap(newArr, i, min);
      setArr([...newArr]);
    }
  }

  newArr[n - 1].elState = ElementStates.Modified;
  setArr([...newArr]);
  setLoaderDescending(false);
  setLoaderAscending(false);
};

export const bubbleSort = async (
  newArr: IArr[],
  minToMax: boolean,
  setLoaderDescending: Dispatch<SetStateAction<boolean>>,
  setLoaderAscending: Dispatch<SetStateAction<boolean>>,
  setArr: Dispatch<SetStateAction<Array<IArr>>>
) => {
  const n = newArr.length;
  if (n === 0) {
    setArr([]);
    return;
  }

  if (n === 1) {
    newArr[0].elState = ElementStates.Changing;
    setArr([...newArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    newArr[0].elState = ElementStates.Modified;
    setArr([...newArr]);
    return;
  }
  for (let i = 0; i < n - 1; i++) {
    newArr[n - 1].elState = ElementStates.Default;
    for (let j = i + 1; j < n; j++) {
      await setDelay(SHORT_DELAY_IN_MS);
      if (j >= 2 && newArr[j - 2].elState != ElementStates.Modified) {
        newArr[j - 2].elState = ElementStates.Default;
      }

      newArr[j].elState = ElementStates.Changing;
      newArr[j - 1].elState = ElementStates.Changing;

      if (
        minToMax
          ? newArr[i].number < newArr[j].number
          : newArr[i].number > newArr[j].number
      ) {
        swap(newArr, i, j);
      }
      setArr([...newArr]);
    }
    newArr[i].elState = ElementStates.Modified;
    newArr[n - 2].elState = ElementStates.Default;
    newArr[n - 3].elState = ElementStates.Default;
  }
  newArr.forEach((el) => {
    el.elState = ElementStates.Modified;
  });
  setArr([...newArr]);
  setLoaderDescending(false);
  setLoaderAscending(false);
};

