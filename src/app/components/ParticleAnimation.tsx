import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';

import particleAnimation from 'C:/Users/eduar/projects/towerGame/assets/ParticleAppears.json';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ParticleAnimation = ({ isVisible, xPosition, yPosition }: { isVisible: boolean, xPosition: number, yPosition: number }) => {
  
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isVisible && animationRef.current) {
      animationRef.current.play(); 
    }
  }, [isVisible]);

  return (
    <View style={[
        styles.animationContainer,
        { top: yPosition, left: xPosition }
    ]}>
        <LottieView
            ref={animationRef} 
            source={particleAnimation} 
            autoPlay={false} 
            loop={false} 
            style={styles.lottieStyle}
        />
    </View>
);


};

const styles = StyleSheet.create({
  animationContainer: {
    position: 'absolute',
    width: 150,
    height: 150,
    zIndex: 10, 
  },
  lottieStyle: {
    width: 150,
    height: 150,
  },
});

export default ParticleAnimation;
