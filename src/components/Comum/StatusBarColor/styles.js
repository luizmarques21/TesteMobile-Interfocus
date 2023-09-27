import { StyleSheet, Platform } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 0;

export default StyleSheet.create({
	statusBar: {
		height: STATUSBAR_HEIGHT,
		position: 'absolute',
		top: -1 * STATUSBAR_HEIGHT,
		left: 0,
		right: 0,
	},
});
