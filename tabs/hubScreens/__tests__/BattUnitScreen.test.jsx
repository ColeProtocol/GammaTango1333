import React from 'react';
import renderer from 'react-test-renderer';

import BattUnitScreen from '../BattUnitScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('../BattUnitScreen', () => (props) => <mock-BattUnitScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<BattUnitScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
