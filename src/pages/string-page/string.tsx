import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../../components/ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { IArrChar } from "../../types/types";
import { reverseArr } from "./string.utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setinputValue] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [string, setString] = useState<IArrChar[]>([]);

  const buttonExpandOnClick = () => {
    setLoader(true);
    let newArrChar: IArrChar[] = [];
    inputValue.split("").forEach((el:{}) => {
      newArrChar.push({ ...el, elState: ElementStates.Default });
    });

    if (string) {
      setExpand(true);
    }

    const stringArr = reverseArr(newArrChar);
    let step = 0;
    let interval = setInterval(() => {
      if (step >= stringArr.length - 1) {
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
