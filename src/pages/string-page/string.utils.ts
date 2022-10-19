import { ElementStates } from "../../types/element-states";
import { IArrChar } from "../../types/types";

export const reverseArr = (arr: IArrChar[]) => {
  let stringArr: IArrChar[][] = [];
  let start = 0;
  let end = arr.length - 1;
  let firtsIteration = 0;
  let arr1: IArrChar[][] = [];

  if(arr.length === 1){
    arr[start] = { ...arr[start], elState: ElementStates.Changing };
    stringArr.push([...arr])
    arr[start] = { ...arr[start], elState: ElementStates.Modified };
    stringArr.push([...arr])
    return stringArr
  }

  while (start < end) {
    if (firtsIteration == 0) {
      arr[start] = { ...arr[start], elState: ElementStates.Changing };
      arr[end] = { ...arr[end], elState: ElementStates.Changing };
      arr1.push([...arr]);
      firtsIteration++;
    } else {
      arr[start + 1] = { ...arr[start + 1], elState: ElementStates.Changing };
      arr[end - 1] = { ...arr[end - 1], elState: ElementStates.Changing };
      let tmp;
      tmp = arr[start];
      arr[start] = { ...arr[end], elState: ElementStates.Modified };
      arr[end] = { ...tmp, elState: ElementStates.Modified };
      stringArr.push([...arr]);
      start++;
      end--;
    }
  }
  stringArr[start - 1][start] = {
    ...stringArr[start - 1][start],
    elState: ElementStates.Modified,
  };
  stringArr.unshift(...arr1);
  return stringArr;
};