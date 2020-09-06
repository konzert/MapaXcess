import React, { RefObject, useContext } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useValue, withTimingTransition } from 'react-native-redash';
import { Feather as Icon } from '@expo/vector-icons';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from 'react-navigation-hooks';
import { NavigationContext } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { HEADER_IMAGE_HEIGHT } from './HeaderImage';
import TabHeader from './TabHeader';
import { TabModel } from './Content';
import Navigation from '../../navigation';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const { interpolate, Extrapolate, useCode, greaterThan, set, block } = Animated;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	header: {
		flexDirection: 'row',
		height: MIN_HEADER_HEIGHT,
		alignItems: 'center',
		paddingHorizontal: PADDING,
	},
	title: {
		// fontFamily: "UberMoveMedium",
		fontSize: 20,
		marginLeft: PADDING,
		flex: 1,
		fontWeight: 'bold',
	},
	risk: {
		// fontFamily: "UberMoveMedium",
		fontSize: 15,
		// marginLeft: PADDING,
		fontWeight: 'bold',
		// alignSelf: 'flex-end',
		// position: 'absolute',
		color: 'red',
		// bottom: 80,
		// right: 20,
		position: 'absolute',
		marginLeft: 250,
		zIndex: 1000,
		borderWidth: 1,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 5,
		paddingBottom: 5,
		// padding: 10,
		// paddingTop: 5,
		// paddingBottom: 5,
		// paddingLeft: 30,
		borderRadius: 15,
		borderColor: 'red',
	},
});

interface HeaderProps {
	y: Animated.Value<number>;
	tabs: TabModel[];
	scrollView: RefObject<Animated.ScrollView>;
	nav;
}

export default ({ y, tabs, scrollView, nav }: HeaderProps) => {
	// const { goBack };
	const toggle = useValue<0 | 1>(0);
	const insets = useSafeArea();
	const transition = withTimingTransition(toggle, { duration: 100 });
	const { top: paddingTop } = insets;
	const translateX = interpolate(y, {
		inputRange: [0, HEADER_IMAGE_HEIGHT],
		outputRange: [-ICON_SIZE - PADDING, 0],
		extrapolate: Extrapolate.CLAMP,
	});
	const translateY = interpolate(y, {
		inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
		outputRange: [
			HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
			HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
			0,
		],
		extrapolateRight: Extrapolate.CLAMP,
	});
	const opacity = transition;
	useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
		toggle,
		y,
	]);

	return (
		<Animated.View style={[styles.container, { paddingTop }]}>
			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					opacity,
					backgroundColor: 'white',
				}}
			/>
			<View style={styles.header}>
				<TouchableWithoutFeedback
					onPress={() => nav.navigate('IntermediateScreen')}
				>
					<View>
						<Icon
							name="arrow-left"
							size={ICON_SIZE}
							color="white"
						/>
						<Animated.View
							style={{
								...StyleSheet.absoluteFillObject,
								opacity: transition,
							}}
						>
							<Icon
								name="arrow-left"
								size={ICON_SIZE}
								color="black"
							/>
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>
				<Animated.Text
					style={[
						styles.title,
						{ transform: [{ translateX }, { translateY }] },
					]}
				>
					Joe Beef
				</Animated.Text>
				<Animated.Text
					style={[styles.risk, { transform: [{ translateY }] }]}
				>
					High risk
				</Animated.Text>
				<Icon name="heart" size={ICON_SIZE} color="white" />
			</View>
			<TabHeader {...{ y, transition, tabs, scrollView }} />
		</Animated.View>
	);
};
