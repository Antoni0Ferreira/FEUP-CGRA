import {CGFobject, CGFappearance} from '../../lib/CGF.js';
/**
 * MyBirdEgg
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y axis
 * @param stacks - Number of divisions along the Y axis
 * @param texture - Egg texture
 */

export class MyBirdEgg extends CGFobject {
    constructor(scene, slices, stacks, texture) {
        super(scene);
        this.angle = Math.random() * (((Math.PI / 2) - (-Math.PI / 2)) + (-Math.PI / 2) )
        this.xPos = Math.random() * (60 -(-20)) + (-20);
        this.zPos = Math.random() * (60 -(50)) + (50);
        this.texture = texture;
        this.latDivs = stacks * 2;
        this.longDivs = slices;
        this.initBuffers();
        this.initMaterials();
        this.position = [this.xPos, -80.8, this.zPos];
        this.initialPosition = this.position;
        this.targetPosition = [0,0,0];
        this.onNest = false;
        this.captured = false;
        this.dropping = false;
        this.initialTime = 0;
        this.vy = 0;

    }

    /**
     * @method initBuffers
     * Initialize Bird Egg buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.latDivs;
        var thetaInc = (2 * Math.PI) / this.longDivs;
        var latVertices = this.longDivs + 1;

        var elongation = 1.5;


        for (let latNumber = 0; latNumber <= this.latDivs; latNumber++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            theta = 0;
            for (let longNumber = 0; longNumber <= this.longDivs; longNumber++) {

                var x = sinPhi * Math.cos(theta);
                var y = cosPhi;
                var z = sinPhi * Math.sin(-theta);

                if(y >= 0){
                    y = y * elongation;
                }

                this.vertices.push(x, y, z);

                if (latNumber < this.latDivs && longNumber < this.longDivs) {
                    var first = (latNumber * latVertices) + longNumber;
                    var second = first + latVertices;
                    if(this.invert){
                        this.indices.push(first + 1, second, first);
                        this.indices.push(first + 1, second + 1, second);
                    }
                    else {
                        this.indices.push(first, second, first + 1);
                        this.indices.push(second, second + 1, first + 1);
                    }
                }

                this.normals.push(x, y, z);

                this.texCoords.push(longNumber / this.longDivs, latNumber / this.latDivs);

                theta += thetaInc;
            }
            phi += phiInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @method getPosition
     * Get position of the Egg
     * @returns Bird Egg position
     */
    getPosition() {
        return this.position;
    }

    /**
     * @method setPosition
     * Set Bird Egg position
     * @param x - x position
     * @param y - y position
     * @param z - z position
     */
    setPosition(x ,y, z){
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
        this.initialPosition = this.position;
    }

    /**
     * @method drop
     * Function to make the egg drop, in a parabollic fashion, into the nest
     * @param value - Value of the bird egg acceleration 
     */
    drop(value) {
    
        const gravity = 9.8 * value;  // Acceleration due to gravity
        const now = new Date().getTime();  // Current time in seconds
        const t = (now - this.initialTime) / 1000;  // Time since the egg was dropped
    
        // the vertical position and velocity
        this.position[1] -= this.vy * t + (gravity * t * t) / 2;
        this.vy += gravity * t;
    
        // the distance and direction between the current position and target position in all three dimensions
        const dx = this.targetPosition[0] - this.position[0];
        const dy = this.targetPosition[1] - this.position[1];
        const dz = this.targetPosition[2] - this.position[2];
        const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        const direction = [dx/distance, dy/distance, dz/distance];
    
        // the x and z values of the egg
        this.position[0] += direction[0];
        this.position[2] += direction[2];
    
        if (this.position[1] <= this.targetPosition[1]) {
            this.position[1] = this.targetPosition[1];
            this.position[0] = this.targetPosition[0];
            this.position[2] = this.targetPosition[2];
            this.dropping = false;
            this.vy = 0;
        }
    }
    
    /**
     * @method initMaterials
     * Initialize the appearance and textures of the BirdEgg
     */
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setEmission(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.8, 0.8, 0.8, 1);;
        this.material.setShininess(10.0);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    /**
     * @method display
     * Display the Bird Egg
     */
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        if(this.captured){
            this.scene.translate(0, -0.7, 0);
            this.scene.scale(0.4, 0.4, 0.4);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
        }
        else if (this.dropping){
            this.drop(0.1);
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.scale(0.4, 0.4, 0.4);
        }
        else {
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.scale(0.4, 0.4, 0.4);
            this.scene.rotate(this.angle, 1, 0, 0);
        }

        super.display();
        this.scene.popMatrix();
    }
}
