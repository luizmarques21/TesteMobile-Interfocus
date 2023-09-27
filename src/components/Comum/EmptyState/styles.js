import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../styles';

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: 60,
	},
	text: {
		fontFamily: fonts.primaryFamily,
		fontSize: fonts.input,
		color: colors.text,
		textAlign: 'center',
		marginTop: 15,
	},
});

export default styles;
