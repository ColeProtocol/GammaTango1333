import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Image, Text } from 'react-native';

import ListItem from '../ListItem';

jest.useFakeTimers();
configure({ adapter: new Adapter() });

describe('ListItem', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ListItem />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with text', () => {
    const wrapper = shallow(
      <ListItem>
        <Text>This is a test</Text>
      </ListItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles onPress', () => {
    const onPress = jest.fn();

    const wrapper = shallow(
      <ListItem onPress={onPress}>
        <Image src={require('../../assets/images/battalions/1-33.png')} />
      </ListItem>,
    );

    wrapper
      .find('TouchableHighlight')
      .first()
      .props()
      .onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

// test if icon component is rendered/not rendered depending on condition
