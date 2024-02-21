import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './primitives/MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);

        this.plane = new MyPlane(scene, 30);

        this.initMaterials(scene);
        this.initShaders(scene);
	}

    /**
     * @method initShaders
     * Initialize the terrain shaders
     * @param scene - Reference to MyScene object 
     */
    initShaders(scene) {
		this.terrainShader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({ terrainMap: 1, offset: 0.2, multiplier: 0.3, terrainAltimetry: 2 });
    }

    /**
     * @method initMaterials
     * Initialize the appearance and textures of the terrain
     * @param {*} scene 
     */
    initMaterials(scene) { 

		this.textureHeightmap = new CGFtexture(scene, "images/heightmap1.jpg");
        this.altimetry = new CGFtexture(scene, "images/altimetry.png");

        this.appearance = new CGFappearance(scene);
        this.appearance.loadTexture("images/terrain.jpg");
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    }

    /**
     * @method display
     * Display the terrain
     */
    display() {
        this.scene.setActiveShader(this.terrainShader);
        this.textureHeightmap.bind(1);
        this.altimetry.bind(2);

        this.scene.pushMatrix();
            this.appearance.apply();
            this.scene.translate(0,-100,0);
            this.scene.scale(400,400,400);
            this.scene.rotate(-Math.PI/2.0,1,0,0);
            this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    
}