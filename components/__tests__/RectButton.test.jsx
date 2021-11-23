import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Image, Text } from 'react-native';
import renderer from 'react-test-renderer';

import RectButton from '../RectButton';

import Torri from '../../assets/images/Torri.png';

jest.useFakeTimers();
configure({ adapter: new Adapter() });

describe('RectButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RectButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with an image', () => {
    const wrapper = shallow(
      <RectButton>
        <Image src={Torri} />
        <Text>This is a test</Text>
        <Image src={Torri} />
      </RectButton>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles onPress', () => {
    const onPress = jest.fn();

    const wrapper = shallow(
      <RectButton onPress={onPress}>
        <Image src={Torri} />
        <Text>This is a test</Text>
        <Image src={Torri} />
      </RectButton>,
    );

    wrapper
      .find('TouchableOpacity')
      .first()
      .props()
      .onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
