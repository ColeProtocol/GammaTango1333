import React from 'react';
import renderer from 'react-test-renderer';

import ChatRoom from '../ChatRoom';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<ChatRoom />).toJSON();
  expect(tree).toMatchSnapshot();
});
