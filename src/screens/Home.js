import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native';
import Assets from '../assets';
import { StaticData } from "../utils/StaticData"
import { ImageCard } from '../components/ImageCard';
import { FlashList } from "@shopify/flash-list";

export default function Home() {
    //for Loop-Animation
    // const lottieRef = useRef();

    // useEffect(() => {
    //     if (lottieRef.current) {
    //         setTimeout(() => {
    //             lottieRef.current?.reset();
    //             lottieRef.current?.play();
    //         }, 100);
    //     }
    // }, [lottieRef.current]);

    const scrollPosition = useRef(new Animated.Value(0)).current;
    const handleScroll = ({ nativeEvent }) => {
        setisSwipeup(false);
        const calculatedScrollPosition =
            nativeEvent.contentOffset.y /
            (nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height);
        scrollPosition.setValue(calculatedScrollPosition);
    };

    const swipeUpRef = useRef();
    const bunnyRef = useRef(new Animated.Value(0)).current;

    const [isSwipeup, setisSwipeup] = useState(true);
    const [isBunny, setisBunny] = useState(false);

    useEffect(() => {
        swipeUpRef.current?.play();
    }, [swipeUpRef.current])

    const imageHandler = () => {
        setisBunny(true)
        bunnyRef.setValue(0)
        Animated.timing(bunnyRef, {
            toValue: 2,
            duration: 10000,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                setisBunny(false)
                console.log('stopped');
            }
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={'#FFFFFF'}
                barStyle={'dark-content'}
            />
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

                {/* Header */}
                <View style={styles.header}>
                    <LottieView
                        //for Loop-Animation----
                        // ref={lottieRef}
                        // loop={true}
                        // speed={0.1}
                        resizeMode='center'
                        progress={scrollPosition.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                        })}
                        source={Assets.lottieFiles.planePath}
                        colorFilters={[{ keypath: 'Plane', color: 'rgb(255, 100, 0)' }]}
                    />
                </View>
                <FlashList
                    // bounces={false}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={1}
                    onScroll={handleScroll}
                    data={StaticData}
                    keyExtractor={item => item?.key}
                    renderItem={({ item }) => <ImageCard data={item} onPress={() => imageHandler()} />}
                    contentContainerStyle={styles.list}
                />
                {isSwipeup &&
                    <Animated.View style={styles.swupeUp}>
                        <LottieView
                            //for Loop-Animation----
                            style={{
                                height: 60,
                                width: 100,
                            }}
                            resizeMode='cover'
                            ref={swipeUpRef}
                            // loop={true}
                            speed={0.1}
                            source={Assets.lottieFiles.swipeUp}
                        />
                    </Animated.View>
                }
                {isBunny &&
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                        onPress={() => setisBunny(false)}
                    >
                        <LottieView
                            //for Loop-Animation----
                            style={{
                                height: '76%',
                                // width: '80%',
                            }}
                            // resizeMode='cover'
                            progress={bunnyRef}
                            // loop={true}
                            speed={0.1}
                            source={Assets.lottieFiles.bunny}
                        />
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'

    },
    header: {
        height: 80,
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: '#FFFFFF'
    },
    list: {
        backgroundColor: 'rgb(240, 240, 240)',
        paddingVertical: 14,
    },
    swupeUp: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10
    }
})