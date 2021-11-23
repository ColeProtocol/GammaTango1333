import React from 'react';
import renderer from 'react-test-renderer';

import NewsCard from '../NewsCard';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<NewsCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
