import React from 'react';
import {
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import ActivityIndicatorApp from '../Comum/ActivityIndicatorApp';
import EmptyState from '../Comum/EmptyState';
import { colors } from '../../styles';
import StatusBarColor from '../Comum/StatusBarColor';

const MainApplication = ({
	load = true,
	mensagemDeErro = '',
	statusBarColor = colors.statusBarColor,
	statusBarStyle = 'dark-content',
	backgroundColor = colors.background,
	children,
}) => {
	return !load ? (
		<ActivityIndicatorApp />
	) : (
		<SafeAreaView
			forceInset={{ top: 'always' }}
			style={{
				flex: 1,
				backgroundColor,
			}}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.select({
					ios: 'padding',
					android: null,
				})}>
				<StatusBarColor
					barStyle={statusBarStyle}
					backgroundColor={statusBarColor}
				/>
				<View style={{ flex: 1 }}>
					{mensagemDeErro ? (
						<EmptyState message={mensagemDeErro} />
					) : (
						children
					)}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default MainApplication;
