import React from 'react';
import renderer from 'react-test-renderer';

import ResourcesScreen from '../ResourcesScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');

it('renders correctly', () => {
  const tree = renderer.create(<ResourcesScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
