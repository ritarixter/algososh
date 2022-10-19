import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IArr } from "../../types/types";
import { swap } from "../../utils/utils";

export const selectionSort = (
  newArr: IArr[],
  minToMax: boolean,
  setLoaderDescending: (arg: boolean) => void,
  setLoaderAscending: (arg: boolean) => void,
  setArr: (arg: IArr[]) => void
) => {
  let n = newArr.length;
  let i = 0;

  const recursion = () => {
    let min = i;
    let j = i + 1;

    let interval = setInterval(() => {
      if (n <= j) {
        newArr[j - 1].elState = ElementStates.Default;
        newArr[i].elState = ElementStates.Modified;
        if (min != i) {
          swap(newArr, i, min);
          setArr([...newArr]);
        }
        clearInterval(interval);
        i++;
        recursion();
      } else {
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
        j++;
      }
    }, DELAY_IN_MS);

    if (i >= n) {
      clearInterval(interval);
      setLoaderDescending(false);
      setLoaderAscending(false);
      console.log(newArr)
      return newArr // добавила для тестов
    }
  };
  recursion();
};

export const bubbleSort = (
  newArr: IArr[],
  minToMax: boolean,
  setLoaderDescending: (arg: boolean) => void,
  setLoaderAscending: (arg: boolean) => void,
  setArr: (arg: IArr[]) => void
) => {
  let i = -1;
  const { length } = newArr;
  const recursion = () => {
    i++;
    let j = i + 1;
    let interval = setInterval(() => {
      if (j >= length) {
        clearInterval(interval);
        newArr[i].elState = ElementStates.Modified;
        newArr[j - 1].elState = ElementStates.Default;
        newArr[j - 2].elState = ElementStates.Default;
        recursion();
      } else {
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
        j++;
        setArr([...newArr]);
      }
    }, DELAY_IN_MS);

    if (i >= length - 1) {
      clearInterval(interval);
      newArr.forEach((el) => {
        el.elState = ElementStates.Modified;
      });
      setArr([...newArr]);
      setLoaderDescending(false);
      setLoaderAscending(false);
      return newArr
    }
  };
  recursion();
};
