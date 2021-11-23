import React from 'react';
import renderer from 'react-test-renderer';

import PolicyLettersScreen from '../PolicyLettersScreen';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<PolicyLettersScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
