import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabCollectionScreen';
import TabTwoScreen from '../screens/TabProfileScreen';
import TabExploreScreen from '../screens/TabExploreScreen';
import {
	BottomTabParamList,
	TabCollectionParamList,
	TabProfileParamList,
	TabExploreParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Explore"
			tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
		>
			<BottomTab.Screen
				name="Explore"
				component={TabExploreNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="ios-code" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="My Collection"
				component={TabOneNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="ios-code" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={TabTwoNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="ios-code" color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
	return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabMapStack = createStackNavigator<TabExploreParamList>();

function TabExploreNavigator() {
	return (
		<TabMapStack.Navigator>
			<TabMapStack.Screen
				name="Map"
				component={TabExploreScreen}
				options={{ headerShown: false }}
			/>
		</TabMapStack.Navigator>
	);
}

const TabCollectionStack = createStackNavigator<TabCollectionParamList>();

function TabOneNavigator() {
	return (
		<TabCollectionStack.Navigator>
			<TabCollectionStack.Screen
				name="Main"
				component={TabOneScreen}
				options={{ headerTitle: 'My Collection' }}
			/>
		</TabCollectionStack.Navigator>
	);
}

const TabProfileStack = createStackNavigator<TabProfileParamList>();

function TabTwoNavigator() {
	return (
		<TabProfileStack.Navigator>
			<TabProfileStack.Screen
				name="Main"
				component={TabTwoScreen}
				options={{ headerTitle: 'Profile' }}
			/>
		</TabProfileStack.Navigator>
	);
}
