import React from 'react';
import renderer from 'react-test-renderer';

import AccountTab from '../AccountTab';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('../AccountTab', () => (props) => <mock-AccountTab {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<AccountTab />).toJSON();
  expect(tree).toMatchSnapshot();
});
