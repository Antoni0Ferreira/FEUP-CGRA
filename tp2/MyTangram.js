import { MyDiamond } from "../tp1/MyDiamond.js";
import { MyTriangle } from "../tp1/MyTriangle.js";
import { MyParallelogram } from "../tp1/MyParallelogram.js";
import { MyTriangleSmall } from "../tp1/MyTriangleSmall.js";
import { MyTriangleBig } from "../tp1/MyTriangleBig.js";
import {CGFobject} from '../lib/CGF.js';

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.triangleSmall = new MyTriangleSmall(this.scene);
		this.triangleBig = new MyTriangleBig(this.scene);
    }

    display(){

		//Diamond

		this.scene.pushMatrix();
		var trans = [
		  1.0,0.0,0.0,0.0,
		  0.0,1.0,0.0,0.0,
		  0.0,0.0,1.0,0.0,
		  -1.8,2.3,0.0,1.0
		];
  
		var rot = [
		  Math.cos(Math.PI /8), Math.sin(Math.PI /8), 0.0, 0.0,
		  -Math.sin(Math.PI / 8), Math.cos(Math.PI / 8), 0.0, 0.0,
		  0.0, 0.0, 1.0, 0.0,
		  0.0, 0.0, 0.0, 1.0
		];

		this.scene.multMatrix(trans);
		this.scene.multMatrix(rot);
		this.diamond.display();
		this.scene.popMatrix();

		//Triangle

		this.scene.pushMatrix();
		var trans = [
		  1.0,0.0,0.0,0.0,
		  0.0,1.0,0.0,0.0,
		  0.0,0.0,1.0,0.0,
		  2.4,0.5,0.0,1.0
		]
  
		var rot = [
		  Math.cos(Math.PI /2), Math.sin(Math.PI /2), 0.0, 0.0,
		  -Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0.0, 0.0,
		  0.0, 0.0, 1.0, 0.0,
		  0.0, 0.0, 0.0, 1.0
		];
		this.scene.multMatrix(trans);
		this.scene.multMatrix(rot);
		this.triangle.display();
		this.scene.popMatrix();

		//Parallelogram

		this.scene.pushMatrix();
		this.scene.translate(0, -2/3*Math.sqrt(8) - 2.03, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.parallelogram.display(); 
		this.scene.popMatrix();

		//Upper small Triangle

		this.scene.pushMatrix();

		var trans = [
			1.0,0.0,0.0,0.0,
			0.0,1.0,0.0,0.0,
			0.0,0.0,1.0,0.0,
			3.0,1.0,0.0,1.0
		  ];

		var rot = [
			-Math.cos(Math.PI /4), Math.sin(Math.PI /4), 0.0, 0.0,
			-Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		]

		this.scene.translate(Math.sqrt(8)+Math.sqrt(2)/2, Math.sqrt(2)+0.206, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.triangleSmall.display(); 

		this.scene.popMatrix();

		//Lower small Triangle

		this.scene.pushMatrix();
		this.scene.translate(-0.3, -4.2, 0);
		this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
		this.triangleSmall.display(); 
		this.scene.popMatrix();

		//Upper big Triangle

		this.scene.pushMatrix();
		this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0);
		this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
		this.triangleBig.display(); 
		this.scene.popMatrix();

		//Lower big Triangle

		this.scene.pushMatrix();
		this.scene.translate(Math.sqrt(2), -0.5, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.triangleBig.display(); 
		this.scene.popMatrix();
    }
}