import React, { FormEvent, useMemo, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { IArr } from "../../types/types";
import styles from "../stack-page/stack-page.module.css";
import { Queue } from "./utils";

export const QueuePage: React.FC = () => {
  const [queueArr, setQueueArr] = useState<any[]>([]);
  const [inputValue, setinputValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const arr = useMemo(() => new Queue<IArr | any>(6), []);

  const addValue = async () => {
    arr.enqueue({ number: Number(inputValue), elState: ElementStates.Default });
    setQueueArr([...queueArr ,arr.container]);
    console.log(arr)
    console.log(queueArr);
  
  };

  const deleteValue = async () => {};

  return (
    <SolutionLayout title="Очередь">
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
        <Button
          text="Удалить"
          extraClass="ml-6"
          isLoader={loader}
          disabled={queueArr.length === 0}
        />
        <Button
          text="Очистить"
          extraClass="ml-40"
          disabled={loader}
          onClick={() => {
            arr.clear();
            setQueueArr([...arr.container]);
          }}
        />
      </form>

      <ul className={styles.circles}>
        {queueArr.map((stackEl: IArr, index: React.Key) => (
          <li key={index} className={styles.circle}>
            <Circle
              //letter={stackEl.number ? String(stackEl.number) : undefined}
              tail={String(index)}
             // state={stackEl.elState}
              //head={stackEl === stackArr[stackArr.length - 1] ? "top" : null}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
