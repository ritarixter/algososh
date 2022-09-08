import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../../components/ui/column/column";
import { swap } from "../../utils/algorithms";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [bool,setBool] = useState<boolean>(true)
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

  const bubbleSort = (arr: number[], minToMax: boolean) => {
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

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.container}>
        <div className={styles.header}>
          <RadioInput label="Выбор" extraClass="mr-20" checked={bool} name="radio" onChange={()=>{setBool(true)}}/>
          <RadioInput label="Пузырек" extraClass="mr-20"  checked={!bool} name="radio" onChange={()=>{setBool(false)}}/>
          <Button
            disabled={!arr.length}
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass="ml-6 mr-6"
            onClick={() => {
              setArr([...bubbleSort(arr, false)]);
            }}
          />
          <Button
            disabled={!arr.length}
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => {
              setArr([...bubbleSort(arr, true)]);
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
