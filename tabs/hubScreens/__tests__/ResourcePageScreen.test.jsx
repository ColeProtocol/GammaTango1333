import React from 'react';
import renderer from 'react-test-renderer';

import ResourcePageScreen from '../ResourcePageScreen';

jest.useFakeTimers();
jest.mock('../ResourcePageScreen', () => (props) => <mock-ResourcePageScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<ResourcePageScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
