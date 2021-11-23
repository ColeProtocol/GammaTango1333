import React from 'react';
import renderer from 'react-test-renderer';

import HistoryScreen from '../HistoryScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native');

it('renders correctly', () => {
  const tree = renderer.create(<HistoryScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
