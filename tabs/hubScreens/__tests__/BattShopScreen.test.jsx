import React from 'react';
import renderer from 'react-test-renderer';

import BattShopScreen from '../BattShopScreen';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<BattShopScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
