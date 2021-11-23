import React from 'react';
import renderer from 'react-test-renderer';

import PostDetail from '../PostDetail';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('../PostDetail', () => (props) => <mock-PostDetail {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<PostDetail />).toJSON();
  expect(tree).toMatchSnapshot();
});
