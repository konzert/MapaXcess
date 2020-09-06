import React, { Component, useState } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	Dimensions,
	SafeAreaView,
	FlatList,
	Button,
} from 'react-native';

import { View } from '../components/Themed';
import Map from '../components/map/Map';
// @ts-ignore
// import SearchBar from '../components/searchBar/googleSearchBar'
// import Searchbar from '../components/map/SearchView'
import 'reflect-metadata';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// @ts-ignore

import PlacesCarousel from '../components/map/PlacesCarousel';
import { Searchbar } from 'react-native-paper';
import SearchView from '../components/map/SearchView';
import { useEffect } from 'react';

const GOOGLE_API_KEY = 'AIzaSyAMm89NT8mGC6Yl3uVmvCVLWtdWV0spTig';

export default function TabExploreScreen({ route, navigation }) {
	const [indexLoc, setIndexLoc] = useState({
		latitude: '',
		longitude: '',
	});

	const [place, setPlace] = useState('');
	const [card, setCard] = useState('');

	useEffect(() => {
		if (route.params && route.params.place) {
			setPlace(route.params.place);
		}
	}, [route]);

	return (
		<View style={styles.container}>
			<Map indexLoc={indexLoc} setCard={setCard} />
			<SafeAreaView>
				<Searchbar
					placeholder="Search"
					placeholderTextColor="#dddddd"
					style={{
						width: '85%',
						marginTop: 50,
					}}
					onIconPress={() => {
						navigation.navigate('TabCollectionScreen');
					}}
				/>
				{/* <SearchView /> */}
				{/*<SearchBar />*/}
				{/*<Searchbar />*/}
				{/*<GooglePlacesAutocomplete*/}
				{/*	placeholder='Search'*/}
				{/*	onPress={(data, details = null) => {*/}
				{/*		// 'details' is provided when fetchDetails = true*/}
				{/*		console.log(data, details);*/}
				{/*	}}*/}
				{/*	query={{*/}
				{/*		key: GOOGLE_API_KEY,*/}
				{/*		language: 'en',*/}
				{/*	}}*/}
				{/*/>*/}
				{/*<Searchbar*/}
				{/*	placeholder="Search"*/}
				{/*	onChangeText={{text => this.SearchFilterFunction(text)}}*/}
				{/*	value={this.state.text} />*/}

				{/*	<FlatList*/}
				{/*		data={this.state.dataSource}*/}
				{/*		renderItem={this.renderItem}*/}
				{/*		keyExtractor={item => item.address}*/}
				{/*	/>*/}
			</SafeAreaView>
			<PlacesCarousel
				changeIndexLoc={setIndexLoc}
				navigation={navigation}
				place={place}
				setPlace={setPlace}
				card={card}
				setCard={setCard}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: 0.9,
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	map: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
