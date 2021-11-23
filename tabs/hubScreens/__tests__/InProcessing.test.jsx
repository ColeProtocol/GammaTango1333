import React from 'react';
import renderer from 'react-test-renderer';

import InProcessing from '../InProcessing';

jest.useFakeTimers();
jest.mock('../InProcessing', () => (props) => <mock-InProcessing {...props} />);

it('renders correctly', () => {
  const tree = renderer.create(<InProcessing />).toJSON();
  expect(tree).toMatchSnapshot();
});
