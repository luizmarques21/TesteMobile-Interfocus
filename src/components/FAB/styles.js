import { StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../api/utils';
import { colors, general } from '../../styles';

const sizeBotaoPrincipal = moderateScale(48);
const sizeBotaoSecundario = moderateScale(48);
const margemBottomBotaoSecundario = verticalScale(8);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		position: 'absolute',
		right: scale(15),
		bottom: verticalScale(50),
		zIndex: 1,
	},
	menu: {
		backgroundColor: colors.primary,
	},
	touchable: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	botao: {
		width: sizeBotaoPrincipal,
		height: sizeBotaoPrincipal,
		borderRadius: sizeBotaoPrincipal / 2,
		alignItems: 'center',
		justifyContent: 'center',
		...general.shadow,
		position: 'relative',
	},
	botaoSecundario: {
		width: sizeBotaoSecundario,
		height: sizeBotaoSecundario,
		borderRadius: sizeBotaoSecundario / 2,
		marginBottom: margemBottomBotaoSecundario,
		backgroundColor: '#fff',
	},
	tituloSubmenu: {
		position: 'absolute',
		backgroundColor: '#fff',
		color: '#000',
		opacity: 0.9,
		textAlign: 'center',
		justifyContent: 'center',
		paddingVertical: verticalScale(4),
		paddingHorizontal: scale(6),
		borderRadius: 4,
		minWidth: scale(120),
		maxHeight: verticalScale(40),
		right: scale(60),
	},
	background: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.5)',
		height: '100%',
		width: '100%',
		zIndex: 1,
		paddingRight: moderateScale(15),
		paddingBottom: verticalScale(80),
		marginBottom: verticalScale(-80),
	},
});

export default styles;
