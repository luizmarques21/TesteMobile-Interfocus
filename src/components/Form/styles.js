import { StyleSheet } from 'react-native';
import { colors, fonts, general, metrics } from '../../styles';
import { scale, verticalScale, moderateScale } from '../../api/utils';

const alturaInputBusca = verticalScale(28);
const inputHeight = verticalScale(35);
const styles = StyleSheet.create({
	formGroup: {
		marginBottom: verticalScale(16),
	},
	label: {
		fontFamily: fonts.detailsFamily,
		fontWeight: 'bold',
		color: colors.texto,
		marginBottom: verticalScale(8),
		fontSize: fonts.input,
	},
	labelError: {
		fontFamily: fonts.detailsFamily,
		fontSize: fonts.medium,
		marginTop: 2,
		color: colors.error,
	},
	info: {
		fontFamily: fonts.detailsFamily,
		color: colors.texto,
		marginTop: 8,
		fontSize: fonts.medium,
		textAlign: 'right',
	},
	formControl: {
		color: colors.texto,
		fontFamily: fonts.detailsFamily,
		fontSize: fonts.regular,
		height: inputHeight,
		paddingHorizontal: scale(14),
		justifyContent: 'center',
		backgroundColor: colors.backgroundInput,
		...general.shadow,
	},
	inputAcao: {
		borderWidth: 0,
		borderColor: undefined,
		borderRadius: 0,
		backgroundColor: 'transparent',
		paddingHorizontal: 0,
		paddingRight: scale(5),
		width: moderateScale(280),
		elevation: 0,
		color: colors.texto,
	},
	formControlAcao: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: colors.backgroundInput,
		paddingHorizontal: moderateScale(8),
		height: inputHeight,
		...general.shadow,
	},
	formControlTextArea: {
		paddingTop: scale(10),
		paddingBottom: scale(5),
		paddingHorizontal: scale(10),
		marginTop: verticalScale(10),
	},
	formControlText: {
		color: colors.primary,
		fontFamily: fonts.detailsFamily,
		fontSize: fonts.regular,
	},

	radioButtonContainer: {
		paddingRight: 10,
		marginBottom: 10,
	},

	radioButtonGroup: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	radioButtonCircle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},

	radioButtonCheckedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
	},

	radioButtonUnchecked: {
		backgroundColor: colors.backgroundInput,
		color: colors.texto,
		borderColor: colors.texto,
	},
	radioButtonChecked: {
		backgroundColor: colors.accent,
		borderColor: colors.texto,
		color: '#fff',
	},
	radioButtonLabel: {
		paddingHorizontal: 9,
		paddingVertical: 6,
		borderRadius: metrics.baseRadius,
		fontFamily: fonts.primaryFamily,
		overflow: 'hidden',
		borderWidth: 1,
	},

	grupoBusca: {
		flexDirection: 'row',
		color: colors.primary,
		fontFamily: fonts.detailsFamily,
		fontSize: fonts.regular,
		borderBottomWidth: 1,
		height: alturaInputBusca,
		paddingBottom: 2,
		paddingTop: 0,
		paddingHorizontal: 8,
		borderBottomColor: colors.texto,
	},
	grupoBuscaTexo: {
		flex: 1,
		color: colors.primary,
		fontFamily: fonts.detailsFamily,
		fontSize: fonts.regular,
	},
	grupoBuscaIcone: {
		bottom: 2,
	},
	containerInputIcone: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: moderateScale(4),
		paddingLeft: moderateScale(12),
	},
	inputLogin: {
		color: colors.backgroundInput,
		fontFamily: fonts.detailsFamily,
		fontSize: fonts.regular,
		height: inputHeight,
		paddingHorizontal: scale(12),
		justifyContent: 'center',
		flex: 1,
	},
	inputPasswordV3: {
		color: '#fff',
		paddingHorizontal: scale(12),
	},
	containerIconeV2: {
		...general.shadow,
		padding: moderateScale(16),
		position: 'absolute',
		borderRadius: moderateScale(50),
		backgroundColor: '#fff',
		zIndex: 2,
	},
	inputLoginV2: {
		marginLeft: moderateScale(30),
		paddingLeft: moderateScale(30),
		color: colors.texto,
		backgroundColor: colors.backgroundInput,
		borderBottomRightRadius: moderateScale(24),
		borderTopRightRadius: moderateScale(24),
		shadowColor: '#000',
		shadowOffset: {
			width: 3,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4.5,
	},
	containerIcone: {
		position: 'absolute',
		right: 15,
		zIndex: 2,
	},
	containerPasswordV2: {
		backgroundColor: '#fff',
		borderRadius: moderateScale(24),
		shadowColor: '#000',
		shadowOffset: {
			width: 3,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4.5,
	},
	inputPasswordV2: {
		marginLeft: moderateScale(30),
		paddingLeft: moderateScale(30),
		color: colors.texto,
	},
	bordaPadrao: {
		borderWidth: 1,
		borderColor: colors.neutral,
		borderRadius: moderateScale(8),
	},
	bordaInferior: {
		borderBottomWidth: 2,
		borderBottomColor: colors.texto,
	},
	bordaRedonda: {
		borderWidth: 1,
		borderColor: colors.texto,
		borderRadius: moderateScale(36),
	},
	bordaRedondaTextArea: {
		borderWidth: 1,
		borderColor: colors.texto,
		borderRadius: moderateScale(24),
	},
});

export default styles;
