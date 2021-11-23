import React from 'react';
import renderer from 'react-test-renderer';

import ProcessingScreen from '../ProcessingScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');

it('renders correctly', () => {
  const tree = renderer.create(<ProcessingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
