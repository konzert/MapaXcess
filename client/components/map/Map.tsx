import React, {
	useState,
	useRef,
	SyntheticEvent,
	MutableRefObject,
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	StatusBar,
	Platform,
} from 'react-native';
import MapView, { Callout } from 'react-native-maps';

import useLocationResource from '../../hooks/useLocationResource';
import MapStyle from '../../constants/MapStyle';
import PlacesCarousel from './PlacesCarousel';
import { useEffect } from 'react';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default function Map(props: any) {
	const location = useLocationResource();
	const [marker, setMarker] = useState({
		latitude: 45.4665,
		longitude: -73.5743,
		image: require('../../assets/images/resto-icon.png'),
	});

	const [coordinates, setCoordinates] = useState([
		{
			name: 'Joe Beef',
			longitude: -73.5743,
			latitude: 45.4665,
			image: require('../../assets/images/resto-icon.png'),
			alternativeimage: require('../../assets/images/resto-big-icon.png')
		},
		{
			name: 'Chocolato',
			longitude: -73.5666,
			latitude: 45.5058,
			image: require('../../assets/images/resto-icon.png'),
			alternativeimage: require('../../assets/images/resto-big-icon.png')
		},
		{
			name: 'Anytime Fitness',
			latitude: 45.517502,
			longitude: -73.58065,
			image: require('../../assets/images/fit-icon.png'),
			alternativeimage: require('../../assets/images/fit-big-icon.png')
		},
		{
			name: 'Pharmaprix',
			latitude: 45.499507,
			longitude: -73.573206,
			image: require('../../assets/images/health-icon.png'),
			alternativeimage: require('../../assets/images/health-big-icon.png')
		},
		{
			name: 'Scotiabank',
			latitude: 45.496835,
			longitude: -73.572559,
			image: require('../../assets/images/store-icon.png'),
			alternativeimage: require('../../assets/images/store-big-icon.png')
		},
		{
			name: 'Clinique',
			latitude: 45.518049,
			longitude: -73.559044,
			image: require('../../assets/images/health-icon.png'),
			alternativeimage: require('../../assets/images/health-big-icon.png')
		},
	])

	const [ref, setRef] = useState<React.MutableRefObject<MapView | null>>(
		useRef(null)
	);

	const [index, setIndex] = useState({
		latitude: 0,
		longitude: 0,
	});

	const onPressMarker = (iMarker: any) => {
		// coordinates[0].image = require('../../assets/images/fit-big-icon.png');
		// setCoordinates(coordinates);
		props.setCard(iMarker.name);
	};

	const getBounds = async (ref: MutableRefObject<MapView | null>) => {
		if (
			ref &&
			ref.current &&
			index.latitude !== 0 &&
			index.longitude !== 0
		) {
			let b = await ref.current.getMapBoundaries();
			return b.northEast.longitude - b.southWest.longitude;
		}
	};

	useEffect(() => {
		if (!props.indexLoc.latitude || !props.indexLoc.longitude) {
			setIndex({
				latitude: 0,
				longitude: 0,
			});
			return;
		}
		setIndex(props.indexLoc);
	}, [props.indexLoc]);

	useEffect(() => {
		const moveToMarker = async () => {
			if (
				ref &&
				ref.current &&
				index.latitude !== 0 &&
				index.longitude !== 0
			) {
				let longDelta = await getBounds(ref);
				ref.current.animateCamera(
					longDelta && longDelta > 0.3
						? {
								center: index,
								zoom: 13,
						  }
						: {
								center: index,
						  },
					{
						duration: 300,
					}
				);
			}
		};
		moveToMarker();
	}, [index]);

	const handleDeselect = () => {
		console.log('handleDeselect');
		// coordinates[0].image = require('../../assets/images/resto-icon.png');
		// setCoordinates(coordinates);
		// console.log(coordinates);
	};

	return (
		<MapView
			provider="google"
			showsUserLocation={true}
			initialRegion={{
				latitude: 45.49417,
				longitude: -73.61582,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
			// showsMyLocationButton={true}
			style={styles.mapStyle}
			customMapStyle={MapStyle}
			onPress={(e) => {
				if (Platform.OS === 'ios') {
					if (e.nativeEvent.action !== 'marker-press')
						handleDeselect();
				} else handleDeselect();
			}}
			ref={ref}
		>
			{/*<View>*/}
			{coordinates.map((item) => {
				return (
					<MapView.Marker
						key={item.name}
						coordinate={{
							latitude: item.latitude,
							longitude: item.longitude,
						}}
						onPress={() => onPressMarker(item)}
						image={item.image}
					></MapView.Marker>
				);
			})}

			{/* // <MapView.Marker
			// 	coordinate={{
			// 		latitude: marker.latitude,
			// 		longitude: marker.longitude,
			// 	}}
			// 	onPress={onPressMarker}
			// 	image={marker.image}
			// ></MapView.Marker> */}

			{/*</View>*/}
		</MapView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		position: 'absolute',
	},
});
