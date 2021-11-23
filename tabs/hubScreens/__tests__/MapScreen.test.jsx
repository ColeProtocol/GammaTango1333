import React from 'react';
import renderer from 'react-test-renderer';

import MapScreen from '../MapScreen';

jest.useFakeTimers();
jest.mock('../MapScreen', () => (props) => <mock-MapScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<MapScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
