import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../api/utils';
import { colors, general, fonts } from '../../styles';

const styles = StyleSheet.create({
	mainContainer: {
		...general.contentScrollView,
		paddingHorizontal: moderateScale(16),
	},
	panelDivida: {
		flexDirection: 'column',
		backgroundColor: colors.backgroundInput,
		borderRadius: moderateScale(8),
		padding: moderateScale(16),
		gap: moderateScale(14),
		marginBottom: verticalScale(20),
		...general.shadow,
	},
	panelTitulo: {
		fontSize: fonts.input,
		fontWeight: '700',
		color: colors.primary,
	},
	panelLinha: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	linhaLabel: {
		fontSize: fonts.regular,
		fontWeight: '700',
		color: colors.text,
	},
	linhaValor: {
		fontSize: fonts.regular,
		fontWeight: '400',
		color: colors.text,
	},
});

export default styles;
