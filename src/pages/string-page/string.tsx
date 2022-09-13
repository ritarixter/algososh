import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../../components/ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { IArrChar } from "../../types/types";

export const StringComponent: React.FC = () => {
  const [inputValue, setinputValue] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [string, setString] = useState<IArrChar[]>([]);

  const reverseArr = (arr: IArrChar[]) => {
    let stringArr: IArrChar[][] = []; // двумерный массив шагов в алгоритме
    let start = 0;
    let end = arr.length - 1;
    let firtsIteration = 0;
    let arr1: IArrChar[][] = [];

    while (start < end) {
      if (firtsIteration == 0) {
        //Создаем первую строку
        arr[start] = { ...arr[start], elState: ElementStates.Changing };
        arr[end] = { ...arr[end], elState: ElementStates.Changing };
        arr1.push([...arr]);
        firtsIteration++;
      } else {
        //Меняем след. элементы на state Changing, обязательно первым в цикле!
        arr[start + 1] = { ...arr[start + 1], elState: ElementStates.Changing };
        arr[end - 1] = { ...arr[end - 1], elState: ElementStates.Changing };
        let tmp;
        tmp = arr[start];
        //Делаем перестановку элементов и меняем state на Modified
        arr[start] = { ...arr[end], elState: ElementStates.Modified };
        arr[end] = { ...tmp, elState: ElementStates.Modified };
        //Добавляем перестановленные элементы со state
        stringArr.push([...arr]);
        start++;
        end--;
      }
    }
    //Когда чисел нечётное количество, то самостоятельно меняем в конце state центрального числа
    stringArr[start - 1][start] = {
      ...stringArr[start - 1][start],
      elState: ElementStates.Modified,
    };
    //Добавляем первую строку, другие способы введут к странному поведеню алгоритма
    stringArr.unshift(...arr1);
    return stringArr;
  };

  const buttonExpandOnClick = () => {
    setLoader(true);
    //Создаем новый массив со state Default
    let newArrChar: IArrChar[] = [];
    inputValue.split("").forEach((el:any) => {
      newArrChar.push({ ...el, elState: ElementStates.Default });
    });

    //Показываем строку
    if (string) {
      setExpand(true);
    }
    //Создаем двумерный массив всех шагов алгоритма
    const stringArr = reverseArr(newArrChar);

    //Показываем каждый шаг алгоритма с задержкой 1000мс
    let step = 0;
    let interval = setInterval(() => {
      if (step >= stringArr.length - 1) {
        //Удаляем интервал, после всех шагов
        clearInterval(interval);
        newArrChar = [];
        setLoader(false);
      }
      setString(stringArr[step]);
      step++;
    }, 1000);
  };

  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.container}
        onSubmit={(evt) => {
          evt.preventDefault();
          buttonExpandOnClick();
        }}
      >
        <div className={styles.input}>
          <Input
            maxLength={11}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setinputValue(e.currentTarget.value)
            }
            value={inputValue}
            disabled={loader}
          />
          <p className={styles.paragraph}>Максимум — 11 символов</p>
        </div>
        <Button
          isLoader={loader}
          disabled={!inputValue}
          text="Развернуть"
          extraClass={`${inputValue && "text_color_secondary"}`}
          type="submit"
        />
      </form>

      {expand && (
        <ul className={styles.circles}>
          {string &&
            string.map((char: IArrChar, index: React.Key) => (
              <li key={index} className={styles.circle}>
                <Circle letter={char[0]} state={char.elState} />
              </li>
            ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
