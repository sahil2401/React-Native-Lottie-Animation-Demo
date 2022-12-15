import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { Animated, Image, TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import Assets from '../assets/index';
export const ImageCard = ({ data, ...props }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [processing, setProcessing] = useState(false);
    const animationProgress = useRef(new Animated.Value(0)).current;

    var lastTap = null;

    const showAnimation = () => {
        setProcessing(true);
        animationProgress.setValue(isLiked ? 0.8 : 0);
        Animated.timing(animationProgress, {
            toValue: isLiked ? 1 : 0.5,
            duration: 2000,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) {
                setIsLiked(!isLiked);
                setProcessing(false);
            }
        });
    };

    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            showAnimation()
        } else {
            lastTap = now;
        }
    }
    return (
        <TouchableWithoutFeedback
            key={data?.key}
            style={styles.item}
            onLongPress={props.onPress}
            onPress={() => handleDoubleTap()}
        >
            <View>
                {processing && (
                    <Animated.View
                        style={[
                            styles.overlayLottie,
                            {
                                opacity: animationProgress.interpolate({
                                    inputRange: [0, 0.1, 0.9, 1],
                                    outputRange: [0, 1, 1, 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ]}>
                        <LottieView
                            progress={animationProgress}
                            source={
                                Assets.lottieFiles.unLike
                            }
                        />
                    </Animated.View>
                )}
                <Image
                    source={{ uri: data?.img }}
                    resizeMode={'cover'}
                    style={styles.itemImage}
                />
                <View style={styles.cardRow}>
                    <Text style={styles.itemText}>{data?.title}</Text>
                    <Text style={styles.likeText}>{isLiked ? 'UnLike' : 'Like'}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 14,
        marginVertical: 10,
        zIndex: 1,
    },
    itemText: {
        color: 'rgb(0, 0, 0)',
        fontSize: 20,
        letterSpacing: 2,
        fontWeight: 'bold',
        paddingTop: 12,
    },
    likeText: {
        color: 'rgb(255, 100, 0)',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 2,
    },
    itemImage: {
        height: 400,
        width: '100%',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 10,
    },
    infoText: {
        fontSize: 12,
        color: 'rgb(255, 100, 0)',
        fontWeight: '900',
        letterSpacing: 0.2,
        lineHeight: 12,
        textAlign: 'center',
        zIndex: 2,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -24,
    },
    overlayLottie: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(240, 240, 240, 0.4)',
    },
})