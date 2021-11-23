import React from 'react';
import renderer from 'react-test-renderer';

import HandbookScreen from '../HandbookScreen';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<HandbookScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
