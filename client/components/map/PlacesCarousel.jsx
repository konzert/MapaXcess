import * as React from 'react';
import {
	Text,
	View,
	SafeAreaView,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BlurView } from 'expo-blur';
import Map from './Map';
import Navigation from '../../navigation';

export default class PlacesCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this._renderItem = this._renderItem.bind(this);
		this.state = {
			activeIndex: 0,
			carouselItems: [
				{
					title: 'Joe Beef',
					address: '2491 Notre-Dame St W',
					riskLevel: 'High risk',
					riskImage: require('../../assets/images/sad.png'),
					image: require('../../assets/images/joe-beef.jpg'),
					likeImage: require('../../assets/images/likebutton.png'),
					schedule: 'Open now',
					schedulenow: ' until 6:00 pm',
					longitude: -73.5743,
					latitude: 45.4665,
				},
				{
					title: 'Chocolato',
					address: '364 St-Catherine St W',
					riskLevel: 'Low risk',
					riskImage: require('../../assets/images/happy.png'),
					image: require('../../assets/images/richmond.jpg'),
					likeImage: require('../../assets/images/likebutton.png'),
					schedule: 'Open now',
					schedulenow: ' until 1:00 am',
					longitude: -73.5666,
					latitude: 45.5058,
					rewards: 'reward'
				},
				{
					title: 'Anytime Fitness',
					address: '4117 St Laurent Boulevard',
					riskLevel: 'High risk',
					riskImage: require('../../assets/images/sad.png'),
					image: require('../../assets/images/fitness-anytime.jpg'),
					likeImage: require('../../assets/images/likebutton.png'),
					schedule: 'Closed now',
					schedulenow: ' until 4:00 pm',
					latitude: 45.517502,
					longitude: -73.58065,
				},
				{
					title: 'Pharmaprix',
					address: '1120 St Catherine St W',
					riskLevel: 'Med risk',
					riskImage: require('../../assets/images/meh.png'),
					image: require('../../assets/images/pharma.jpg'),
					likeImage: require('../../assets/images/likebutton.png'),
					schedule: 'Open now',
					schedulenow: ' 24 hours',
					latitude: 45.499507,
					longitude: -73.573206,
					rewards: 'reward'
				},
				{
					title: 'Scotiabank',
					address: '1125 Rue de la Montagne',
					riskLevel: 'Low risk',
					riskImage: require('../../assets/images/happy.png'),
					image: require('../../assets/images/scotia.jpg'),
					likeImage: require('../../assets/images/likebutton.png'),
					schedule: 'Closed now',
					schedulenow: ' until 9:00 am',
					latitude: 45.496835,
					longitude: -73.572559,
				},
				{
					title: "Clinique L'Actuel",
					address: '1001 Boul de Maisonneuve',
					riskLevel: 'Med risk',
					riskImage: require('../../assets/images/meh.png'),
					image: require('../../assets/images/clinic.png'),
					likeImage: require('../../assets/images/likebutton.png'),
					schedule: 'Closed now',
					schedulenow: ' until 7:30 am',
					latitude: 45.496835,
					longitude: -73.572559,
				},
			],
			indexLocation: {
				latitude: null,
				longitude: null,
			},
		};
	}

	onCarouselItemChange = (index) => {
		let location = this.state.carouselItems[index];
		this.props.changeIndexLoc({
			latitude: location.latitude,
			longitude: location.longitude,
		});
	};

	_renderItem({ item, index }) {
		return (
			// <BlurView intensity={100} style={styles.cardContainer}>
			<TouchableOpacity
				activeOpacity={1}
				style={styles.button}
				onPress={() => {
					{item.title === 'Clinique L\'Actuel' ?
						this.props.navigation.navigate('PlaceDetailClinic')
					: this.props.navigation.navigate('PlaceDetail')}
				}}
			>
				<View style={styles.cardContainer}>
					{item.rewards === 'reward' ?
						<Image style={{position: 'absolute', resizeMode: 'contain', width: 100, top: -140, zIndex: 1000}} source={require('../../assets/images/rewards.png')}/>
						: null}
					{item.rewards === 'reward' ? <Image style={{
						position: 'absolute',
						resizeMode: 'contain',
						width: 100,
						top: -257,
						zIndex: 999,
						left: 10
					}} source={require('../../assets/images/white.png')}/> : null}
					<Image style={styles.image} source={item.image} />
					<Image style={styles.likeImage} source={item.likeImage} />
					<Text style={styles.cardTitle}>{item.title}</Text>
					<Text style={styles.cardAddress}>{item.address}</Text>
					<Text
						style={
							item.riskLevel === 'High risk'
								? styles.highrisk
								: item.riskLevel === 'Low risk'
								? styles.lowrisk
								: styles.medrisk
						}
					>
						{item.riskLevel}
					</Text>
					<Image style={styles.riskImage} source={item.riskImage} />
					<Image
						style={styles.directionImage}
						source={require('../../assets/images/directions.png')}
					/>
					<Text
						style={
							item.schedule === 'Open now'
								? styles.green
								: styles.red
						}
					>
						{item.schedule}
						<Text style={{ color: 'black', fontWeight: 'normal' }}>
							{item.schedulenow}
						</Text>
					</Text>
				</View>
			</TouchableOpacity>
			// {/*</BlurView>*/}
		);
	}

	async getPlaces() {
		try {
			let response = await fetch('http://192.168.0.16:4000/places');
			let responseJson = await response.json();
			return responseJson.places;
		} catch (error) {
			console.error(error);
		}
	}

	handleChange = (r) => {
		let carouselItems = [...this.state.carouselItems];
		r.forEach((item) => {
			let newItem = {
				title: item.name,
				address: item.address,
				riskLevel: item.risk,
				latitude: item.geolocation
					? parseFloat(item.geolocation.coordinates[1])
					: 0,
				longitude: item.geolocation
					? parseFloat(item.geolocation.coordinates[0])
					: 0,
				likeImage: require('../../assets/images/likebutton.png'),
				riskLevel: 'Low risk',
				riskImage: require('../../assets/images/happy.png'),
			};
			carouselItems.push(newItem);
		});
		this.setState({ carouselItems });
	};

	componentDidMount = () => {
		// this.getPlaces().then((r) => this.handleChange(r));
	};

	componentDidUpdate = () => {
		if (this.props.place !== '') {
			let index;
			switch (this.props.place) {
				case 'Joe Beef':
					index = 0;
					break;
				case 'Chocolato':
					index = 1;
					break;
				case 'Anytime Fitness':
					index = 2;
					break;
				case 'Pharmaprix':
					index = 3;
					break;
				case 'Scotiabank':
					index = 4;
					break;
				default:
					index = 0;
					break;
			}
			this.props.setPlace('');
			this.carousel.snapToItem(index, true);
		}

		if (this.props.card !== '') {
			let index;
			switch (this.props.card) {
				case 'Joe Beef':
					index = 0;
					break;
				case 'Chocolato':
					index = 1;
					break;
				case 'Anytime Fitness':
					index = 2;
					break;
				case 'Pharmaprix':
					index = 3;
					break;
				case 'Scotiabank':
					index = 4;
					break;
				default:
					index = 0;
					break;
			}
			this.props.setCard('');
			this.carousel.snapToItem(index, true);
		}
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<Carousel
					layout={'default'}
					ref={(ref) => (this.carousel = ref)}
					data={this.state.carouselItems}
					containerCustomStyle={styles.carousel}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={300}
					renderItem={this._renderItem}
					onSnapToItem={(index) => this.onCarouselItemChange(index)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	carousel: {
		position: 'absolute',
		bottom: 0,
		marginBottom: 48,
	},
	image: {
		height: 120,
		width: 300,
		top: 0,
		position: 'absolute',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},
	cardContainer: {
		backgroundColor: 'floralwhite',
		borderRadius: 24,
		height: 250,
		padding: 50,
		opacity: 0.95,
	},
	cardTitle: {
		fontSize: 20,
		alignSelf: 'flex-start',
		bottom: 83,
		marginLeft: 20,
		position: 'absolute',
		fontWeight: 'bold',
	},
	cardAddress: {
		alignSelf: 'flex-start',
		position: 'absolute',
		bottom: 60,
		marginLeft: 20,
		color: 'gray',
	},
	lowrisk: {
		alignSelf: 'flex-end',
		position: 'absolute',
		color: 'green',
		bottom: 80,
		right: 20,
		borderWidth: 1,
		padding: 10,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 30,
		borderRadius: 15,
		borderColor: 'green',
	},
	highrisk: {
		alignSelf: 'flex-end',
		position: 'absolute',
		color: 'red',
		bottom: 80,
		right: 20,
		borderWidth: 1,
		padding: 10,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 30,
		borderRadius: 15,
		borderColor: 'red',
	},
	medrisk: {
		alignSelf: 'flex-end',
		position: 'absolute',
		color: 'orange',
		bottom: 80,
		right: 20,
		borderWidth: 1,
		padding: 10,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 30,
		borderRadius: 15,
		borderColor: 'orange',
	},
	riskImage: {
		alignSelf: 'flex-end',
		height: 20,
		width: 20,
		position: 'absolute',
		bottom: 85,
		right: 92,
	},
	likeImage: {
		height: 55,
		width: 55,
		alignSelf: 'flex-end',
		position: 'absolute',
		right: 8,
		top: 8,
	},
	directionImage: {
		height: 60,
		width: 60,
		position: 'absolute',
		right: 0,
		bottom: 0,
		marginRight: 18,
		marginBottom: 10,
	},
	green: {
		color: 'green',
		position: 'absolute',
		bottom: 0,
		left: 0,
		marginBottom: 30,
		marginLeft: 20,
		fontWeight: 'bold',
	},
	red: {
		color: 'red',
		position: 'absolute',
		bottom: 0,
		left: 0,
		marginBottom: 30,
		marginLeft: 20,
		fontWeight: 'bold',
	},
});
