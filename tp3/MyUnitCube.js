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
            0.5,0.5,-0.5, // Right Face //0 //A
            0.5,0.5,0.5, //1 //E
            0.5,-0.5,-0.5, //2 //F
            0.5,-0.5,0.5, //3 //B

            0.5,0.5,0.5, //Front Face //4 //B
            0.5,-0.5,0.5, //5 //F
            -0.5,-0.5,0.5, //6 //G
            -0.5,0.5,0.5, //7 //C

            -0.5,0.5,0.5, //Left Face //8 //C
            -0.5,-0.5,-0.5, //9 //H
            -0.5,-0.5,0.5, //10 //G
            -0.5,0.5,-0.5, //11 //D
            
            -0.5,0.5,-0.5, //Back Face //12 //D
            -0.5,-0.5,-0.5, //13 //H
            0.5,-0.5,-0.5, //14 //E
            0.5,0.5,-0.5, //15 //A

            0.5,0.5,-0.5, //Top Face //16 //A
            0.5,0.5,0.5, //17 //B
            -0.5,0.5,0.5, //18 //C
            -0.5,0.5,-0.5, //19 //D

            0.5,-0.5,-0.5,  //Bottom Face //20 //E
            0.5,-0.5,0.5,   //21 //F
            -0.5,-0.5,0.5,  //22 //G
            -0.5,-0.5,-0.5  //23 //H
		];

		//Counter-clockwise reference of vertices
		this.indices = [
		0,1,2, //Right Face
            1,3,2,

            7,5,4, //Front Face
            7,6,5,

            8,9,10, //Left Face
            9,8,11,

            13,12,14, //Back Face
            12,15,14,

            17,16,18, //Top Face
            18,16,19,

            22,20,21, //Bottom Face
            22,23,20,
            
		];

            this.normals = [
            
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,

            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,

            -1,0,0,
            -1,0,0,
            -1,0,0,
            -1,0,0,

            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,

            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,

            0,-1,0,
            0,-1,0,
            0,-1,0,
            0,-1,0,

            ]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}
}

