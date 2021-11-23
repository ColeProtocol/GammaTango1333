import React from 'react';
import renderer from 'react-test-renderer';

import NewsTab from '../NewsTab';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('../NewsTab', () => (props) => <mock-NewsTab {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<NewsTab />).toJSON();
  expect(tree).toMatchSnapshot();
});
