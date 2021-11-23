import React from 'react';
import renderer from 'react-test-renderer';

import RakFitScreen from '../RakFitScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

it('renders correctly', () => {
  const tree = renderer.create(<RakFitScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
