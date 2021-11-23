// jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';

import UserIcon from '../UserIcon';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<UserIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
