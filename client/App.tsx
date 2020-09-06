import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderStyleInterpolators,
	TransitionSpecs
} from '@react-navigation/stack';
import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import WelcomeScreen from './screens/WelcomeScreen';
import { FC } from 'react';
import TabExploreScreen from './screens/TabExploreScreen';
import Tab from './components/UberEats/Tab';
import IntermediateScreen from './screens/IntermediateScreen';
import PlaceDetail from './screens/PlaceDetail';
import PlaceDetailClinic from './screens/PlaceDetailClinic';
import Survey from './components/Survey';
import TabCollectionScreen from './screens/TabCollectionScreen';
import Header from './components/UberEats/Header';
import { Button } from 'react-native';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	const Stack = createStackNavigator();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			// <TabExploreScreen/>
			<SafeAreaProvider>
				{/*<Survey />*/}
				{/*<TabCollectionScreen />*/}

				<NavigationContainer independent={true}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen
							name="Welcome"
							component={WelcomeScreen}
							options={{
								title: '',
								headerLeft: () => null,
								headerTransparent: true,
							}}
						/>

						<Stack.Screen
							name="IntermediateScreen"
							component={IntermediateScreen}
							options={{
								title: '',
								headerLeft: () => null,
								headerTransparent: true,
							}}
						/>
						<Stack.Screen
							name="PlaceDetail"
							component={PlaceDetail}
							options={{
								title: '',
								headerLeft: () => null,
								headerTransparent: true,
							}}
						/>
						<Stack.Screen
							name="PlaceDetailClinic"
							component={PlaceDetailClinic}
							options={{
								title: '',
								headerLeft: () => null,
								headerTransparent: true,
							}}
						/>
						<Stack.Screen
							name="TabCollectionScreen"
							component={TabCollectionScreen}
							options={{
								title: '',
								headerLeft: () => null,
								headerTransparent: true,
								headerStyleInterpolator: HeaderStyleInterpolators.forFade,
							}}
						/>
						<Stack.Screen
							name="TabExploreScreen"
							component={TabExploreScreen}
							options={{
								title: '',
								headerLeft: () => null,
								headerTransparent: true,
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
				{/*</SafeAreaProvider>*/}

				{/*// <SafeAreaProvider>*/}
				{/*// 		<IntermediateScreen/>*/}
			</SafeAreaProvider>
		);
	}
}
