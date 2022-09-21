import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IList } from "../../types/types";
import { LinkedList } from "./list";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const initialState = ["0", "34", "8", "1"];
  const [inputValue, setinputValue] = useState<string>("");
  const [valueSmallCircle, setValueSmallCircle] = useState<string>("");
  const [inputIndex, setinputIndex] = useState<string>("");
  const [arr, setArr] = useState<IList[]>([]);
  const [loaderAddHead, setLoaderAddHead] = useState<boolean>(false);
  const [loaderAddTail, setLoaderAddTail] = useState<boolean>(false);
  const [loaderDeleteTail, setLoaderDeleteTail] = useState<boolean>(false);
  const [loaderDeleteHead, setLoaderDeleteHead] = useState<boolean>(false);
  const [loaderAddByIndex, setLoaderAddByIndex] = useState<boolean>(false);
  const [loaderDeleteByIndex, setLoaderDeleteByIndex] =
    useState<boolean>(false);

  const list = useMemo(() => new LinkedList<string>(), []);

  useEffect(() => {
    initialState.forEach((el) => {
      list.append(el);
    });
    setArr(list.toArray());
  }, []);

  const addToTail = () => {
    if (list.getSize() === 0) {
      list.append(inputValue);
      setinputValue("");
      setArr(list.toArray());
    } else {
      setLoaderAddTail(true);
      setValueSmallCircle(inputValue);
      let elements = list.toArray();
      elements[list.getSize() - 1].isProgressing = true;
      setArr([...elements]);

      setTimeout(() => {
        list.append(inputValue);

        setinputValue("");
        elements = list.toArray();
        elements[list.getSize() - 1].isProgressing = false;
        elements[list.getSize() - 1].elState = ElementStates.Modified;
        setArr([...elements]);

        setTimeout(() => {
          elements[list.getSize() - 1].elState = ElementStates.Default;
          setArr([...elements]);
          setValueSmallCircle("");
          setLoaderAddTail(false);
        }, SHORT_DELAY_IN_MS);
      }, SHORT_DELAY_IN_MS);
    }
  };

  const addToHead = () => {
    if (list.getSize() === 0) {
      list.prepend(inputValue);
      setinputValue("");
      setArr(list.toArray());
    } else {
      setLoaderAddHead(true);
      setValueSmallCircle(inputValue);
      let elements = list.toArray();
      elements[0].isProgressing = true;
      setArr([...elements]);

      setTimeout(() => {
        list.prepend(inputValue);

        setinputValue("");
        elements = list.toArray();
        elements[1].isProgressing = false;
        elements[0].elState = ElementStates.Modified;
        setArr([...elements]);

        setTimeout(() => {
          elements[0].elState = ElementStates.Default;
          setArr([...elements]);
          setValueSmallCircle("");
          setLoaderAddHead(false);
        }, SHORT_DELAY_IN_MS);
      }, SHORT_DELAY_IN_MS);
    }
  };

  const addByIndex = () => {
    setValueSmallCircle(inputValue);
    setLoaderAddByIndex(true);
    let elements = list.toArray();
    const index = Number(inputIndex);
    setinputIndex("");
    setinputValue("");
    let step = 0;

    if (index === list.getSize() && index == 0) {
      list.prepend(inputValue);
      setinputValue("");
      setinputIndex("");
      elements = list.toArray();
      elements[index].elState = ElementStates.Modified;
      setArr([...elements]);
      setTimeout(() => {
        elements[index].elState = ElementStates.Default;
        setArr([...elements]);
        setLoaderAddByIndex(false);
      }, SHORT_DELAY_IN_MS);
      return;
    }

    if (index >= list.getSize() && index != 0) {
      console.log("Enter a valid index");
      setLoaderAddByIndex(false);
      return;
    }

    let interval = setInterval(() => {
      if (step === Number(index) + 1) {
        clearInterval(interval);
        list.addByIndex(inputValue, index);
        elements = list.toArray();
        elements[index].elState = ElementStates.Modified;
        setArr([...elements]);
        setTimeout(() => {
          elements[index].elState = ElementStates.Default;
          setArr([...elements]);
          setLoaderAddByIndex(false);
        }, SHORT_DELAY_IN_MS);
      } else if (step === 0) {
        elements[step].isProgressing = true;
        elements[step].elState = ElementStates.Changing;
        setArr([...elements]);
        step++;
      } else {
        elements[step - 1].isProgressing = false;
        elements[step].isProgressing = true;
        elements[step].elState = ElementStates.Changing;
        setArr([...elements]);
        step++;
      }
    }, SHORT_DELAY_IN_MS);
  };

  const deleteToHead = () => {
    setLoaderDeleteHead(true);
    let elements = list.toArray();
    setValueSmallCircle(String(elements[0].number));
    elements[0].number = "";
    elements[0].isProgressing = true;
    setArr([...elements]);

    setTimeout(() => {
      list.deleteHead();
      elements = list.toArray();
      setArr([...elements]);
      setValueSmallCircle("");
      setLoaderDeleteHead(false);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteToTail = () => {
    setLoaderDeleteTail(true);
    let elements = list.toArray();
    setValueSmallCircle(String(elements[list.getSize() - 1].number));
    elements[list.getSize() - 1].number = "";
    elements[list.getSize() - 1].isProgressing = true;
    setArr([...elements]);

    setTimeout(() => {
      list.deleteTail();
      elements = list.toArray();
      setArr([...elements]);
      setValueSmallCircle("");
      setLoaderDeleteTail(false);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteByIndex = () => {
    setLoaderDeleteByIndex(true);
    let elements = list.toArray();
    const index = Number(inputIndex);
    setinputIndex("");
    setinputIndex("");
    let step = 0;

    if (index >= list.getSize()) {
      console.log("Enter a valid index");
      setLoaderDeleteByIndex(false);
      return;
    }

    let interval = setInterval(() => {
      if (step === Number(index) + 1) {
        clearInterval(interval);
        setValueSmallCircle(String(elements[index].number));
        elements[index].isProgressing = true;
        elements[index].number = "";
        setArr([...elements]);

        setTimeout(() => {
          list.deleteByIndex(index);
          elements = list.toArray();
          setArr([...elements]);
          setLoaderDeleteByIndex(false);
        }, SHORT_DELAY_IN_MS);
      } else {
        elements[step].elState = ElementStates.Changing;
        setArr([...elements]);
        step++;
      }
    }, SHORT_DELAY_IN_MS);
  };

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
              disabled={
                loaderDeleteTail ||
                loaderDeleteHead ||
                loaderAddHead ||
                loaderAddTail ||
                loaderAddByIndex ||
                loaderDeleteByIndex
              }
            />
          </div>
          <Button
            text="Добавить в head"
            extraClass="ml-6"
            linkedList="small"
            onClick={addToHead}
            disabled={
              loaderDeleteTail ||
              loaderDeleteHead ||
              loaderAddTail ||
              !inputValue ||
              loaderAddByIndex ||
              loaderDeleteByIndex
            }
            isLoader={loaderAddHead}
          />
          <Button
            text="Добавить в tail"
            extraClass="ml-6"
            linkedList="small"
            onClick={addToTail}
            disabled={
              loaderDeleteTail ||
              loaderDeleteHead ||
              loaderAddHead ||
              !inputValue ||
              loaderAddByIndex ||
              loaderDeleteByIndex
            }
            isLoader={loaderAddTail}
          />
          <Button
            text="Удалить из head"
            extraClass="ml-6"
            linkedList="small"
            onClick={deleteToHead}
            disabled={
              loaderDeleteTail ||
              loaderAddTail ||
              loaderAddHead ||
              list.getSize() === 0 ||
              loaderAddByIndex ||
              loaderDeleteByIndex
            }
            isLoader={loaderDeleteHead}
          />
          <Button
            text="Удалить из tail"
            extraClass="ml-6"
            linkedList="small"
            onClick={deleteToTail}
            disabled={
              loaderDeleteHead ||
              loaderAddTail ||
              loaderAddHead ||
              list.getSize() === 0 ||
              loaderAddByIndex ||
              loaderDeleteByIndex
            }
            isLoader={loaderDeleteTail}
          />
        </div>
        <div className={styles.container_line}>
          <div className={styles.input}>
            <Input
              min={0}
              max={list.getSize() != 0 ? list.getSize() - 1 : 0}
              type="number"
              placeholder="Введите индекс"
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setinputIndex(e.currentTarget.value)
              }
              value={inputIndex}
              disabled={
                loaderDeleteTail ||
                loaderDeleteHead ||
                loaderAddHead ||
                loaderAddTail ||
                loaderAddByIndex ||
                loaderDeleteByIndex
              }
            />
          </div>
          <Button
            text="Добавить по индексу"
            extraClass="ml-6"
            linkedList="big"
            onClick={addByIndex}
            disabled={
              !inputIndex ||
              !inputValue ||
              loaderDeleteTail ||
              loaderDeleteHead ||
              loaderAddHead ||
              loaderAddTail
            }
            isLoader={loaderAddByIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass="ml-6"
            linkedList="big"
            onClick={deleteByIndex}
            disabled={
              !inputIndex ||
              list.getSize() === 0 ||
              loaderDeleteTail ||
              loaderDeleteHead ||
              loaderAddHead ||
              loaderAddTail
            }
            isLoader={loaderDeleteByIndex}
          />
        </div>
      </form>

      <ul className={styles.circles}>
        {arr.map((el: IList, index: React.Key) => (
          <li key={index} className={styles.circle}>
            <Circle
              letter={String(el.number)}
              state={el.elState}
              head={
                el.isProgressing ? (
                  <Circle
                    letter={valueSmallCircle}
                    isSmall={true}
                    state={ElementStates.Changing}
                  />
                ) : index === 0 ? (
                  "head"
                ) : (
                  ""
                )
              }
              index={Number(index)}
              tail={index === list.getSize() - 1 ? "tail" : ""}
            />

            <div
              className={
                index !== arr.length - 1 ? styles.arrow : styles.not_visible
              }
            >
              <ArrowIcon />
            </div>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
