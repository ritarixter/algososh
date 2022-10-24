import { Button } from "./button";
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Кнопка рендериться корректно", () => {
  
it('Кнопка с текстом рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text="Развернуть" />).toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Кнопка без текста рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Заблокированная кнопка рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text="Развернуть" disabled/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 


it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text="Развернуть" disabled/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Нажатие на кнопку проиходит без ошибок', () => {
  const onClick = jest.fn();
    render(<Button text="Развернуть" onClick={onClick} />);
    const button = screen.getByText("Развернуть");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
}); 

})