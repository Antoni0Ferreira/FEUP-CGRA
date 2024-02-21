import {CGFobject} from '../../lib/CGF.js';

/**
 * MyNestSide
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y axis 
 */
export class MyNestSide extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initialize NestSide buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
      
        var angle = 2 * Math.PI / this.slices;
        var topRadius = 0.2;  // smaller top radius
        var bottomRadius = 0.3;  // bigger bottom radius
        var height = 0.2;
        var texScale = 3.5; // texture scale factor
      
        // Add vertices for the sides
        for (var i = 0; i < this.slices + 2; i++) {
            var x = Math.cos(angle * i);
            var y = Math.sin(angle * i);
            this.vertices.push(x * bottomRadius, 0, y * bottomRadius);
            this.vertices.push(x * topRadius, height, y * topRadius);
            this.normals.push(x, 0, y);
            this.normals.push(x, 0, y);
            //fix texture coords
            this.texCoords.push(i / this.slices * texScale, 0);
            this.texCoords.push(i / this.slices * texScale, 0.5);
            
        }
        // Add indices for the sides
        for (var i = 0; i < this.slices; i++) {
            this.indices.push(2 + i * 2, 3 + i * 2, 2 + (i + 1) * 2);
            this.indices.push(3 + i * 2, 3 + (i + 1) * 2, 2 + (i + 1) * 2);
            this.indices.push( 2 + (i + 1) * 2, 3 + i * 2, 2 + i * 2);
            this.indices.push(2 + (i + 1) * 2, 3 + (i + 1) * 2, 3 + i * 2);
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}