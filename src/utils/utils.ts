import { DELAY_IN_MS } from "../constants/delays";
import { IArr } from "../types/types";

export const swap = (arr: IArr[], index1: number, index2: number) => {
  let tmp;
  tmp = arr[index1].number;
  arr[index1].number = arr[index2].number;
  arr[index2].number = tmp;
};

export const randomArr = () => {
  let arr: any[] = [];
  const max = 100;
  const min = 0;
  const minLength = 3;
  const maxLength = 17;
  for (
    let i = 0;
    i < Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    i++
  ) {
    arr.push({ number: Math.floor(Math.random() * (max - min + 1)) + min });
  }

  return arr;
};

