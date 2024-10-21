import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Block from './Block';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Index = () => {

    const [block, setBlock] = useState(new Block(100, 20, 50, 100, 5));
    const [isFalling, setIsFalling] = useState(false);


    //Base Block
    const baseBlockWidth = 150;
    const baseBlockHeight = 20;
    const baseBlock = new Block(
        baseBlockWidth,
        baseBlockHeight,
        (screenWidth - baseBlockWidth) / 2,

        screenHeight - 100, //problem here
        0
    );

    //Effect to move edge to edge
    useEffect(() => {
        const interval = setInterval(() => {
            setBlock(prevBlock => {
                const newBlock = new Block(
                    prevBlock.width,
                    prevBlock.height,
                    prevBlock.xPosition,
                    prevBlock.yPosition,
                    prevBlock.Xspeed
                );

                if (!isFalling) {
                    // Move in X when not falling
                    newBlock.moveInX();
                } else {
                    // Move in Y (fall) when falling
                    newBlock.moveInY();
                }

                return newBlock; // Return the updated block
            });
        }, 16); // Approx 60 FPS

        return () => clearInterval(interval);
    }, [isFalling]);


    const handleTouch = () => {
        setIsFalling(true);
    };


    //View Components
    return (
        <TouchableWithoutFeedback onPress={handleTouch}>
            <View style={styles.containerStyle}>
                {/* moveable block */}
                <View
                    style={[
                        styles.blockStyle,
                        {
                            width: block.width,
                            height: block.height,
                            left: block.xPosition,
                            top: block.yPosition,
                        },
                    ]}
                />

                {/* base block */}
                <View
                    style={[
                        styles.baseBlockStyle,
                        {
                            width: baseBlock.width,
                            height: baseBlock.height,
                            left: baseBlock.xPosition,
                            top: baseBlock.yPosition,
                        },
                    ]}
                />
            </View>
        </TouchableWithoutFeedback>
    );

};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockStyle: {
        position: 'absolute',
        backgroundColor: 'blue',
    },

    baseBlockStyle: {
        position: 'absolute',
        backgroundColor: 'green',
        borderTopWidth: 2,
        borderColor: 'black',
    },
});

export default Index;
