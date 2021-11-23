import React from 'react';
import renderer from 'react-test-renderer';

import NewsScreen from '../NewsScreen';

jest.useFakeTimers();
jest.mock('../NewsScreen', () => (props) => <mock-NewsScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<NewsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
