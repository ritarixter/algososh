import React, { FormEvent, useMemo, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Stack } from "./utils";

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<any>([]);
  const [inputValue, setinputValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  
  const arr = useMemo(() => new Stack<string>(), []); // 
  const addValue = () =>{
    setinputValue('')
    arr.push(String(inputValue))

  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.container}>
        <div className={styles.input}>
          <Input
            maxLength={4}
            isLimitText={true}
            type="text"
            placeholder="Введите значение"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setinputValue(e.currentTarget.value)
            }
            value={inputValue}
          />
        </div>
        <Button
          text="Добавить"
          extraClass={`${inputValue && "text_color_secondary"}`}
          disabled={!inputValue}
          isLoader={loader}
          onClick={addValue}
        />
        <Button text="Удалить" extraClass="ml-6" isLoader={loader} />
        <Button text="Очистить" extraClass="ml-40" isLoader={loader} />
        {/* <Button
          isLoader={loader}
          disabled={!inputValue}
          text="Рассчитать"
          extraClass={`${inputValue && "text_color_secondary"}`}
          type="submit"
        /> */}
      </form>

      <ul className={styles.circles}>
        {stackArr.map((char: string, index: React.Key) => (
          <li key={index} className={styles.circle}>
            <Circle letter={String(char)} tail={String(index)} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
