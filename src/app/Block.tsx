import { Movement } from './interfaces/Movement';
import { Dimensions } from 'react-native';

class Block implements Movement {
    width: number; 
    height: number;
    xPosition: number;
    yPosition: number;
    Xspeed: number;
    gravity: number;

    imageSource: any;
    
    constructor(width: number, height: number, xPosition:number, yPosition: number, Xspeed: number, imageSource: any) {
        this.width = width;
        this.height = height;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.Xspeed = Xspeed;
        this.gravity = 10;

        this.imageSource = imageSource;
    }

    moveInX() {
        this.xPosition += this.Xspeed;

        // Changes direction
        const screenWidth = Dimensions.get('window').width; 
        if (this.xPosition <= 0 || this.xPosition + this.width >= screenWidth) {
            this.Xspeed = -this.Xspeed;
        }
    }

    moveInY() {
        this.yPosition += this.gravity;
    }

    static createNewBlock() {
        const screenWidth = Dimensions.get('window').width;
        const newBlockWidth = 100;
        const newBlockHeight = 20;
        const startXPosition = Math.random() * (screenWidth - newBlockWidth);
        const startYPosition = 100;  
        const speedX = 5;

        const imageSource = require("C:/Users/eduar/projects/towerGame/assets/images/brick.png");

        return new Block(newBlockWidth, newBlockHeight, startXPosition, startYPosition, speedX, imageSource);
    }

}

export default Block;
