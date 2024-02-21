import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0.5,0.5,-0.5,   //0
            0.5,0.5,0.5,    //1
            -0.5,0.5,0.5,   //2
            -0.5,0.5,-0.5,   //3

            0.5,-0.5,-0.5,  //4
            0.5,-0.5,0.5,   //5
            -0.5,-0.5,0.5,  //6
            -0.5,-0.5,-0.5  //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2,1,3,
            3,1,0,

            4,5,7,
            5,6,7,

            2,5,1,
            2,6,5,

            0,1,4,
            1,5,4,

            2,3,6,
            3,7,6,

            3,0,4,
            4,7,3
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

