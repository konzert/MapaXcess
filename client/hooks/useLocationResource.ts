import React, { useEffect } from 'react';

import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default function useLocationResource() {
	const [
		location,
		setLocation,
	] = React.useState<Location.LocationData | null>(null);

	useEffect(() => {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			alert(
				'Location unsupported on Android emulator. Try the app with your device!'
			);
			return;
		} else {
			getLocationAsync();
		}
	}, []);

	const getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (!status || status !== 'granted') {
			alert(
				'Location permission not granted. Please allow it in your device settings.'
			);
			return;
		}

		let geo = await Location.getCurrentPositionAsync({
			enableHighAccuracy: true,
		});
		setLocation(geo);
	};

	return location;
}
