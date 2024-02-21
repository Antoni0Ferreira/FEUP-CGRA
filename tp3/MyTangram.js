import { MyDiamond } from "../tp3/MyDiamond.js";
import { MyTriangle } from "../tp3/MyTriangle.js";
import { MyParallelogram } from "../tp3/MyParallelogram.js";
import { MyTriangleSmall } from "../tp3/MyTriangleSmall.js";
import { MyTriangleBig } from "../tp3/MyTriangleBig.js";
import {CGFappearance, CGFobject} from '../lib/CGF.js';

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
		this.initMaterials(scene);
        this.greenDiamond = new MyDiamond(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
		this.yellowParallelogram = new MyParallelogram(this.scene);
		this.purpleTriangleSmall = new MyTriangleSmall(this.scene);
		this.redTriangleSmall = new MyTriangleSmall(this.scene);
		this.orangeTriangleBig = new MyTriangleBig(this.scene);
		this.blueTriangleBig = new MyTriangleBig(this.scene);
    }

	initMaterials(scene){
		//Green
		this.green = new CGFappearance(scene);
		this.green.setAmbient(51/255,255/255,51/255, 1.0);
		this.green.setDiffuse(0,0,0,1.0);
		this.green.setSpecular(51/255,255/255,51/255);
		this.green.setShininess(10.0);

		this.pink = new CGFappearance(scene);
		this.pink.setAmbient(255/255,153/255,204/255, 1.0);
		this.pink.setDiffuse(0,0,0,1.0);
		this.pink.setSpecular(255/255,153/255,204/255);
		this.pink.setShininess(10.0);

		this.yellow = new CGFappearance(scene);
		this.yellow.setAmbient(255/255,255/255,51/255, 1.0);
		this.yellow.setDiffuse(0,0,0,1.0);
		this.yellow.setSpecular(255/255,255/255,51/255);
		this.yellow.setShininess(10.0);

		this.purple = new CGFappearance(scene);
		this.purple.setAmbient(178/255,102/255,255/255, 1.0);
		this.purple.setDiffuse(0,0,0,1.0);
		this.purple.setSpecular(178/255,102/255,255/255);
		this.purple.setShininess(10.0);

		this.red = new CGFappearance(scene);
		this.red.setAmbient(255/255,0/255,0/255, 1.0);
		this.red.setDiffuse(0,0,0,1.0);
		this.red.setSpecular(255/255,0/255,0/255);
		this.red.setShininess(10.0);

		this.orange = new CGFappearance(scene);
		this.orange.setAmbient(255/255,128/255,0/255, 1.0);
		this.orange.setDiffuse(0,0,0,1.0);
		this.orange.setSpecular(255/255,128/255,0/255);
		this.orange.setShininess(10.0);

		this.blue = new CGFappearance(scene);
		this.blue.setAmbient(51/255,153/255,255/255, 1.0);
		this.blue.setDiffuse(0,0,0,1.0);
		this.blue.setSpecular(51/255,153/255,255/255);
		this.blue.setShininess(10.0);
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
		this.scene.customMaterial.apply();
		this.greenDiamond.display();
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
		this.pink.apply();
		this.pinkTriangle.display();
		this.scene.popMatrix();

		//Parallelogram

		this.scene.pushMatrix();
		this.scene.translate(0, -2/3*Math.sqrt(8) - 2.03, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.yellow.apply();
		this.yellowParallelogram.display(); 
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
		this.red.apply();
		this.redTriangleSmall.display(); 

		this.scene.popMatrix();

		//Lower small Triangle

		this.scene.pushMatrix();
		this.scene.translate(-0.3, -4.2, 0);
		this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
		this.purple.apply();
		this.purpleTriangleSmall.display(); 
		this.scene.popMatrix();

		//Upper big Triangle

		this.scene.pushMatrix();
		this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0);
		this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
		this.orange.apply();
		this.orangeTriangleBig.display(); 
		this.scene.popMatrix();

		//Lower big Triangle

		this.scene.pushMatrix();
		this.scene.translate(Math.sqrt(2), -0.5, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.blue.apply();
		this.blueTriangleBig.display(); 
		this.scene.popMatrix();


    }

	enableNormalViz(){
		this.greenDiamond.enableNormalViz();
		this.pinkTriangle.enableNormalViz();
		this.yellowParallelogram.enableNormalViz();
		this.redTriangleSmall.enableNormalViz();
		this.purpleTriangleSmall.enableNormalViz();
		this.orangeTriangleBig.enableNormalViz();
		this.blueTriangleBig.enableNormalViz();
	};

	disableNormalViz(){
		this.greenDiamond.disableNormalViz();
		this.pinkTriangle.disableNormalViz();
		this.yellowParallelogram.disableNormalViz();
		this.redTriangleSmall.disableNormalViz();
		this.purpleTriangleSmall.disableNormalViz();
		this.orangeTriangleBig.disableNormalViz();
		this.blueTriangleBig.disableNormalViz();
	};
}