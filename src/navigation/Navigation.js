import React from 'react';

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Views
import Movies from '../views/Movies';
import Detail from '../views/Details';

const Stack = createStackNavigator();

const Screens = {
	Movies: Movies,
	Detail: Detail,
};

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{Object.entries({...Screens}).map(([name, component]) => (
					<Stack.Screen key={name} name={name} component={component} options={{headerShown: false}} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
