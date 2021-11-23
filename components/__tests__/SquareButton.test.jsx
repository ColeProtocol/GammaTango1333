import React from 'react';
import renderer from 'react-test-renderer';

import SquareButton from '../SquareButton';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<SquareButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
