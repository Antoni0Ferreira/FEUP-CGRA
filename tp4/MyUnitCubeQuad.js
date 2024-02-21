import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    
	constructor(scene, top=undefined, front=undefined, right=undefined, back=undefined, left=undefined, bottom=undefined) {
		super(scene);
		this.quad = new MyQuad(this.scene);
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.front = front;
        this.back = back;

        this.initMaterials(this.scene);
	}

    initMaterials(scene) {
        this.cubeMaterial = new CGFappearance(scene);
        this.cubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeMaterial.setShininess(10.0);

    }


	display() {

        this.cubeMaterial.apply();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.cubeMaterial.setTexture(this.front);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.cubeMaterial.setTexture(this.back);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Top
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.cubeMaterial.setTexture(this.top);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Bottom
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.cubeMaterial.setTexture(this.bottom);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.cubeMaterial.setTexture(this.right);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2,0,-1,0);
        this.cubeMaterial.setTexture(this.left);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

    }
}

