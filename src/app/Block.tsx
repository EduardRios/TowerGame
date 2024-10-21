import { Movement } from './interfaces/Movement';
import { Dimensions } from 'react-native';

class Block implements Movement {
    width: number; 
    height: number;
    xPosition: number;
    yPosition: number;
    Xspeed: number;

    gravity: number;
    
    constructor(width: number, height: number, xPosition:number, yPosition: number, Xspeed: number) {
        this.width = width;
        this.height = height;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.Xspeed = Xspeed;

        this.gravity = 5;
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
        const screenHeight = Dimensions.get('window').height;
        if (this.yPosition + this.height < screenHeight) {
            this.yPosition += this.gravity; // La gravedad empuja el bloque hacia abajo
        } else {
            this.yPosition = screenHeight - this.height; // Detenemos la caída en el borde inferior
        }
    }
}

export default Block;
