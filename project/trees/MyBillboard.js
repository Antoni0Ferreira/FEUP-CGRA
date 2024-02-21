import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyQuad } from "../primitives/MyQuad.js";

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 * @param randomScale - boolean indicating if billboard should have random dimensions
 */
export class MyBillboard extends CGFobject {
    constructor (scene, randomScale) {
        super(scene);
        this.randomScale = randomScale;
        this.randomValue = 0;
        this.quad = new MyQuad(this.scene);
        this.initMaterials(scene);
    }

    /**
     * @method initMaterials
     * Initialize the appearance and the textures of the billboard
     * @param scene -  Reference to the MyScene Object
     */
    initMaterials(scene) {

        this.appearance = new CGFappearance(scene);
        const textures = ["images/billboardtree.png", "images/billboardtree_2.png", "images/billboardtree_3.png"];
        const index = Math.floor(Math.random() * textures.length);
        this.appearance.loadTexture(textures[index]);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        if(this.randomScale){
            this.randomValue = Math.random() * (2.5 -(1)) + (1);
        }

    }

    /**
     * @method display
     * Displays the billboard
     * @param x - x Position
     * @param y - y Position
     * @param z - z Position
     */
    display(x, y, z) {
        this.scene.pushMatrix();
        this.appearance.apply();
      
        this.scene.translate(x, y, z);
      
        // Make the billboard always be front facing the camera
        const viewMatrix = this.scene.camera.getViewMatrix();
        const forward = vec3.fromValues(-viewMatrix[2], -viewMatrix[6], -viewMatrix[10]);
        vec3.normalize(forward, forward);
        const angle = Math.atan2(-forward[0], -forward[2]);
        this.scene.rotate(angle, 0, 1, 0);
    
        this.scene.scale(10, 10, 10);
        if(this.randomScale){
            this.scene.scale(this.randomValue, 1, this.randomValue);
        }
        this.quad.display();

        this.scene.popMatrix();
      }
      
}