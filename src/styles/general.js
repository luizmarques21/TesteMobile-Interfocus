import { StyleSheet } from 'react-native';
import metrics from './metrics';
import colors from './colors';
import fonts from './fonts';
import { verticalScale } from '../api/utils';

const mbTexto = verticalScale(8);
const general = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		paddingLeft: 5,
		paddingRight: 5,
	},
	section: {
		marginBottom: metrics.baseMargin,
		marginTop: metrics.baseMargin,
	},
	sectionTitle: {
		color: colors.primary,
		fontSize: fonts.big,
		fontFamily: fonts.primaryFamily,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	shadow: {
		shadowColor: colors.backdrop,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	shadow2: {
		shadowColor: colors.texto,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 2,
	},
	debug: {
		borderWidth: 1,
		borderColor: 'red',
	},
	mainContainer: {
		paddingTop: metrics.paddingVertialBase,
		paddingBottom: metrics.baseMargin,
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: metrics.paddingHorizontalBase,
	},
	textDefaultStyle: {
		color: colors.text,
		fontFamily: fonts.primaryFamily,
		fontSize: fonts.regular,
	},
	contentScrollView: {
		flexGrow: 1,
		backgroundColor: colors.background,
		paddingBottom: verticalScale(50),
	},
	textoInformativo: {
		fontFamily: fonts.detailsFamily,
		color: colors.corTextoInformacao,
		marginBottom: mbTexto,
		fontSize: fonts.medium,
	},
	subtituloTela: {
		fontFamily: fonts.primaryFamily,
		fontSize: fonts.input,
		color: colors.corTextoInformacao,
		marginBottom: mbTexto,
	},
});

const textStyle = StyleSheet.flatten({
	color: colors.text,
	marginBottom: 10,
	fontFamily: fonts.primaryFamily,
	fontSize: fonts.medium,
});

const textDefaultStyle = {
	color: colors.text,
	fontFamily: fonts.primaryFamily,
};

const tagsStyles = {
	p: textStyle,
	h2: textDefaultStyle,
	h3: textDefaultStyle,
	h4: textDefaultStyle,
	span: textDefaultStyle,
	em: textDefaultStyle,
	i: textDefaultStyle,
};

const montarEstiloPadrao = ln => {
	const textDefaultStyle = {
		color: colors.text,
		fontFamily: fonts.detailsFamily,
	};

	return {
		p: {
			...textDefaultStyle,
			marginBottom: 15,
			lineHeight: ln * 1.6,
		},
		h1: textDefaultStyle,
		h2: textDefaultStyle,
		h3: textDefaultStyle,
		h4: textDefaultStyle,
		span: textDefaultStyle,
		em: textDefaultStyle,
		i: textDefaultStyle,
	};
};

export { tagsStyles, montarEstiloPadrao };

export default general;
