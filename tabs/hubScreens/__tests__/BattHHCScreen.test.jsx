import React from 'react';
import renderer from 'react-test-renderer';

import BattHHCScreen from '../BattHHCScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('../BattHHCScreen', () => (props) => <mock-BattHHCScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<BattHHCScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
