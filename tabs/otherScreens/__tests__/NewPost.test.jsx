import React from 'react';
import renderer from 'react-test-renderer';

import NewPost from '../NewPost';

jest.useFakeTimers();
jest.mock('../NewPost', () => (props) => <mock-NewPost {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<NewPost />).toJSON();
  expect(tree).toMatchSnapshot();
});
