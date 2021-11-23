import React from 'react';
import renderer from 'react-test-renderer';

import SchoolsScreen from '../SchoolsScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');

it('renders correctly', () => {
  const tree = renderer.create(<SchoolsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
