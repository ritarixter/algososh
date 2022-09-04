
const reverseArr = (arr: (string|number)[]) => {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
      let tmp
      tmp = arr[start];
      arr[start] = arr[end];
      arr[end] = tmp;
      start++
      end--   
  }
  return arr;
};

export const setDelay = (delay: number = 1000): Promise<null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const swap = (arr: (string|number)[],index1:number,index2:number) => {
  let tmp
  tmp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = tmp;
}

export const fib = (n: number) => {
  let arr: number[] = [0, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};