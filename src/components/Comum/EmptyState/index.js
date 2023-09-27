import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { colors } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const EmptyState = ({ style, message }) => {
	const [opacityAnimationValue] = useState(new Animated.Value(0));
	const [scaleAnimationValue] = useState(new Animated.Value(3));
	const [moveAnimationValue] = useState(
		new Animated.ValueXY({ x: 0, y: 200 }),
	);

	const animate = () => {
		Animated.parallel([
			Animated.timing(moveAnimationValue, {
				toValue: { x: 0, y: 0 },
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(opacityAnimationValue, {
				toValue: 1,
				delay: 100,
				duration: 350,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnimationValue, {
				toValue: 1,
				delay: 200,
				duration: 250,
				useNativeDriver: true,
			}),
		]).start();
	};

	useEffect(() => {
		animate();
	}, []);

	return (
		<View style={[styles.container, { ...style }]}>
			<Animated.View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: moveAnimationValue.getTranslateTransform(),
				}}>
				<Animated.View
					style={{
						opacity: opacityAnimationValue,
						transform: [{ scale: scaleAnimationValue }],
					}}>
					<Icon
						name='close-circle-outline'
						size={50}
						color={colors.texto}
					/>
				</Animated.View>
				<Text style={styles.text}>{message}</Text>
			</Animated.View>
		</View>
	);
};

export default EmptyState;
