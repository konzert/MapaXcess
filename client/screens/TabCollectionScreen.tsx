import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import SearchView from '../components/map/SearchView';

export default function TabCollectionScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<SearchView navigation={navigation} />
			{/*<Text style={styles.title}>My Collection</Text>*/}
			{/*<View*/}
			{/*	style={styles.separator}*/}
			{/*	lightColor="#eee"*/}
			{/*	darkColor="rgba(255,255,255,0.1)"*/}
			{/*/>*/}
			{/*<EditScreenInfo path="/screens/TabCollectionScreen.tsx" />*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
