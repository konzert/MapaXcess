import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class ThumbsUpDown extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			pVal: 0,
			nVal: 0,
		};

		this.onNegativeAdd = this.onNegativeAdd.bind(this);
		this.onNegativeSub = this.onNegativeSub.bind(this);
		this.onPositiveAdd = this.onPositiveAdd.bind(this);
		this.onPositiveSub = this.onPositiveSub.bind(this);
	}

	onPositiveAdd = () => {
		if (this.state.nVal > 0) this.setState({ nVal: this.state.nVal - 1 });
		this.setState({ pVal: this.state.pVal + 1 });
	};

	onNegativeAdd = () => {
		if (this.state.pVal > 0) this.setState({ pVal: this.state.pVal - 1 });
		this.setState({ nVal: this.state.nVal + 1 });
	};

	onPositiveSub = () => {
		this.setState({ pVal: this.state.pVal - 1 });
	};

	onNegativeSub = () => {
		this.setState({ nVal: this.state.nVal - 1 });
	};

	render() {
		return (
			<View style={this.props.style}>
				{this.state.pVal > 0 ? (
					<TouchableOpacity
						style={[
							{ flexDirection: 'row', alignItems: 'center' },
							this.props.buttonStyle,
						]}
						onPress={this.onPositiveSub}
					>
						{this.props.positiveIconDone}
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={[
							{ flexDirection: 'row', alignItems: 'center' },
							this.props.buttonStyle,
						]}
						onPress={this.onPositiveAdd}
					>
						{this.props.positiveIcon}
					</TouchableOpacity>
				)}
				<Text
					style={[
						this.props.numbersStyle,
						{ marginRight: this.props.spacing },
					]}
				>
					{this.state.pVal}
				</Text>
				{this.state.nVal > 0 ? (
					<TouchableOpacity
						style={[
							{ flexDirection: 'row', alignItems: 'center' },
							this.props.buttonStyle,
						]}
						onPress={this.onNegativeSub}
					>
						{this.props.negativeIconDone}
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={[
							{ flexDirection: 'row', alignItems: 'center' },
							this.props.buttonStyle,
						]}
						onPress={this.onNegativeAdd}
					>
						{this.props.negativeIcon}
					</TouchableOpacity>
				)}
				<Text style={this.props.numbersStyle}>{this.state.nVal}</Text>
			</View>
		);
	}
}

ThumbsUpDown.defaultProps = {
	readonly: false,
	readOnlyPositive: false,
	readOnlyNegative: false,
	style: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyItems: 'center',
		padding: 5,
	},
	buttonStyle: { padding: 8, alignSelf: 'flex-start' },
	spacing: 10,
	positiveIcon: <Icon name="thumbs-up" size={18} color="#444" />,
	positiveIconDone: <Icon name="thumbs-up" size={18} color="#FFEB3B" />,
	onPositivePress: () => {},
	positiveNumber: 0,
	negativeIcon: <Icon name="thumbs-down" size={18} color="#444" />,
	negativeIconDone: <Icon name="thumbs-down" size={18} color="#FFEB3B" />,
	onNegativePress: () => {},
	negativeNumber: 0,
	numbersStyle: { fontSize: 12, color: '#444', padding: 3 },
};
