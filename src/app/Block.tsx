import { Movement } from './interfaces/Movement';
import { Dimensions } from 'react-native';

class Block implements Movement {
    width: number; 
    height: number;
    xPosition: number;
    yPosition: number;
    Xspeed: number;
    
    constructor(width: number, height: number, xPosition:number, yPosition: number, Xspeed: number) {
        this.width = width;
        this.height = height;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.Xspeed = Xspeed;
    }

    moveInX() {
        this.xPosition += this.Xspeed;

        // Cambia de dirección al tocar los bordes
        const screenWidth = Dimensions.get('window').width; // Obtiene el ancho de la pantalla
        if (this.xPosition <= 0 || this.xPosition + this.width >= screenWidth) {
            this.Xspeed = -this.Xspeed;
        }
    }

    moveInY() {
        // Lógica para mover en Y (puedes implementarla)
    }
}

export default Block;
