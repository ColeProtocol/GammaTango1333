import React from 'react';
import renderer from 'react-test-renderer';

import BattScreen from '../BattScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');

it('renders correctly', () => {
  const tree = renderer.create(<BattScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
