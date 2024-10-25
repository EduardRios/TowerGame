import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Block from './src/app/Block';
import Tower from './src/app/Tower';

import { Image } from 'react-native';

import ParticleAnimation from './src/app/components/ParticleAnimation';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Index = () => {

    const [block, setBlock] = useState(Block.createNewBlock());
    const [isFalling, setIsFalling] = useState(false);
    const [tower, setTower] = useState(new Tower());
    const [score, setScore] = useState(0);

    const [showParticles, setShowParticles] = useState(false);

    const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });

    //Effect to move edge to edge
    useEffect(() => {
        const interval = setInterval(() => {
            setBlock(prevBlock => {
                const newBlock = new Block(
                    prevBlock.width,
                    prevBlock.height,
                    prevBlock.xPosition,
                    prevBlock.yPosition,
                    prevBlock.Xspeed,
                    prevBlock.imageSource
                );

                // Move in X when not falling
                if (!isFalling) {
                    newBlock.moveInX();

                    // Move in Y (fall) when falling    
                } else {

                    newBlock.moveInY();

                    // Check if the block can be added to the tower
                    if (tower.addBlockToTower(newBlock)) {
                        setScore(prevScore => prevScore + 1);

                        setParticlePosition({ x: newBlock.xPosition, y: newBlock.yPosition });
                        setShowParticles(true);
                        setTimeout(() => setShowParticles(false), 1000);

                        console.log("Particulas");

                        setIsFalling(false);

                        const newFallingBlock = Block.createNewBlock();
                        return newFallingBlock;

                    } else if (newBlock.yPosition >= screenHeight - 100) {

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
        setScore(0);
        setBlock(Block.createNewBlock());
        setIsFalling(false);
        setTower(new Tower());
    };


    //View Components
    return (
        <TouchableWithoutFeedback onPress={handleTouch}>
            <View style={styles.containerStyle}>
                {/* moveable block */}
                <Image
                    source={block.imageSource}
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
                    <View key={index} style={[
                        styles.baseBlockStyle,
                        {
                            width: towerBlock.width,
                            height: towerBlock.height,
                            left: towerBlock.xPosition,
                            top: towerBlock.yPosition,
                        },
                    ]}>
                        {/* Middle line in each block*/}
                        {index === tower.blocks.length - 1 && (
                            <View style={styles.alignmentIndicator} />
                        )}

                    </View>
                ))}



                {/* base block image */}
                {tower.blocks.map((towerBlock, index) => (
                    <View key={index} style={{ position: 'absolute' }}>
                        <Image
                            source={towerBlock.imageSource}
                            style={[
                                styles.baseBlockStyle,
                                {
                                    width: towerBlock.width,
                                    height: towerBlock.height,
                                    left: towerBlock.xPosition-200, //here problem
                                    top: towerBlock.yPosition,
                                },
                            ]}
                        />


                        {/* Línea de alineación en el último bloque */}
                        {index === tower.blocks.length - 1 && (
                            <View
                                style={[
                                    styles.alignmentIndicator,
                                    { top: towerBlock.yPosition, left: screenWidth / 2 },
                                ]}
                            />
                        )}

                        {showParticles && (
                            <ParticleAnimation
                                isVisible={showParticles}
                                xPosition={particlePosition.x-200}//here
                                yPosition={particlePosition.y-70} //here
                            />
                        )}




                        
                    </View>
                ))}

                {/* Display Score */}
                <Text style={styles.scoreText}>Score: {score}</Text>


                {/* Mostrar la animación de partículas cuando sea necesario */}
                {/* {showParticles && (
                    <ParticleAnimation
                        isVisible={showParticles}
                        xPosition={particlePosition.x}
                        yPosition={particlePosition.y - 100}
                    />
                )} */}

            </View>
        </TouchableWithoutFeedback>
    );

};




const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        //justifyContent: 'center',
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

    scoreText: {
        fontSize: 24,
        color: 'black',
        position: 'absolute',
        top: 20,
        left: 10,
    },

    alignmentIndicator: {
        position: 'absolute',
        height: '100%',
        width: 2,
        backgroundColor: 'red',
        left: '50%',
    }

});

export default Index;