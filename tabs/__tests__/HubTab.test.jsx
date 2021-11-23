import React from 'react';
import renderer from 'react-test-renderer';

import HubTab from '../HubTab';

jest.useFakeTimers();
jest.mock('@react-navigation/native');
jest.mock('../HubTab', () => (props) => <mock-HubTab {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<HubTab />).toJSON();
  expect(tree).toMatchSnapshot();
});
