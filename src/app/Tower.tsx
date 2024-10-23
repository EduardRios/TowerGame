
//Class Tower
import Block from "./Block";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Tower {
    blocks: Block[];
    isGameOver: boolean = false;
    baseBlockWidth: number;
    baseBlockHeight: number;
    baseBlock: Block;
    

    constructor() {
        this.baseBlockWidth = 150;
        this.baseBlockHeight = 20;
        this.baseBlock = new Block(
            this.baseBlockWidth,
            this.baseBlockHeight,
            (screenWidth - this.baseBlockWidth) / 2,
            screenHeight - 100, //problem here
            0
        );
        this.blocks = [this.baseBlock]
    }

    addBlock(fallingBlock: Block) {
        const lastBlock = this.blocks[this.blocks.length - 1];
    
        if (this.checkCollision(fallingBlock, lastBlock)) {
            fallingBlock.yPosition = lastBlock.yPosition - fallingBlock.height;
            fallingBlock.Xspeed = 0;
            this.blocks.push(fallingBlock);
            return true;
        } else {
            this.isGameOver = true;
            return false;
        }
    }
    

    checkCollision(fallingBlock: Block, targetBlock: Block): boolean {
        return (
            fallingBlock.xPosition < targetBlock.xPosition + targetBlock.width &&
            fallingBlock.xPosition + fallingBlock.width > targetBlock.xPosition &&
            fallingBlock.yPosition + fallingBlock.height >= targetBlock.yPosition
        );
    }

}


export default Tower;
