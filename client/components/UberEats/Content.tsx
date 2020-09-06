/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	Image,
	Button as BTN,
} from 'react-native';
import { AntDesign as Icon } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

import { HEADER_IMAGE_HEIGHT } from './HeaderImage';
import { MIN_HEADER_HEIGHT } from './Header';
import {
	Button,
	IconButton,
	Avatar,
	Card,
	Title,
	Paragraph,
	Chip,
} from 'react-native-paper';
import Review from '../Review';
import StarRating from 'react-native-star-rating';
import ReviewModal from '../ReviewModal';
import { getReviewsByPlace } from '../../../gobz-backend/src/controllers/reviews';
import ThumbsUpDown from '../ThumbsUpDown';

const { height } = Dimensions.get('window');
const items = [
	{
		title: 'Sunday - Monday',
		description: 'Closed',
	},
	{
		title: 'Late Sunset',
		description:
			'Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite',
		price: '13.50 CHF',
	},
	{
		title: 'Cabbage Kimchi',
		description: 'Portion, vegan',
		price: '5.00 CHF',
	},
	{
		title: 'Namur by Pieces',
		description:
			'Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs',
		price: '10.50 CHF',
	},
	{
		title: 'Silim Lights',
		description:
			'Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg',
		price: '26.50 CHF',
	},
];

const menu = [
	{ name: 'Hours', items },
	{ name: 'Service', items },
	{ name: 'Safety Measures', items },
	{ name: 'Reviews', items },
];
export const defaultTabs = menu.map(({ name }) => ({ name, anchor: 0 }));
const styles = StyleSheet.create({
	section: {
		padding: 16,
	},
	placeholder: {
		height: HEADER_IMAGE_HEIGHT,
		marginBottom: MIN_HEADER_HEIGHT,
	},
	text: {
		// fontFamily: "UberMoveRegular",
		fontSize: 14,
		color: 'grey',
	},
	title1: {
		// fontFamily: "UberMoveMedium",
		fontSize: 24,
	},
	title2: {
		// fontFamily: "UberMoveMedium",
		fontSize: 16,
	},
	divider: {
		height: 2,
		backgroundColor: '#e2e3e4',
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 8,
	},
	ratings: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginRight: 8,
	},
	link: {
		color: '#09B17F',
	},
	item: {
		borderBottomColor: '#e2e3e4',
		borderBottomWidth: 1,
		marginTop: 16,
	},
	title: {
		// fontFamily: "UberMoveMedium",
		fontSize: 16,
		marginBottom: 8,
	},
	description: {
		marginBottom: 8,
	},
	price: {
		// fontFamily: "UberMoveMedium",
		marginBottom: 16,
	},
});

export interface TabModel {
	name: string;
	anchor: number;
}

interface ContentProps {
	y: Animated.Node<number>;
	onMeasurement: (index: number, tab: TabModel) => void;
}

const renderBotLeft = (index: number) => {
	switch (index) {
		case 0:
			return <Text style={styles.description}>Tuesday - Saturday</Text>;
		case 1:
			return;
		case 2:
			return;
		case 3:
			return;
		case 4:
			return;
		default:
			return;
	}
};

const renderTopRight = (index: number) => {
	switch (index) {
		case 0:
			return <Text style={styles.description}>Closed</Text>;
		case 1:
			return;
		case 2:
			return;
		case 3:
			return;
		case 4:
			return;
		default:
			return null;
	}
};

const renderBotRight = (index: number) => {
	switch (index) {
		case 0:
			return <Text style={styles.description}>5:30PM - 10:30PM</Text>;
		case 1:
			return;
		case 2:
			return;
		case 3:
			return;
		case 4:
			return;
		default:
			return null;
	}
};

const getReviews = async () => {
	try {
		let response = await fetch(
			'http://192.168.0.16:4000/reviews/5f30579a5cab0d66deb59fa4'
		);
		let responseJson = await response.json();
		return responseJson;
	} catch (error) {
		console.error(error);
	}
};

const formatDatetime = (dt) => {
	let date = dt.slice(0, 10).replace(/-/g, '/').split('/');
	date.push(date.shift());
	return date.join('/');
};

