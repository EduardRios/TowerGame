import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Block from './Block';
import Tower from './Tower';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Index = () => {

    const [block, setBlock] = useState(new Block(100, 20, 50, 100, 5));
    const [isFalling, setIsFalling] = useState(false);

    const [tower, setTower] = useState(new Tower());

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

                    if (newBlock.yPosition >= screenHeight - 100) {
                        const result = tower.addBlock(newBlock); 
                        if (!result) {
                           
                            resetGame();
                        } else {
                            setIsFalling(false); 
                            console.log("helo");
                            
                        }
                    }
                }

                return newBlock; 
            });
        }, 16); 

        return () => clearInterval(interval);
    }, [isFalling]);


    const handleTouch = () => {
        setIsFalling(true);
    };

    const resetGame = () => {
        setBlock(new Block(100, 20, 50, 100, 5));
        setIsFalling(false);
        setTower(new Tower()); 
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
                            width: tower.blocks[0].width,
                            height: tower.blocks[0].height,
                            left: tower.blocks[0].xPosition,
                            top: tower.blocks[0].yPosition,
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