import React from 'react';
import { buildNavigationOptions } from '../components/Comum';
import { AppScreen, ClientesScreen } from '../screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../styles';

const Stack = createStackNavigator();
const AppStack = () => {
	return (
		<Stack.Navigator initialRouteName='App'>
			<Stack.Screen
				name='App'
				component={AppScreen}
				options={buildNavigationOptions({
					title: 'Resumo de dívidas',
					esconderVoltar: true,
				})}
			/>
		</Stack.Navigator>
	);
};

const ClientesStack = () => {
	return (
		<Stack.Navigator initialRouteName='ClientesListagem'>
			<Stack.Screen
				name='ClientesListagem'
				component={ClientesScreen}
				options={buildNavigationOptions({
					title: 'Clientes',
					esconderVoltar: true,
				})}
			/>
		</Stack.Navigator>
	);
};

const Tab = createMaterialBottomTabNavigator();

const Routes = () => {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			labeled={false}
			barStyle={{ backgroundColor: '#fff' }}
			activeColor='#fff'>
			<Tab.Screen
				name='Home'
				component={AppStack}
				options={{
					tabBarIcon: () => (
						<Icon name='home' color={colors.primary} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name='Clientes'
				component={ClientesStack}
				options={{
					tabBarIcon: () => (
						<Icon name='user' color={colors.primary} size={24} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Routes;
