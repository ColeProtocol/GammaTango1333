import React from 'react';
import renderer from 'react-test-renderer';

import OffLimitsScreen from '../OffLimitsScreen';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<OffLimitsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
