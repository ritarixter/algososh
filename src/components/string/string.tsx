import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [inputValue, setinputValue] = useState('');
  return (
    <SolutionLayout title="Строка">
      <form className={styles.container}>
        <div className={styles.input}>
          <Input
            maxLength={11}
            onChange={(e: any) => setinputValue(e.target.value)}
            value={inputValue}
          />
          <p className={styles.paragraph}>Максимум — 11 символов</p>
        </div>
        <Button text="Развернуть" 
        extraClass={`${ inputValue && "text_color_secondary"}`}
     
        />
      </form>
    </SolutionLayout>
  );
};
