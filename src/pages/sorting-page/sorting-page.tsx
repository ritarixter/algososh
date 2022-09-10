import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../../components/ui/column/column";
import { swap } from "../../utils/algorithms";
import { ElementStates } from "../../types/element-states";
import { IArrChar } from "../../types/string";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [bool, setBool] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false)
  const [massiveArr, setmassiveArr]=useState<any[]>([])

  const selectionSort = (arr: any[], minToMax: boolean) => {
    let n = arr.length;

    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i; j < n; j++) {
        if (
          minToMax
            ? arr[j].number > arr[min].number
            : arr[j].number < arr[min].number
        ) {
          min = j;
        }
      }
      if (min != i) {
        //swap(arr, i, min);
        let tmp = arr[i].number;
        arr[i].number = arr[min].number;
        arr[min].number = tmp;
      }
    }
    return arr;
  };

  const randomArr = () => {
    let arr: any[] = [];
    const max = 100;
    const min = 0;
    const minLength = 3;
    const maxLength = 17;
    for (
      let i = 0;
      i < Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      i++
    ) {
      arr.push({ number: Math.floor(Math.random() * (max - min + 1)) + min });
    }

    return arr;
  };

  const bubbleSort = (arr: any[], minToMax: boolean) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      console.log(arr)
      for (let j = i + 1; j < length; j++) {
        if (
          minToMax
            ? arr[i].number < arr[j].number
            : arr[i].number > arr[j].number
        ) {

         let tmp = arr[i].number;
         arr[i].number = arr[j].number;
         arr[j].number = tmp; 
        }
      }
    }
    return arr;
  };

  const onClickButton = (minToMax: boolean) => {
    setLoader(true)
    let newArr: any[] = [];
    arr.forEach((el: any) => {
      newArr.push({ ...el, elState: ElementStates.Default });
    });
 
    if (!bool) {
      
      let i = 0
      const { length } = newArr;
      let recursion = setTimeout(function tick() {
        newArr[i].elState = ElementStates.Changing
       
        console.log(newArr[i])
        for (let j = i + 1; j < length; j++) {
        
          if (
            minToMax
              ? newArr[i].number < newArr[j].number
              : newArr[i].number > newArr[j].number
          ) {
           let tmp = newArr[i].number;
           newArr[i].number = newArr[j].number;
           newArr[j].number = tmp; 
       
           newArr[i].elState = ElementStates.Modified
  
          }
          
        }
        setArr([...newArr])
        i++  
        if (i < length-1) {
            recursion = setTimeout(tick, 1000)
        } else {setLoader(false)}
    }, 1000)

     // setArr([...bubbleSort(newArr, minToMax)]);
    } else {
      setLoader(false)
      setArr([...selectionSort(newArr, minToMax)]);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.container}>
        <div className={styles.header}>
          <RadioInput
            label="Выбор"
            extraClass="mr-20"
            checked={bool}
            name="radio"
            onChange={() => {
              setBool(true);
            }}
            disabled={loader}
          />
          <RadioInput
            label="Пузырек"
            extraClass="mr-20"
            checked={!bool}
            name="radio"
            onChange={() => {
              setBool(false);
            }}
            disabled={loader}
          />
          <Button
           isLoader={loader}
            disabled={!arr.length}
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass="ml-6 mr-6"
            onClick={() => {
              onClickButton(false);
            }}
            
          />
          <Button
          isLoader={loader}
            disabled={!arr.length}
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => {
              onClickButton(true);
            }}
          />
          <div className={styles.button}>
            <Button
              text="Новый массив"
              onClick={() => {
                setArr(randomArr());
              }}
              disabled={loader}
            />
          </div>
        </div>
        <ul className={styles.array_container}>
          {arr.map((el: any, index: React.Key) => (
            <li className={styles.array_list} key={index}>
              <Column index={el.number} state={el.elState}/>
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
