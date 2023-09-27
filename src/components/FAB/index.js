import React, { useCallback, useState } from 'react';
import { Text, View, Animated, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const FloatingActionButton = ({
	style = {},
	submenus = [],
	styleTouchable,
	onPress,
	nomeIcone = 'close',
	tamanhoIcone = 20,
	rotate = true,
	iconColor = '#fff',
}) => {
	const [animation] = useState(new Animated.Value(0));
	const [open, setOpen] = useState(false);

	const toggleMenus = useCallback(() => {
		const toValue = open ? 0 : 1;

		Animated.spring(animation, {
			toValue,
			friction: 5,
		}).start();

		setOpen(!open);
	}, [open, animation]);

	return (
		<>
			<View style={[open ? styles.background : styles.container, style]}>
				{submenus.map((submenu, i) => (
					<Animated.View
						key={String(i)}
						style={[
							styles.botao,
							styles.botaoSecundario,
							{
								transform: [{ scale: animation }],
								opacity: animation.interpolate({
									inputRange: [0, 1],
									outputRange: [0, 1],
								}),
							},
						]}>
						{submenu.texto && (
							<Text style={styles.tituloSubmenu}>
								{submenu.texto}
							</Text>
						)}
						<TouchableOpacity
							activeOpacity={1}
							style={styles.touchable}
							onPress={submenu.onPress}>
							<FAIcon
								size={24}
								name={submenu.icon}
								color='#000'
							/>
						</TouchableOpacity>
					</Animated.View>
				))}
				<Animated.View
					style={[
						styles.botao,
						styles.menu,
						styleTouchable,
						rotate
							? {
									transform: [
										{
											rotate: animation.interpolate({
												inputRange: [0, 1],
												outputRange: ['45deg', '90deg'],
											}),
										},
									],
							  }
							: null,
					]}>
					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.touchable}
						onPress={() => {
							if (submenus.length) {
								toggleMenus();
							}
							if (onPress) {
								onPress();
							}
						}}>
						<FAIcon
							size={tamanhoIcone}
							name={open ? 'close' : nomeIcone}
							color={iconColor}
						/>
					</TouchableOpacity>
				</Animated.View>
			</View>
			{open && (
				<TouchableOpacity
					activeOpacity={1}
					onPress={toggleMenus}
					style={styles.backdrop}
				/>
			)}
		</>
	);
};

export default FloatingActionButton;
