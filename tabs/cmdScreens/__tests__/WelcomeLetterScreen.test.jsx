import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeLetterScreen from '../WelcomeLetterScreen';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<WelcomeLetterScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
