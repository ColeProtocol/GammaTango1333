import { Dimensions } from 'react-native';
import Colors from './Colors';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  button: {
    borderRadius: 15,
    elevation: 5,
    shadowColor: Colors.gray,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    backgroundColor: Colors.white,
  },
  font: {
    //
    // fontFamily: "System",
  },
};
