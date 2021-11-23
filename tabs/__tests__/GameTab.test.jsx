import React from 'react';
import renderer from 'react-test-renderer';

import GameTab from '../GameTab';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<GameTab />).toJSON();
  expect(tree).toMatchSnapshot();
});