export default ({ y, onMeasurement }: ContentProps) => {
	const opacity = interpolate(y, {
		inputRange: [
			HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
			HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
		],
		outputRange: [1, 0],
		extrapolate: Extrapolate.CLAMP,
	});
	const LeftContent = (props: any) => <Avatar.Icon {...props} icon="alien" />;
	const [reviews, setReviews] = useState([]);
	const [reload, toggleReload] = useState(false);
	const [reviewing, setReviewing] = useState(false);

	const handleLoadingReviews = (r: any) => {
		let reviewsList: any = [];
		r.forEach((review: any, index: number) => {
			let newReview = {
				author: r[index].author,
				rating: r[index].rating,
				description: r[index].description,
				date: r[index].updatedAt,
				liked: r[index].likedUsers.length,
				unliked: r[index].unlikedUsers.length,
				place: r[index].placeId,
			};
			reviewsList.push(newReview);
		});
		setReviews(reviewsList);
	};

	useEffect(() => {
		getReviews().then((res) => handleLoadingReviews(res.reviews));
	}, [reload]);

	const renderTopLeft = (index: number) => {
		switch (index) {
			case 0:
				return <Text style={styles.description}>Sunday - Monday</Text>;
			case 1:
				return (
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						<Chip
							icon="calendar"
							opacity={1}
							style={{ margin: 5, marginBottom: 5 }}
						>
							Reservation
						</Chip>
						<Chip
							icon="shopping"
							opacity={1}
							style={{ margin: 5, marginBottom: 5 }}
						>
							Takeout
						</Chip>
						<Chip
							icon="car"
							opacity={1}
							style={{ margin: 5, marginBottom: 20 }}
						>
							Curbside pickup
						</Chip>
						<Chip
							icon="truck-delivery"
							opacity={1}
							style={{ margin: 5, marginBottom: 20 }}
						>
							Delivery
						</Chip>
					</View>
				);
			case 2:
				return (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							marginTop: -100,
							marginBottom: -70,
						}}
					>
						<Image
							style={{ resizeMode: 'contain', width: 110 }}
							source={require('../../assets/images/mask.png')}
						/>
						<Image
							style={{ resizeMode: 'contain', width: 110 }}
							source={require('../../assets/images/distance.png')}
						/>
						<Image
							style={{
								resizeMode: 'contain',
								width: 96,
								position: 'absolute',
								marginLeft: 235,
								marginTop: -2,
							}}
							source={require('../../assets/images/temperature.png')}
						/>
					</View>
				);
			case 3:
				return (
					<Button
						icon="pen"
						color="white"
						mode="contained"
						style={{ width: '100%' }}
						onPress={() => setReviewing(true)}
					>
						Click to review
					</Button>
				);
			case 4:
				return;
			default:
				return;
		}
	};

	return (
		<>
			<View style={styles.placeholder} />
			<Animated.View style={[styles.section, { opacity }]}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Ionicons
						name="md-people"
						size={24}
						color="black"
						style={{ marginRight: 5 }}
					/>
					<Text style={styles.text}>Very busy</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>
						<Text style={{ color: '#09B17F', fontWeight: 'bold' }}>
							Open now{' '}
						</Text>
						<Text style={{}}>until 6:00pm</Text>
					</Text>
					<View style={styles.ratings}>
						<Icon
							name="export"
							color="black"
							size={24}
							style={styles.icon}
						/>
					</View>
				</View>
			</Animated.View>
			<View style={styles.divider} />
			<View style={styles.section}>
				<Text style={styles.title2}>Restaurant info</Text>
				<View style={styles.info}>
					<Text style={styles.text}>2491 Rue Notre-Dame Ouest</Text>
					<Text style={styles.link}>More info</Text>
				</View>
			</View>
			<View style={styles.divider} />
			{menu.map(({ name, items: items }, index) => (
				<View
					style={styles.section}
					key={index}
					onLayout={({
						nativeEvent: {
							layout: { y: anchor },
						},
					}) => onMeasurement(index, { name, anchor: anchor - 142 })}
				>
					<Text style={styles.title1}>{name}</Text>
					<View style={styles.item}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							{renderTopLeft(index)}
							{renderTopRight(index)}
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							{renderBotLeft(index)}
							{renderBotRight(index)}
						</View>
					</View>
				</View>
			))}

			<Card key={0}>
				<Card.Title
					title="Haihan Chen"
					subtitle=" "
					left={LeftContent}
				/>
				<View
					style={{
						width: 100,
						marginLeft: 72,
						position: 'absolute',
						top: 45,
					}}
				>
					<Paragraph
						style={{
							position: 'absolute',
							right: -170,
							top: -28,
							color: 'grey',
						}}
					>
						08/12/2020
					</Paragraph>
					<StarRating
						disabled={false}
						maxStars={5}
						rating={3}
						starSize={15}
						fullStarColor={'orange'}
						style={{ margin: 100 }}
					/>
				</View>
				<Card.Content>
					<Paragraph>
						Not a lot of safety measures in place, one of the
						employees wasn’t wearing his mask properly! Be careful
						:(
					</Paragraph>
				</Card.Content>
				{/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
				<Card.Actions>
					{/*<Button icon="thumb-up" color='grey'>Agree</Button>*/}
					{/*<Button icon="thumb-down" color='grey'>Disagree</Button>*/}
					<ThumbsUpDown />
				</Card.Actions>
			</Card>
			<View>
				{reviews.map((rev, i) => {
					return (
						<Card key={i + 1}>
							<Card.Title
								title={rev.author}
								subtitle=" "
								left={LeftContent}
							/>
							<View
								style={{
									width: 100,
									marginLeft: 72,
									position: 'absolute',
									top: 45,
								}}
							>
								<Paragraph
									style={{
										position: 'absolute',
										right: -170,
										top: -28,
										color: 'grey',
									}}
								>
									{formatDatetime(rev.date)}
								</Paragraph>
								<StarRating
									disabled={false}
									maxStars={5}
									rating={rev.rating}
									starSize={15}
									fullStarColor={'orange'}
									style={{ margin: 100 }}
								/>
							</View>
							<Card.Content>
								<Paragraph>{rev.description}</Paragraph>
							</Card.Content>
							{/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
							<Card.Actions>
								{/*<Button icon="thumb-up" color='grey' onPress={() => color='purple'}>Agree</Button>*/}
								{/*<Button icon="thumb-down" color='grey'>Disagree</Button>*/}
								<ThumbsUpDown />
							</Card.Actions>
						</Card>
					);
				})}
			</View>
			{reviewing ? (
				<Review
					review={setReviewing}
					placeId={'5f30579a5cab0d66deb59fa4'}
					reload={setReviews}
				/>
			) : (
				<View />
			)}

			<View style={{ height }} />
		</>
	);
};
