import React from 'react';
import renderer from 'react-test-renderer';

import Comment from '../Comment';

jest.useFakeTimers();
jest.mock('../Comment', () => (props) => <mock-Comment {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<Comment />).toJSON();
  expect(tree).toMatchSnapshot();
});
