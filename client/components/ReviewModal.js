import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TouchableOpacity,
	Text,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from 'react-native-star-rating';
import TextArea from '@freakycoder/react-native-text-area';

const ReviewModal = (props) => {
	const [modalVisible, setModalVisible] = useState(true);
	const { starRating, onStarRatingPress } = props;
	const [desc, setDesc] = useState('');

	const handleClose = () => {
		props.review(false);
		setDesc('');
	};

	useEffect(() => {
		if (desc !== '') setDesc('');
	}, []);

	const handleSubmit = async () => {
		let reviews;
		if (desc === '') {
			handleClose();

			return;
		} else reviews = await addReview();
		handleClose();
		if (!reviews) return;
		handleLoadingReviews(reviews);
	};

	const addReview = async () => {
		let json = `{"author": "Haihan Chen", "description": "${desc}", "rating": "${starRating}", "placeId": "${props.placeId}"}`;

		try {
			let response = await fetch('http://192.168.0.16:4000/reviews', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: json,
			});
			let responseJson = await response.json();
			return responseJson.reviews;
		} catch (error) {
			console.error(error);
		}
	};

	const handleLoadingReviews = (r) => {
		let reviewsList = [];
		r.forEach((review, index) => {
			let newReview = {
				author: r[index].author,
				rating: r[index].rating,
				description: r[index].description,
				date: r[index].updatedAt,
				liked: r[index].likedUsers.length,
				unliked: r[index].unlikedUsers.length,
				place: r[index].placeId,
			};
			if (r[index].placeId === props.placeId) reviewsList.push(newReview);
		});
		props.reload(reviewsList);
	};

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			style={{ flex: 1 }}
		>
			<Modal
				isVisible={true}
				visible={modalVisible}
				onRequestClose={() => {
					handleClose();
				}}
			>
				<View
					style={{
						shadowColor: '#000',
						shadowOffset: {
							width: 0,
							height: 7,
						},
						shadowOpacity: 0.43,
						shadowRadius: 9.51,
						elevation: 15,

						height: 325,
						width: '90%',
						borderRadius: 16,
						alignSelf: 'center',
						justifyContent: 'center',
						backgroundColor: 'transparent',
					}}
				>
					<View
						style={{
							height: '100%',
							alignItems: 'center',
							flexDirection: 'column',
							justifyContent: 'space-around',
						}}
					>
						<Text style={{ color: 'white', fontSize: 16 }}>
							How was your experience?
						</Text>
						<View style={{ marginRight: 8 }}>
							<StarRating
								maxStars={5}
								starSize={30}
								disabled={false}
								animation="jello"
								rating={starRating}
								fullStarColor="#faec7c"
								emptyStarColor="#faec7c"
								starStyle={{ marginLeft: 8 }}
								selectedStar={(rating) =>
									onStarRatingPress(rating)
								}
							/>
						</View>
						<TextArea
							maxCharLimit={140}
							placeholderTextColor="black"
							exceedCharCountColor="red"
							placeholder={'Write your review...'}
							style={{ height: 150, borderRadius: 16 }}
							onChangeText={(text) => {
								if (text.length < 140) setDesc(text);
							}}
							value={desc}
						/>
						<TouchableOpacity
							style={{
								height: 50,
								width: '95%',
								borderRadius: 16,
								backgroundColor: 'white',
							}}
							onPress={() => {
								handleSubmit();
							}}
						>
							<LinearGradient
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={{
									height: 50,
									width: '100%',
									borderRadius: 16,
									alignContent: 'center',
									justifyContent: 'center',
								}}
								colors={['#5f2c82', '#49a09d']}
							>
								<Text
									style={{
										color: 'white',
										fontSize: 16,
										textAlign: 'center',
									}}
								>
									Submit
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</TouchableWithoutFeedback>
	);
};

ReviewModal.propTypes = {
	stars: PropTypes.number,
	ratings: PropTypes.string,
};

ReviewModal.defaultProps = {
	stars: 5,
	ratings: 'Hellooo',
};

export default ReviewModal;
