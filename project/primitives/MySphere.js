import {CGFobject} from '../../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y axis
 * @param stacks - Number of divisions along the Y axis
 * @param invert - If the sphere is inverted or not
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, invert) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;
        this.invert = invert;
        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the Sphere buffers
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

        for (let latNumber = 0; latNumber <= this.latDivs; latNumber++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            theta = 0;
            for (let longNumber = 0; longNumber <= this.longDivs; longNumber++) {
                
                // vertices
                var x = sinPhi * Math.cos(theta);
                var y = cosPhi;
                var z = sinPhi * Math.sin(-theta);
                this.vertices.push(x, y, z);


                if (latNumber < this.latDivs && longNumber < this.longDivs) {
                    var first = (latNumber * latVertices) + longNumber;
                    var second = first + latVertices;

                    // normals & indices
                    if(this.invert){
                        this.indices.push(first + 1, second, first);
                        this.indices.push(first + 1, second + 1, second);
                        this.normals.push(-x,-y,-z);
                    }
                    else {
                        this.indices.push(first, second, first + 1);
                        this.indices.push(second, second + 1, first + 1);
                        this.normals.push(x, y, z);
                    }
                }

                // texCoords
                this.texCoords.push(longNumber / this.longDivs, latNumber / this.latDivs);

                theta += thetaInc;
            }
            phi += phiInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}