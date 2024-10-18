import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Block from './Block'; 

const Index = () => {

    const [block, setBlock] = useState(new Block(100, 20, 50, 100, 5)); 

    useEffect(() => {
        const interval = setInterval(() => {
            block.moveInX(); 

            setBlock(new Block(block.width, block.height, block.xPosition, block.yPosition, block.Xspeed));
        }, 16);

        
        return () => clearInterval(interval); 
    }, []); 

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
});

export default Index;
