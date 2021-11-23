import React from 'react';
import renderer from 'react-test-renderer';

import CmdTab from '../CmdTab';

jest.useFakeTimers();
jest.mock('@react-navigation/native');

it('renders correctly', () => {
  const tree = renderer.create(<CmdTab />).toJSON();
  expect(tree).toMatchSnapshot();
});
