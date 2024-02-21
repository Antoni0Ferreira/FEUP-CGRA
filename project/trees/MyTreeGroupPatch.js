import { CGFobject } from "../../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject {
    constructor(scene){
        super(scene);
        this.trees = [];
        this.createTrees();
    }

    /**
     * @method createTrees
     * Initializes the tree array with objects made up of a tree and its x, y and z positions 
     */
    createTrees(){
        let z = 0;
        for(let i = 0; i < 9; i+=3){
            let x = 0;
            for(let j = 0; j < 3; j++){
                let tree = new MyBillboard(this.scene, true);
                const xRandom = Math.floor(Math.random() * 2);
                const zRandom = Math.floor(Math.random() * 3);
                this.trees.push({tree: tree, x: 40 + x + xRandom, y: -76.3, z: 20 + z + zRandom});
                x += 10;
            }
            z += 10;
        }
    }

    /**
     * @method display
     * Displays the tree patch
     */
    display(){
        for(let i = 0; i < this.trees.length; i++){
            this.scene.pushMatrix();
            
            this.trees[i].tree.display(this.trees[i].x, this.trees[i].y, this.trees[i].z);
            this.scene.popMatrix();
            
        }
    }
}