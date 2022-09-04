import React, { FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { fib, setDelay } from "../../utils/algorithms";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setinputValue] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [arrFib, setArrFib] = useState<number[]>([]);

  const onSubmitForm = () => {
    setLoader(true);
    let arrFibonac: number[] = fib(inputValue);
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
    }, 500);
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
