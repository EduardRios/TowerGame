
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
    aligmentTolerance: number;

    particleBlock: Block | null;


    constructor() {
        this.baseBlockWidth = 150;
        this.baseBlockHeight = 20;
        this.aligmentTolerance = 10;
        this.baseBlock = new Block(
            this.baseBlockWidth,
            this.baseBlockHeight,
            (screenWidth - this.baseBlockWidth) / 2,
            screenHeight - 100, //problem here
            0
        );
        this.blocks = [this.baseBlock]

        this.particleBlock = null;

    }

    addBlockToTower(fallingBlock: Block) {
        const lastBlock = this.blocks[this.blocks.length - 1];


        if (this.checkCollision(fallingBlock, lastBlock)) {
            fallingBlock.yPosition = lastBlock.yPosition - fallingBlock.height;
            fallingBlock.Xspeed = 0;

            const isAligned = this.checkAlignment(fallingBlock, lastBlock);
            if (isAligned && lastBlock !== this.baseBlock) {
                console.log("Perfect alignment! Granting bonus points or effects.");

                this.blocks.pop();
            } else {
                this.blocks.push(fallingBlock);
            }

            this.particleBlock = fallingBlock;
            
            //adjust blocks
            // this.blocks.slice(1).forEach((block, index) => {
            //     block.yPosition = this.baseBlock.yPosition - (index + 1) * block.height;
            // });


            return true;
            //return { success: true, isAligned };

        } else {
            this.isGameOver = true;
            return false;
            //return { success: false, isAligned: false };
        }

    }


    checkCollision(fallingBlock: Block, targetBlock: Block): boolean {
        return (
            fallingBlock.xPosition < targetBlock.xPosition + targetBlock.width &&
            fallingBlock.xPosition + fallingBlock.width > targetBlock.xPosition &&
            fallingBlock.yPosition + fallingBlock.height >= targetBlock.yPosition
        );
    }


    checkAlignment(fallingBlock: Block, lastBlock: Block): boolean {
        const lastBlockCenter = lastBlock.xPosition + lastBlock.width / 2;
        const fallingBlockCenter = fallingBlock.xPosition + fallingBlock.width / 2;

        //Returns true if distance between centers is < than tolerance
        return Math.abs(lastBlockCenter - fallingBlockCenter) <= this.aligmentTolerance;
    }

}


export default Tower;
