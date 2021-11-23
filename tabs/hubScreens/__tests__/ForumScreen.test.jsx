import React from 'react';
import renderer from 'react-test-renderer';

import ForumScreen from '../ForumScreen';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<ForumScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
