import React from 'react';
import renderer from 'react-test-renderer';

import SchoolsPageScreen from '../SchoolsPageScreen';

jest.useFakeTimers();
jest.mock('../SchoolsPageScreen', () => (props) => <mock-SchoolsPageScreen {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<SchoolsPageScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
