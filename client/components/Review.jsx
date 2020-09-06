import ReviewModal from './ReviewModal';
import * as React from 'react';

export default class Review extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			starCount: 4,
		};
	}

	onStarRatingPress(rating) {
		this.setState({
			starCount: rating,
		});
	}

	render() {
		return (
			<ReviewModal
				starRating={this.state.starCount}
				onStarRatingPress={(rating) => {
					this.onStarRatingPress(rating);
				}}
				review={this.props.review}
				placeId={this.props.placeId}
				reload={this.props.reload}
			/>
		);
	}
}
