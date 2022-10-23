import React, { FormEvent, useMemo, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IArr, IArrChar, IQueue } from "../../types/types";
import styles from "./stack-page.module.css";
import { Stack } from "./stack";

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<IArr[]>([]);
  const [inputValue, setinputValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const arr = useMemo(() => new Stack<IArr|any>(), []);
  const addValue = async () => {
    setLoader(true);
    setinputValue("");
    arr.push({ number: inputValue, elState: ElementStates.Changing });
    setStackArr([...arr.container]);
    setTimeout(() => {
      arr.peak().elState = ElementStates.Default;
      setLoader(false);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteValue = async () => {
    setLoader(true);
    arr.peak().elState = ElementStates.Changing;
    setStackArr([...arr.container]);
    setTimeout(() => {
      arr.pop();
      setStackArr([...arr.container]);
      setLoader(false);
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.container}>
        <div className={styles.input}>
          <Input
            maxLength={4}
            isLimitText={true}
            type="text"
            placeholder="Введите значение"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
          data-testid="addButton"
        />
        <Button
          text="Удалить"
          extraClass="ml-6"
          isLoader={loader}
          disabled={stackArr.length === 0}
          onClick={deleteValue}
        />
        <Button
          text="Очистить"
          extraClass="ml-40"
          disabled={loader}
          onClick={() => {
            arr.clear();
            setStackArr([...arr.container]);
          }}
        />
      </form>

      <ul className={styles.circles}>
        {stackArr.map((stackEl, index: React.Key) => (
          <li key={index} className={styles.circle}>
            <Circle
              letter={String(stackEl.number)}
              tail={String(index)}
              state={stackEl.elState}
              head={stackEl === stackArr[stackArr.length - 1] ? "top" : null}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
