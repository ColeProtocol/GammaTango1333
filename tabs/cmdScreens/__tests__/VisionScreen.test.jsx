import React from 'react';
import renderer from 'react-test-renderer';

import VisionScreen from '../VisionScreen';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<VisionScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
