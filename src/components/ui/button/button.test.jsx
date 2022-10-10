import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';


it('Кнопка с текстом рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text="Развернуть" />).toJSON();
    expect(tree).toMatchSnapshot();
}); 