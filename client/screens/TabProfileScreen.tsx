import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Survey from '../components/Survey';
import Review from "../components/Review";

export default function TabProfileScreen() {
	return (
		<Review />
	);
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },
	// title: {
	// 	fontSize: 20,
	// 	fontWeight: 'bold',
	// },
	// separator: {
	// 	marginVertical: 30,
	// 	height: 1,
	// 	width: '80%',
	// },
});
