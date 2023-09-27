import { scale, moderateScale } from '../api/utils';

const fonts = {
	tiny: scale(10),
	small: scale(11),
	medium: moderateScale(12),
	regular: moderateScale(14),
	input: moderateScale(16),
	big: moderateScale(18),
	large: moderateScale(22),
	sectionTitle: moderateScale(24),
	primaryFamily: 'OpenSans-Regular', // roboto
	detailsFamily: 'OpenSans-Bold', // roboto condensed
	lightFamily: 'OpenSans-Light',
};

export default fonts;
