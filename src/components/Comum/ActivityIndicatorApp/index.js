import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { colors } from '../../../styles';

const ActivityIndicatorApp = ({
	containerStyle,
	size = 'large',
	color = colors.primary,
}) => {
	return (
		<View style={[styles.container, containerStyle]}>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

export default ActivityIndicatorApp;
