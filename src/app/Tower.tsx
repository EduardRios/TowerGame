
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
        if (this.checkCollision(fallingBlock)) {
            fallingBlock.yPosition = this.blocks[this.blocks.length - 1].yPosition - fallingBlock.height;

            fallingBlock.Xspeed = 0;
            this.blocks.push(fallingBlock);

            return true;
        } else {
            this.isGameOver = true;
            return false;
        }
    }
    

    checkCollision(fallingBlock: Block): boolean {
        const baseBlock = this.baseBlock;

        return (
            fallingBlock.xPosition < baseBlock.xPosition + baseBlock.width &&
            fallingBlock.xPosition + fallingBlock.width > baseBlock.xPosition &&
            fallingBlock.yPosition + fallingBlock.height >= baseBlock.yPosition
        );
    }
}


export default Tower;
