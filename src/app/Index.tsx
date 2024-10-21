import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Block from './Block'; 

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Index = () => {

    

    const [block, setBlock] = useState(new Block(100, 20, 50, 100, 5)); 

    //Base Block
    const baseBlockWidth = 150;
    const baseBlockHeight = 20;
    const baseBlock = new Block(
        baseBlockWidth, 
        baseBlockHeight, 
        screenWidth/2, 

        screenHeight-100, //problem here
        0
    );

    //Effect to move edge to edge
    useEffect(() => {
        const interval = setInterval(() => {
            block.moveInX(); 
            setBlock(new Block(block.width, block.height, block.xPosition, block.yPosition, block.Xspeed));
        }, 16);
        return () => clearInterval(interval); 
    }, []); 


    //View Components
    return (
        <View style={styles.containerStyle}>

            <View
                style={[
                    styles.blockStyle,
                    {
                        width: block.width,
                        height: block.height,
                        left: block.xPosition,
                        top: block.yPosition
                    }
                ]}
            />
            

            <View
                style={[
                    styles.baseBlockStyle,
                    {
                        width: baseBlock.width,
                        height: baseBlock.height,
                        top: baseBlock.yPosition
                        
                    },
                ]}
            />

                

        </View>
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
