import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Block from './Block';
import Tower from './Tower';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Index = () => {

    const [block, setBlock] = useState(Block.createNewBlock());
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

                // Move in X when not falling
                if (!isFalling) {
                    newBlock.moveInX();

                    // Move in Y (fall) when falling    
                } else {

                    newBlock.moveInY();

                    // Check if the block can be added to the tower
                    if (tower.addBlock(newBlock)) {
                        setIsFalling(false);
                        //setBlock(Block.createNewBlock());

                        const newFallingBlock = Block.createNewBlock();
                        // setBlock(newFallingBlock);
                        console.log("returning block " + newFallingBlock);
                        return newFallingBlock;


                    } else if (newBlock.yPosition >= screenHeight - 100) {
                        console.log("RESETTING");
                        resetGame();
                    }

                }

                return newBlock;
            });
        }, 16);

        return () => clearInterval(interval);
    }, [isFalling, tower]);


    const handleTouch = () => {
        setIsFalling(true);
    };

    const resetGame = () => {
        setBlock(Block.createNewBlock());
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
                {tower.blocks.map((towerBlock, index) => (
                    <View
                        key={index}
                        style={[
                            styles.baseBlockStyle,
                            {
                                width: towerBlock.width,
                                height: towerBlock.height,
                                left: towerBlock.xPosition,
                                top: towerBlock.yPosition,
                            },
                        ]}
                    />
                ))}

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