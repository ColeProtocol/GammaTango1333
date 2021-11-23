import React from 'react';
import renderer from 'react-test-renderer';

import BattShopListScreen from '../BattShopListScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('../BattShopListScreen', () => (props) => <mock-BattShopListScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<BattShopListScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
