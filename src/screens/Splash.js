import { StyleSheet, Text, View, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';
import Assets from '../assets';


export default function Splash({ navigation }) {

    const animationProgress = useRef(new Animated.Value(0)).current;

    const showAnimation = () => {
        animationProgress.setValue(0);
        Animated.timing(animationProgress, {
            toValue: 0.49,
            duration: 3000,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) {
                navigation.navigate('Home')
            }
        });
    };

    useEffect(() => {
        showAnimation()
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
            <Animated.View style={{ width: 400, height: 400 }}>
                <LottieView
                    resizeMode='cover'
                    progress={animationProgress}
                    source={Assets.lottieFiles.airPlan}
                    colorFilters={[{ keypath: 'Plane', color: 'rgb(255, 100, 0)' }]}
                />
            </Animated.View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})