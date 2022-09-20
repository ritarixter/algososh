import React, { FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setinputValue] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [arrFib, setArrFib] = useState<number[]>([]);

    const getFibonacciNumbers = (n: number) => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const onSubmitForm = () => {
    setLoader(true);
    let arrFibonac: number[] = getFibonacciNumbers(inputValue);
    let index = 0;
    let arr: number[] = [];

    let interval = setInterval(() => {
      if (index == inputValue) {
        clearInterval(interval);
        setLoader(false);
      }
      arr.push(arrFibonac[index]);
      setArrFib([...arr]);
      index++;
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={styles.container}
        onSubmit={(evt) => {
          evt.preventDefault();
          onSubmitForm();
        }}
      >
        <div className={styles.input}>
          <Input
            max={19}
            isLimitText={true}
            min={1}
            type="number"
            onChange={(evt: FormEvent<HTMLInputElement>) =>
              setinputValue(
                Number(evt.currentTarget.value.replace(/[^0-9]/g, ""))
              )
            }
            value={inputValue}
            disabled={loader}
          />
        </div>
        <Button
          isLoader={loader}
          disabled={!inputValue}
          text="Рассчитать"
          extraClass={`${inputValue && "text_color_secondary"}`}
          type="submit"
        />
      </form>

      <ul className={styles.circles}>
        {arrFib &&
          arrFib.map((char: number, index: React.Key | string) => (
            <li key={index} className={styles.circle}>
              <Circle letter={String(char)} tail={String(index)} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
