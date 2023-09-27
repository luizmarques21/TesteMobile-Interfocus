import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Input from './Input';
import { colors } from '../../styles';

const InputAcao = ({
	icone,
	onPress,
	error,
	errorStyle,
	loading,
	...props
}) => {
	return (
		<>
			<View style={[styles.formControlAcao, styles.bordaPadrao]}>
				<Input
					{...props}
					showError={false}
					autoCapitalize='none'
					style={styles.inputAcao}
					borderStyle='semBorda'
				/>
				<View style={styles.containerIcone}>
					{loading ? (
						<ActivityIndicator size='small' color={colors.texto} />
					) : (
						<TouchableOpacity onPress={onPress}>
							<Icon name={icone} size={18} color={colors.texto} />
						</TouchableOpacity>
					)}
				</View>
			</View>
			{error ? (
				<Text style={[styles.labelError, errorStyle]}>{error}</Text>
			) : null}
		</>
	);
};

export default InputAcao;
