import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Элемент Circle работает корректно", ()=>{
  it('Circle без буквы рендерится корректно', ()=>{
    const tree = renderer.create(<Circle/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с буквой рендерится корректно', ()=>{
    const tree = renderer.create(<Circle letter="Текст"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с head рендерится корректно', ()=>{
    const tree = renderer.create(<Circle head="5"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в head рендерится корректно', ()=>{
    const tree = renderer.create(<Circle head={<Circle/>}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с tail рендерится корректно', ()=>{
    const tree = renderer.create(<Circle tail="5"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в tail рендерится корректно', ()=>{
    const tree = renderer.create(<Circle tail={<Circle/>}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с index рендерится корректно', ()=>{
    const tree = renderer.create(<Circle index={2}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с isSmall ===  true рендерится корректно', ()=>{
    const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с состоянием default рендерится корректно', ()=>{
    const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с состоянием changing рендерится корректно', ()=>{
    const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с состоянием modified рендерится корректно', ()=>{
    const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
})