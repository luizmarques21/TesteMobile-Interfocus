import { StyleSheet, Platform } from 'react-native';
import { moderateScale, verticalScale } from '../../api/utils';
import { general, metrics } from '../../styles';

const styles = StyleSheet.create({
	container: {
		...general.mainContainer,
		paddingHorizontal: moderateScale(16),
		flex: 1,
	},
	listaConvenios: {
		paddingHorizontal: 0,
		paddingBottom: verticalScale(30),
	},
	cabecalho: {
		marginVertical: metrics.baseMargin * 2,
		zIndex: Platform.select({
			ios: 1,
		}),
	},
});

export default styles;
