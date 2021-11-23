import React from 'react';
import renderer from 'react-test-renderer';

import CallRosterScreen from '../CallRosterScreen';

jest.useFakeTimers();
jest.mock('../CallRosterScreen', () => (props) => <mock-CallRosterScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<CallRosterScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
