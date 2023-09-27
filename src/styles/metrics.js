import { Dimensions, Platform } from 'react-native';
import { moderateScale } from '../api/utils';

const { width, height } = Dimensions.get('window');

const metrics = {
	smallMargin: 5,
	baseMargin: 10,
	doubleBaseMargin: 20,
	screenWidth: width < height ? width : height,
	screenHeight: width < height ? height : width,
	tabBarHeight: 54,
	navBarHeight: Platform.OS === 'ios' ? 64 : 54,
	statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
	baseRadius: moderateScale(8),
	paddingHorizontalBase: 10,
	paddingVertialBase: 10,
};

export default metrics;
