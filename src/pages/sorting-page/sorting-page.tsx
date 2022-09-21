import React, { useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../../components/ui/column/column";

import { ElementStates } from "../../types/element-states";
import { IArr } from "../../types/types";
import { randomArr } from "../../utils/utils";
import { bubbleSort, selectionSort } from "./sorting-page.utils";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<IArr[]>([]);
  const [bool, setBool] = useState<boolean>(true);
  const [loaderDescending, setLoaderDescending] = useState<boolean>(false);
  const [loaderAscending, setLoaderAscending] = useState<boolean>(false);

  const onClickButton = (maxToMin: boolean) => {
    if (maxToMin) {
      setLoaderDescending(true);
    } else {
      setLoaderAscending(true);
    }

    let newArr: IArr[] = [];
    arr.forEach((el) => {
      newArr.push({ ...el, elState: ElementStates.Default });
    });

    if (!bool) {
      bubbleSort(
        newArr,
        maxToMin,
        setLoaderDescending,
        setLoaderAscending,
        setArr
      );
    } else {
      selectionSort(
        newArr,
        maxToMin,
        setLoaderDescending,
        setLoaderAscending,
        setArr
      );
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
