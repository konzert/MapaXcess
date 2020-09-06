import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	Animated,
} from 'react-native';
import React from 'react';
import { View } from '../components/Themed';
import UberEatsClinic from '../components/UberEatsClinic';

export default function PlaceDetail({ navigation }) {
	// React.useEffect(() => console.log('nav', navigation));

	return (
		<View style={styles.container}>
			<UberEatsClinic nav={navigation} />
			{/*<ScrollView style={{flex: 1, position: 'absolute'}}>*/}
			{/*    <Image style={styles.image} source={require('../assets/images/joe-beef.jpg')}/>*/}
			{/*    <Text style={styles.text}>*/}
			{/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
			{/*        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad*/}
			{/*        minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
			{/*        aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
			{/*        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla*/}
			{/*        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in*/}
			{/*        culpa qui officia deserunt mollit anim id est laborum.*/}
			{/*    </Text>*/}

			{/*</ScrollView>*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	text: {
		fontSize: 30,
	},
	image: {
		position: 'absolute',
		top: 0,
		height: 200,
		width: Dimensions.get('window').width,
	},
});
