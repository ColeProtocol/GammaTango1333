import React from 'react';
import renderer from 'react-test-renderer';

import OutProcessing from '../OutProcessing';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<OutProcessing />).toJSON();
  expect(tree).toMatchSnapshot();
});
