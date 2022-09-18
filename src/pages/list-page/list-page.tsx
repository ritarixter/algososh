import React, { FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
export const ListPage: React.FC = () => {
  const [inputValue, setinputValue] = useState<string>("");
  const [inputIndex, setinputIndex] = useState<string>("");
  const [arr, setArr]=useState<any[]>(['1','2','3'])
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.container}>
        <div className={styles.container_line}>
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
          <Button text="Добавить в head" extraClass="ml-6" linkedList="small" />
          <Button text="Добавить в tail" extraClass="ml-6" linkedList="small" />
          <Button text="Удалить из head" extraClass="ml-6" linkedList="small" />
          <Button text="Удалить из tail" extraClass="ml-6" linkedList="small" />
        </div>
        <div className={styles.container_line}>
          <div className={styles.input}>
            <Input
              type="text"
              placeholder="Введите индекс"
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setinputIndex(e.currentTarget.value)
              }
              value={inputIndex}
            />
          </div>
          <Button
            text="Добавить по индексу"
            extraClass="ml-6"
            linkedList="big"
          />
          <Button
            text="Удалить по индексу"
            extraClass="ml-6"
            linkedList="big"
          />
        </div>
      </form>

      
      <ul className={styles.circles}>
        {arr.map((stackEl: any, index: React.Key) => (
          <li key={index} className={styles.circle}>
            <Circle
              letter={stackEl}
              head={<Circle  letter={stackEl} isSmall={true}/>}
            />
            <div className={styles.arrow}>
            <ArrowIcon/>
            </div>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
