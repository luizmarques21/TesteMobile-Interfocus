import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer
				onReady={() => RNBootSplash.hide({ duration: 1250 })}>
				<Routes />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default App;
