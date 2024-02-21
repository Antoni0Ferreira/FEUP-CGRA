import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

        var stackHeight = 1/this.stacks;
        for(var j = 0; j < this.stacks; j++){
            var ang = 0;
            var alphaAng = 2*Math.PI/this.slices;
            for(var i = 0; i < this.slices; i++){

                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);
    
                this.vertices.push(ca,-sa,(j+1)*stackHeight);
                this.vertices.push(ca,-sa,j*stackHeight);
                this.vertices.push(caa,-saa,j*stackHeight);
                this.vertices.push(caa,-saa,(j+1)*stackHeight);
    
                var normal= [
                    saa-sa,
                    caa-ca,
                    0
                ];
    
                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;
    
                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                // create prism indices
                this.indices.push( 4*i + 4*j*this.slices + 2, 4*i + 4*j*this.slices + 1, 4*i + 4*j*this.slices);
                this.indices.push(4*i + 4*j*this.slices + 3, 4*i + 4*j*this.slices + 2,4*i + 4*j*this.slices );
    
                ang+=alphaAng;
            }
        }
        		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	/**
	 * Called when user interacts with GUI to change object's complexity.
	 * @param {integer} complexity - changes number of slices
	 */
		updateBuffers(complexity){
			this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

			// reinitialize buffers
			this.initBuffers();
			this.initNormalVizBuffers();
		}
}

