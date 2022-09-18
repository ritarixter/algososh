import React, { useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../../components/ui/column/column";
import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { IArr } from "../../types/types";
import { randomArr } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<IArr[]>([]);
  const [bool, setBool] = useState<boolean>(true);
  const [loaderDescending, setLoaderDescending] = useState<boolean>(false);
  const [loaderAscending, setLoaderAscending] = useState<boolean>(false);
  

  const selectionSort = (newArr: IArr[], minToMax: boolean) => {
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
      }
    };
    recursion();
  };

  const bubbleSort = (newArr: IArr[], minToMax: boolean) => {
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
      }
    };
    recursion();
  };

  const onClickButton = (maxToMin: boolean) => {
    if(maxToMin){
      setLoaderDescending(true)
    }
    else{
      setLoaderAscending(true);
    }

    let newArr: IArr[] = [];
    arr.forEach((el) => {
      newArr.push({ ...el, elState: ElementStates.Default });
    });

    if (!bool) {
      bubbleSort(newArr, maxToMin);
    } else {
      selectionSort(newArr, maxToMin);
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
            disabled={loaderDescending || loaderAscending}
          />
          <RadioInput
            label="Пузырек"
            extraClass="mr-20"
            checked={!bool}
            name="radio"
            onChange={() => {
              setBool(false);
            }}
            disabled={loaderDescending || loaderAscending}
          />
          <Button
            isLoader={loaderAscending}
            disabled={!arr.length || loaderDescending}
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass="ml-6 mr-6"
            onClick={() => {
              onClickButton(false);
            }}
          />
          <Button
            isLoader={loaderDescending}
            disabled={!arr.length || loaderAscending}
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => {
              onClickButton(true);
            }}
          />
          <div className={styles.button}>
            <Button
              text="Новый массив"
              onClick={() => {
                setArr(randomArr());
              }}
              disabled={loaderDescending || loaderAscending}
            />
          </div>
        </div>
        <ul className={styles.array_container}>
          {arr.map((el: IArr, index: React.Key) => (
            <li className={styles.array_list} key={index}>
              <Column index={el.number} state={el.elState} />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
