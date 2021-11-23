import React from 'react';
import renderer from 'react-test-renderer';

import PostReply from '../PostReply';

jest.useFakeTimers();
jest.mock('../PostReply', () => (props) => <mock-PostReply {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<PostReply />).toJSON();
  expect(tree).toMatchSnapshot();
});
