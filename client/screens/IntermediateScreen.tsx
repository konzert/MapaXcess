import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from '../navigation';
import useCachedResources from '../hooks/useCachedResources';
import useColorScheme from '../hooks/useColorScheme';
import WelcomeScreen from '../screens/WelcomeScreen';
import { FC } from 'react';
import TabExploreScreen from '../screens/TabExploreScreen';
import TabCollectionScreen from '../screens/TabCollectionScreen';
import Tab from '../components/UberEats/Tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabProfileScreen from "./TabProfileScreen";
import Colors from "../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import PlaceDetail from "./PlaceDetail";

export default function IntermediateScreen({ navigation }) {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	const Tab = createBottomTabNavigator();
	return (
		<SafeAreaProvider>
			{/* <Navigation colorScheme={colorScheme} />
            <StatusBar /> */}
			<Tab.Navigator
				tabBarOptions={{ activeTintColor: 'orange', style: {height: 90}, labelStyle: {
						marginTop: -15
					},}}>
				<Tab.Screen
					name="Explore"
					component={TabExploreScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="md-map" color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="My Collection"
					component={TabCollectionScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="md-bookmark" color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="My Profile"
					component={PlaceDetail}
					options={{
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="md-person" color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		</SafeAreaProvider>
	);
}

function TabBarIcon(props: { name: string; color: string }) {
	return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
