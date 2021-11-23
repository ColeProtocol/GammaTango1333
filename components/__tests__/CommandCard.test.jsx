import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Image, Text } from 'react-native';
import renderer from 'react-test-renderer';

import CommandCard from '../CommandCard';

import Copic from '../../assets/images/COPIC.jpeg';

jest.useFakeTimers();
configure({ adapter: new Adapter() });

describe('CommandCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CommandCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with an image', () => {
    const wrapper = shallow(
      <CommandCard>
        <Image src={Copic} />
        <Text>COL Brandon Teague</Text>
      </CommandCard>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles onPress', () => {
    const onPress = jest.fn();

    const wrapper = shallow(
      <CommandCard onPress={onPress}>
        <Image src={Copic} />
        <Text>COL Brandon Teague</Text>
      </CommandCard>,
    );

    wrapper
      .find('TouchableOpacity')
      .first()
      .props()
      .onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
