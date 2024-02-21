import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyPyramid } from '../primitives/MyPyramid.js';
import { MySphere } from "../primitives/MySphere.js";
import { MyTriangleSmall } from '../primitives/MyTriangleSmall.js';
import { MyUnitCubeQuad } from '../primitives/MyUnitCubeQuad.js';
import { MyWing } from '../primitives/MyWing.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 * @param birdHeadTexture - Bird Head Texture
 * @param birdTailTexture - Bird Tail Texture
 * @param birdEyesTexture - Bird Eye Texture
 * @param birdNozzleTexture - Bird Nozzle Texture
 * 
**/
export class MyBird extends CGFobject {
    constructor(scene, birdHeadTexture, birdBodyTexture, birdTailTexture, birdEyesTexture, birdNozzleTexture) {
        super(scene);
        
        this.speedFactor = 1;

        this.birdHeadTexture = birdHeadTexture;
        this.birdBodyTexture = birdBodyTexture;
        this.birdTailTexture = birdTailTexture;
        this.birdEyesTexture = birdEyesTexture;
        this.birdNozzleTexture = birdNozzleTexture;
        this.startTime = Date.now();

        this.setBird(scene);
        this.initMaterials(scene);
        
    }

    /**
     * @method setBird
     * Creates the pieces that make up the bird
     * @param scene - Reference to MyScene Object 
     */
    setBird(scene) {
        this.head = new MySphere(scene, 200, 50, false);
        this.leftEye = new MyUnitCubeQuad(scene, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture);
        this.rightEye = new MyUnitCubeQuad(scene, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture, this.birdEyesTexture);
        this.nozzle = new MyPyramid(scene, 5, 600);
        this.body = new MySphere(scene, 200, 50, false);
        this.rightWing = new MyWing(scene);
        this.leftWing = new MyWing(scene);
        this.tail = new MyTriangleSmall(scene);
    }

    /**
     * @method initMaterials
     * Initialize the appearance and the textures of the bird
     * @param scene -  Reference to the MyScene Object
     */
    initMaterials(scene) {
        this.tailMaterial = new CGFappearance(scene);
        this.tailMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tailMaterial.setEmission(0.1, 0.1, 0.1, 1);
        this.tailMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.tailMaterial.setShininess(10.0);
        this.tailMaterial.setTexture(this.birdTailTexture);
        this.tailMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.headMaterial = new CGFappearance(scene);
        this.headMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.headMaterial.setEmission(0.1, 0.1, 0.1, 1);
        this.headMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.headMaterial.setShininess(10.0);
        this.headMaterial.setTexture(this.birdHeadTexture);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.bodyMaterial = new CGFappearance(scene);
        this.bodyMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyMaterial.setEmission(0.1, 0.1, 0.1, 1);
        this.bodyMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.bodyMaterial.setShininess(10.0);
        this.bodyMaterial.setTexture(this.birdBodyTexture);
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.nozzleMaterial = new CGFappearance(scene);
        this.nozzleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.nozzleMaterial.setEmission(0.1, 0.1, 0.1, 1);
        this.nozzleMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.nozzleMaterial.setShininess(10.0);
        this.nozzleMaterial.setTexture(this.birdNozzleTexture);
        this.nozzleMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.wingMaterial = new CGFappearance(scene);
        this.wingMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.wingMaterial.setEmission(0.1, 0.1, 0.1, 1);
        this.wingMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.wingMaterial.setShininess(10.0);
        this.wingMaterial.setTexture(this.birdTailTexture);
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    /**
     * @method display
     * Displays the bird
     */
    display() {

        this.scene.pushMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5);
            this.scene.translate(0, 0, 0.5);
            this.headMaterial.apply();
            this.head.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.2, 0.2, 0.2);
            this.scene.translate(-2.4, 0, 2.3);
            this.scene.rotate(-Math.PI/3, 0, 1, 0);
            this.leftEye.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.2, 0.2, 0.2);
            this.scene.translate(2.4, 0, 2.3);
            this.scene.rotate(Math.PI/3, 0, 1, 0);
            this.rightEye.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.7);
            this.scene.scale(0.1, 0.1, 0.5);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.nozzleMaterial.apply();
            this.nozzle.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.6,0.5,0.8);
            this.scene.translate(0, -0.2, -1.1);
            this.bodyMaterial.apply();
            this.body.display();
            this.scene.popMatrix();

            //calculation of the wing rotation, that depends on the bird's speed
            const now = Date.now();
            const elapsedTime = (now - this.startTime) / 1000;

            const oscillationFrequency = 0.5 * this.speedFactor; // in Hz
            const oscillationAmplitude = Math.PI / 6; // in radians
        
            const oscillationFactor = Math.sin(elapsedTime * oscillationFrequency * 2 * Math.PI);
            const wingRotation = oscillationAmplitude * oscillationFactor;

            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.translate(1, 1.1, 0);
            this.scene.rotate(-Math.PI/7 + wingRotation, 0, 1, 0);
            this.wingMaterial.apply();
            this.rightWing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(-0.5, 0.5, 0.5);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.translate(1, 1.1, 0);
            this.scene.rotate(-Math.PI/7 + wingRotation, 0, 1, 0);
            this.wingMaterial.apply();
            this.leftWing.display();
            this.scene.popMatrix();


            this.scene.pushMatrix();
            this.scene.translate(0, 0.3, -2);
            this.scene.scale(-0.5, 0.5, 0.5);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.rotate(Math.PI/4, 1, 0, 0);
            this.tailMaterial.apply();
            this.tail.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
    }

}