import { SafeAreaView, StyleSheet, Dimensions, Text } from "react-native";
import { View } from "../components/Themed";
import React from "react";
import { Video } from "expo-av";
import { BlurView } from "expo-blur";
import { Button } from "react-native-paper";
import WelcomeScroll from "../components/WelcomeScroll";

export default function WelcomeScreen({ navigation }) {
	const { width, height } = Dimensions.get("window");
	return (
		<View style={styles.container}>
			<Video
				source={require("../assets/videos/facemask.mp4")}
				rate={1.0}
				volume={1.0}
				isMuted={false}
				resizeMode="cover"
				shouldPlay
				isLooping
				style={{
					width: Dimensions.get("window").width,
					height: Dimensions.get("window").height,
				}}
			>
				{/*<BlurView intensity={100} style={styles.blur}>*/}
				{/* <Text></Text> */}
				<SafeAreaView style={{ flex: 1 }}>
					{/*<Text style={styles.title}>*/}
					{/*    <Text style={{fontWeight: '200'}}>go</Text>*/}
					{/*    <Text style={{fontWeight: '700'}}>bz.</Text>*/}
					{/*</Text>*/}
					{/*<Text style={styles.description}>Supporting local businesses in a safe way.</Text>*/}
					<WelcomeScroll />
					<Button
						style={styles.button}
						icon="google"
						color="white"
						mode="contained"
						onPress={() => {
							navigation.navigate("IntermediateScreen");
						}}
					>
						Continue with Google
					</Button>
					<Button
						style={styles.buttontwo}
						color="white"
						mode="outlined"
						onPress={() => console.log("Pressed")}
					>
						See other sign in options
					</Button>
				</SafeAreaView>

				{/*</BlurView>*/}
			</Video>
			{/*<SafeAreaView style={{flex: 1, position: 'absolute'}}>*/}
			{/*    /!*<Text style={styles.title}>*!/*/}
			{/*    /!*    <Text style={{fontWeight: '200'}}>go</Text>*!/*/}
			{/*    /!*    <Text style={{fontWeight: '700'}}>bz.</Text>*!/*/}
			{/*    /!*</Text>*!/*/}
			{/*    /!*<Text style={styles.description}>Supporting local businesses in a safe way.</Text>*!/*/}
			{/*    <WelcomeScroll />*/}
			{/*    <Button style={styles.button} icon="google" color="white" mode="contained" onPress={() => {navigation.navigate('IntermediateScreen')}}>*/}
			{/*        Continue with Google*/}
			{/*    </Button>*/}
			{/*    <Button style={styles.buttontwo} color="white" mode="outlined" onPress={() => console.log('Pressed')}>*/}
			{/*        See other sign in options*/}
			{/*    </Button>*/}
			{/*</SafeAreaView>*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	title: {
		fontSize: 50,
		color: "white",
		alignSelf: "center",
		marginTop: "30%",
	},
	description: {
		color: "white",
		alignSelf: "center",
		opacity: 0.7,
		fontSize: 15,
		fontWeight: "600",
		marginTop: "5%",
	},
	blur: {
		flex: 1,
	},
	button: {
		marginLeft: "10%",
		marginRight: "10%",
		bottom: "20%",
		position: "absolute",
		alignSelf: "center",
	},
	buttontwo: {
		marginLeft: "10%",
		marginRight: "10%",
		bottom: "12%",
		position: "absolute",
		alignSelf: "center",
	},
	scrollView: {
		backgroundColor: "pink",
	},
});
