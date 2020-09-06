import React, {useState} from "react";
import {Dimensions, SafeAreaView, ScrollView, StatusBar, View, Text, Image, PixelRatio, StyleSheet} from "react-native";

export default function WelcomeScroll () {
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');

    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
        }
    };

    const { currentPage: pageIndex } = sliderState;

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event: any) => {
                        setSliderPage(event);
                    }}
                >
                    <View style={{ width, height }}>
                        {/*<Image source={require('../assets/images/health-icon.png')} style={styles.imageStyle} />*/}
                        <View style={styles.wrapper}>
                            <Text style={styles.title}>
                                <Text style={{fontWeight: '200'}}>go</Text>
                                <Text style={{fontWeight: '700'}}>bz.</Text>
                            </Text>
                            <Text style={styles.description}>Supporting local businesses in a safe way.</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <Image
                            source={require('../assets/images/risk.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.header}>We tell you about risk levels</Text>
                            <Text style={styles.paragraph}>to make sure that you stay safe</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <Image
                            source={require('../assets/images/reward-card.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.header}>Receive reward points</Text>
                            <Text style={styles.paragraph}>for purchasing at safe locations</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <Image
                            source={require('../assets/images/local.png')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.header}>Support your community</Text>
                            <Text style={styles.paragraph}>by buying local and submitting reviews</Text>
                        </View>
                    </View>
                    {/*<View style={{ width, height }}>*/}
                    {/*    <Image*/}
                    {/*        source={require('../assets/images/health-icon.png')}*/}
                    {/*        style={styles.imageStyle}*/}
                    {/*    />*/}
                    {/*    <View style={styles.wrapper}>*/}
                    {/*        <Text style={styles.title}>Top Notch Artists</Text>*/}
                    {/*        <Text style={styles.description}>... all in one place</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*<View style={{ width, height }}>*/}
                    {/*    <Image*/}
                    {/*        source={require('../assets/images/health-icon.png')}*/}
                    {/*        style={styles.imageStyle}*/}
                    {/*    />*/}
                    {/*    <View style={styles.wrapper}>*/}
                    {/*        <Text style={styles.title}>Best deal on the market</Text>*/}
                    {/*        <Text style={styles.description}>... let's find your next art</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*<View style={{ width, height }}>*/}
                    {/*    <Image*/}
                    {/*        source={require('../assets/images/health-icon.png')}*/}
                    {/*        style={styles.imageStyle}*/}
                    {/*    />*/}
                    {/*    <View style={styles.wrapper}>*/}
                    {/*        <Text style={styles.title}>It's all about art</Text>*/}
                    {/*        <Text style={styles.description}>... seriously, it is</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </ScrollView>
                <View style={styles.paginationWrapper}>
                    {Array.from(Array(4).keys()).map((key, index) => (
                        <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                    ))}
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        // height: PixelRatio.getPixelSizeForLayoutSize(135),
        // width: '30%',
        width: '20%',
        alignSelf: 'center',
        resizeMode: 'contain',
        top: -90,
        marginBottom: -325,
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    header: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 15,
        color: 'white',
        opacity: 0.7
    },
    title: {
        fontSize: 50,
        color: 'white',
        alignSelf: 'center',
        marginTop: '30%'
    },
    description: {
        color: 'white',
        alignSelf: 'center',
        opacity: 0.70,
        fontSize: 15,
        fontWeight: "600",
        marginTop: '5%'
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: '50%',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'orange',
        marginLeft: 10,
    },
});
