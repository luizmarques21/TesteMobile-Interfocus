import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../api/utils';
import { colors, fonts, general } from '../../styles';

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		backgroundColor: colors.backgroundInput,
		borderRadius: moderateScale(8),
		paddingHorizontal: moderateScale(16),
		paddingVertical: verticalScale(10),
		gap: moderateScale(10),
		marginBottom: verticalScale(20),
		...general.shadow,
	},
	titulo: {
		fontSize: fonts.input,
		fontWeight: '700',
		color: colors.secondary,
	},
	cardLinha: {
		flexDirection: 'row',
		gap: moderateScale(8),
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
	linhaValorDevido: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopWidth: 1,
		borderTopColor: colors.border,
		paddingVertical: verticalScale(4),
	},
});

export default styles;
