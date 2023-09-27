import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors, general } from '../../../styles';
import { scale, verticalScale } from '../../../api/utils';
import { useNavigation } from '@react-navigation/native';

const iconSize = scale(20);
const heightHeader = verticalScale(70);
export default class NavigationHeaderTitle extends Component {
	render() {
		const { title, textStyle = {} } = this.props;
		return (
			<Text
				style={[general.sectionTitle, textStyle]}
				numberOfLines={2}
				ellipsizeMode='tail'>
				{title}
			</Text>
		);
	}
}

const buildNavigationOptions = ({
	title,
	headerShown,
	color = colors.primary,
	telaAnterior,
	esconderVoltar = false,
}) => {
	const navigation = useNavigation();
	const parent = navigation.getParent();
	const possuiTelaAnterior = !!telaAnterior;
	let mostrarVoltar = true;

	if (parent && parent.state) {
		mostrarVoltar = parent.state.index > 0;
	}

	mostrarVoltar = !esconderVoltar && (mostrarVoltar || possuiTelaAnterior);

	const onPressVoltar = possuiTelaAnterior
		? () => navigation.navigate(telaAnterior)
		: () => navigation.goBack();

	return {
		headerShown,
		headerMode: 'screen',
		headerLayoutPreset: 'center',
		headerBackTitle: null,
		title,
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0.25,
			shadowOffset: { width: 0, height: 4 },
			shadowColor: colors.texto,
			shadowRadius: 4,
			borderBottomWidth: 0,
			backgroundColor: colors.backgroundInput,
			height: heightHeader,
		},
		headerTintColor: color,
		headerTitle: () => (
			<NavigationHeaderTitle textStyle={{ color }} title={title} />
		),
		headerTitleAlign: 'center',
		headerLeft: () =>
			mostrarVoltar && (
				<TouchableHighlight
					style={{
						overflow: 'hidden',
						borderRadius: 8,
						marginLeft: 15,
						borderWidth: 2,
						borderColor: colors.primary,
					}}
					underlayColor={`${colors.background}50`}
					activeOpacity={0.5}
					onPress={onPressVoltar}>
					<Icon
						name='chevron-back-outline'
						size={iconSize}
						color={color}
					/>
				</TouchableHighlight>
			),
		headerRight: () => <View />,
	};
};

export { buildNavigationOptions };
