import * as React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { ThemeColors } from 'react-navigation';

export default class SearchView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			contacts: [
					// 'Joe Beef',
					// 'Pharmaprix',
					// 'Scotiabank',
			],
			description: [
				// 'high risk',
				// 'medium risk',
				// 'low risk'
			],
			searching: '',
			activeIndex: '',
		};
	}

	loadContacts = async () => {
		const { data } = this.state.contacts;

		this.setState({
			contacts: [
				// 'Joe Beef',
				// 'Pharmaprix',
				// 'Scotiabank',
			],
			inMemoryContacts: [
				// 'Joe Beef',
				// 'Pharmaprix',
				// 'Scotiabank',
			],
			isLoading: false,
		});
	};

	componentDidMount() {
		this.setState({ isLoading: true });
		this.loadContacts();
	}

	renderItem = ({ item }) => (
		<View
			style={{
				minHeight: 70,
				paddingLeft: 25,
				paddingRight: 25,
				paddingTop: 10,
				paddingBottom: 10,
			}}
		>
			<Card>
				<Text
					style={{
						color: 'black',
						fontWeight: 'bold',
						fontSize: 20,
						margin: 10
					}}
					onPress={() =>
						this.props.navigation.navigate('Explore', { place: item })
					}
				>
					{item}
					{/*{item.firstName + ' '}*/}
					{/*{item.lastName}*/}
				</Text>
				<Text
					style={{ color: 'grey', fontWeight: 'bold', margin: 10, marginTop: -5 }}
					// onPress={() => console.log(item)}
				>
					{item}
					{/*{item.phoneNumbers[0].digits}*/}
				</Text>
			</Card>
		</View>
	);

	searchContacts = (value) => {
		const filteredContacts = this.state.inMemoryContacts.filter(
			(contact) => {
				// let contactLowercase = (
				//     contact.firstName +
				//     ' ' +
				//     contact.lastName
				// ).toLowerCase();
				let contactLowercase = contact.toLowerCase();

				let searchTermLowercase = value.toLowerCase();

				return contactLowercase.indexOf(searchTermLowercase) > -1;
			}
		);
		this.setState({ contacts: filteredContacts });
		this.setState({ searching: value });
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<SafeAreaView style={{ backgroundColor: '#2f363c' }} />
				<Searchbar
					placeholder="Search"
					placeholderTextColor="#dddddd"
					style={{
						padding: 5,
					}}
					onChangeText={(value) => this.searchContacts(value)}
					value={this.state.searching}
				/>

				<View style={{ flex: 1, backgroundColor: 'white' }}>
					{this.state.isLoading ? (
						<View
							style={{
								...StyleSheet.absoluteFill,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ActivityIndicator size="large" color="#bad555" />
						</View>
					) : null}
					<FlatList
						data={this.state.contacts}
						renderItem={this.renderItem}
						keyExtractor={(item, index) => index.toString()}
						ListEmptyComponent={() => (
							<View
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: 50,
								}}
							>
								<Text style={{ color: 'grey' }}>
									No Contacts Found
								</Text>
							</View>
						)}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
