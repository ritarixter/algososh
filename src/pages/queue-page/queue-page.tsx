import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IArr, IQueue } from "../../types/types";
import styles from "../stack-page/stack-page.module.css";
import { Queue } from "./quene";

export const QueuePage: React.FC = () => {
  const maxLength = 7;
  const initialState: IQueue[] = Array.from(
    { length: maxLength },
    () => ({
      number: "",
      elState: ElementStates.Default,
    })
  );

  const [queueArr, setQueueArr] = useState<IQueue[]>(initialState);
  const [inputValue, setinputValue] = useState<string>("");
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false);
  const [loaderDelete, setLoaderDelete] = useState<boolean>(false);

  const queue = useMemo(() => new Queue<string>(maxLength), []);

  const addValue = () => {
    if (queue.getSize() < 7) {
      setLoaderAdd(true);
      const array = [...queueArr];
      const tailIndex = queue.getTailIndex();
      array[tailIndex].elState = ElementStates.Changing;
      setQueueArr([...array]);
      setTimeout(() => {
        queue.enqueue(inputValue);
        array[tailIndex].number = inputValue;
        setQueueArr([...array]);
        setinputValue("");
        setTimeout(() => {
          array[tailIndex].elState = ElementStates.Default;
          setQueueArr([...array]);
          setLoaderAdd(false);
        }, SHORT_DELAY_IN_MS);
      }, SHORT_DELAY_IN_MS);
    } else {
      throw new Error("Maximum length exceeded");
    }
  };

  const deleteValue = () => {
    setLoaderDelete(true);
    const array = [...queueArr];
    const headIndex = queue.getHeadIndex();
    array[headIndex].elState = ElementStates.Changing;
    setQueueArr([...array]);
    setTimeout(() => {
      queue.dequeue();
      array[headIndex].number = "";
      setQueueArr([...array]);
      setTimeout(() => {
        array[headIndex].elState = ElementStates.Default;
        setQueueArr([...array]);
        setLoaderDelete(false);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Очередь">
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
          disabled={!inputValue || loaderDelete}
          isLoader={loaderAdd}
          onClick={addValue}
        />
        <Button
          text="Удалить"
          extraClass="ml-6"
          isLoader={loaderDelete}
          disabled={queueArr.length === 0 || loaderAdd}
          onClick={deleteValue}
        />
        <Button
          text="Очистить"
          extraClass="ml-40"
          disabled={loaderAdd || loaderDelete}
          onClick={() => {
            queue.clear();
            setQueueArr(initialState);
          }}
        />
      </form>

      <ul className={styles.circles}>
        {queueArr.map((stackEl, index: React.Key | number) => (
          <li key={index} className={styles.circle}>
            <Circle
              letter={stackEl.number != "" ? String(stackEl.number) : ""}
              index={Number(index)}
              state={stackEl.elState}
              head={
                index === queue.getHeadIndex() && stackEl.number != ""
                  ? "head"
                  : null
              }
              tail={
                index === queue.getTailIndex() - 1 && stackEl.number != ""
                  ? "tail"
                  : ""
              }
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
