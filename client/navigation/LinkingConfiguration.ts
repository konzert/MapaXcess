import * as Linking from 'expo-linking';

export default {
	prefixes: [Linking.makeUrl('/')],
	config: {
		screens: {
			Root: {
				screens: {
					TabExplore: {
						screens: {
							TabExploreScreen: 'Explore',
						},
					},
					TabCollection: {
						screens: {
							TabCollectionScreen: 'My Collection',
						},
					},
					TabProfile: {
						screens: {
							TabProfileScreen: 'Profile',
						},
					},
				},
			},
			NotFound: '*',
			WelcomeScreen: 'Welcome'
		},
	},
};
