import { MyDiamond } from "../tp4/MyDiamond.js";
import { MyTriangle } from "../tp4/MyTriangle.js";
import { MyParallelogram } from "../tp4/MyParallelogram.js";
import { MyTriangleSmall } from "../tp4/MyTriangleSmall.js";
import { MyTriangleBig } from "../tp4/MyTriangleBig.js";
import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
		this.initMaterials(this.scene);
        this.greenDiamond = new MyDiamond(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
		this.yellowParallelogram = new MyParallelogram(this.scene);
		this.purpleTriangleSmall = new MyTriangleSmall(this.scene);
		this.redTriangleSmall = new MyTriangleSmall(this.scene);
		this.orangeTriangleBig = new MyTriangleBig(this.scene);
		this.blueTriangleBig = new MyTriangleBig(this.scene);
		this.tangramTexture = new CGFtexture(scene, 'images/tangram.png');
    }

	initMaterials(scene){
		//Most
		this.tangramMaterial = new CGFappearance(scene);
		this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);

		this.tangramBlueMaterial = new CGFappearance(scene);
		this.tangramBlueMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramBlueMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramBlueMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramBlueMaterial.setShininess(10.0);

		this.tangramRedMaterial = new CGFappearance(scene);
		this.tangramRedMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramRedMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramRedMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramRedMaterial.setShininess(10.0);

		this.tangramPurpleMaterial = new CGFappearance(scene);
		this.tangramPurpleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramPurpleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramPurpleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramPurpleMaterial.setShininess(10.0);

		this.tangramYellowMaterial = new CGFappearance(scene);
		this.tangramYellowMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramYellowMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramYellowMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramYellowMaterial.setShininess(10.0);
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

		this.tangramMaterial.apply()
		this.scene.multMatrix(trans);
		this.scene.multMatrix(rot);
		this.tangramTexture.bind();
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
		this.tangramMaterial.apply();
		this.tangramTexture.bind();
		this.pinkTriangle.display();
		this.scene.popMatrix();

		//Parallelogram

		this.scene.pushMatrix();
		this.scene.translate(0, -2/3*Math.sqrt(8) - 2.03, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.tangramMaterial.apply();
		this.tangramTexture.bind();
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
		this.tangramRedMaterial.apply();
		this.tangramTexture.bind();
		let texCoordsRTS = [
			0.5, 0.7,
			0.5, 0.5,
			0.7, 0.7
		]
		this.redTriangleSmall.updateTexCoords(texCoordsRTS);
		this.redTriangleSmall.display(); 

		this.scene.popMatrix();

		//Lower small Triangle

		this.scene.pushMatrix();
		this.scene.translate(-0.3, -4.2, 0);
		this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
		this.tangramPurpleMaterial.apply();
		this.tangramTexture.bind();
		let texCoordsPUR = [
			0.1, 0.4,
			0, 0.1,
			0.2, 0.2
		]
		this.purpleTriangleSmall.updateTexCoords(texCoordsPUR);
		this.purpleTriangleSmall.display(); 
		this.scene.popMatrix();

		//Upper big Triangle

		this.scene.pushMatrix();
		this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0);
		this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
		this.tangramMaterial.apply();
		this.tangramTexture.bind();
		this.orangeTriangleBig.display(); 
		this.scene.popMatrix();

		//Lower big Triangle

		this.scene.pushMatrix();
		this.scene.translate(Math.sqrt(2), -0.5, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.tangramBlueMaterial.apply();
		this.tangramTexture.bind();
		let texCoords = [
			0.1, 0.0,
			1.0, 0.0,
			0.6, 0.4
		]
		this.blueTriangleBig.updateTexCoords(texCoords);
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