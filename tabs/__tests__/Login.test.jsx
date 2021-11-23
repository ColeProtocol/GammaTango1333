import React from 'react';
import renderer from 'react-test-renderer';

import Login from '../Login';

jest.useFakeTimers();
jest.mock('../Login', () => (props) => <mock-Login {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
