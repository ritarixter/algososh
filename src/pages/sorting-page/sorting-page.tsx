import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../../components/ui/column/column";
import { swap } from "../../utils/algorithms";
import { ElementStates } from "../../types/element-states";
import { IArrChar } from "../../types/string";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [bool, setBool] = useState<boolean>(true);

  const selectionSort = (arr: any[], minToMax: boolean) => {
    let n = arr.length;

    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i; j < n; j++) {
        if (minToMax ? arr[j] < arr[min] : arr[j] > arr[min]) {
          min = j;
        }
      }
      if (min != i) {
        swap(arr, i, min);
        /*let tmp = arr[i]; 
             arr[i] = arr[min];
             arr[min] = tmp;      */
      }
    }
    return arr;
  };

  const randomArr = () => {
    let arr: number[] = [];
    const max = 100;
    const min = 0;
    const minLength = 3;
    const maxLength = 17;
    for (
      let i = 0;
      i < Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      i++
    ) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return arr;
  };

  const bubbleSort = (arr: any[], minToMax: boolean) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        if (minToMax ? arr[i] < arr[j] : arr[i] > arr[j]) {
          swap(arr, j, i);
        }
      }
    }
    return arr;
  };

  const onClickButton = (minToMax: boolean) => {
    let newArr: IArrChar[] = [];
    arr.forEach((el:any) => {
      newArr.push({ ...el, elState: ElementStates.Default });
    });

    console.log(newArr[0])

    if (bool) {
      setArr([...bubbleSort(newArr, minToMax)]);
    } else {
      setArr([...selectionSort(newArr, minToMax)]);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.container}>
        <div className={styles.header}>
          <RadioInput
            label="Выбор"
            extraClass="mr-20"
            checked={bool}
            name="radio"
            onChange={() => {
              setBool(true);
            }}
          />
          <RadioInput
            label="Пузырек"
            extraClass="mr-20"
            checked={!bool}
            name="radio"
            onChange={() => {
              setBool(false);
            }}
          />
          <Button
            disabled={!arr.length}
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass="ml-6 mr-6"
            onClick={() => {
              onClickButton(false)
            }}
          />
          <Button
            disabled={!arr.length}
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => {
              onClickButton(true)
            }}
          />
          <div className={styles.button}>
            <Button
              text="Новый массив"
              onClick={() => {
                setArr(randomArr());
              }}
            />
          </div>
        </div>
        <ul className={styles.array_container}>
          {arr.map((number: number, index: React.Key) => (
            <li className={styles.array_list} key={index}>
              <Column index={number} />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
