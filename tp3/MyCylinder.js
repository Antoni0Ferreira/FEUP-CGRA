import {CGFobject} from '../lib/CGF.js';
/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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

                var sa1=Math.sin(ang+alphaAng);
                var saa1=Math.sin(ang+alphaAng+alphaAng);
                var ca1=Math.cos(ang+alphaAng);
                var caa1=Math.cos(ang+alphaAng+alphaAng);

                var sa2=Math.sin(ang-alphaAng);
                var saa2=Math.sin(ang);
                var ca2=Math.cos(ang-alphaAng);
                var caa2=Math.cos(ang);  
    
                this.vertices.push(ca,-sa,(j+1)*stackHeight);
                this.vertices.push(ca,-sa,j*stackHeight);
                this.vertices.push(caa,-saa,j*stackHeight);
                this.vertices.push(caa,-saa,(j+1)*stackHeight);
    
                var normal1= [
                    saa-sa,
                    caa-ca,
                    0
                ];

                var normal2 = [
                    saa1-sa1,
                    caa1-ca1,
                    0
                ]

                var normal = [
                    normal1[0]+normal2[0],
                    normal1[1]+normal2[1],
                    normal1[2]+normal2[2]
                ]
    
                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;


                var normal3 = [
                    saa2-sa2,
                    caa2-ca2,
                    0
                ]

                var otherNormal = [
                    normal1[0]+normal3[0],
                    normal1[1]+normal3[1],
                    normal1[2]+normal3[2]
                ]

                // normalization

                var nsize=Math.sqrt(
                    otherNormal[0]*otherNormal[0]+
                    otherNormal[1]*otherNormal[1]+
                    otherNormal[2]*otherNormal[2]
                    );

                otherNormal[0]/=nsize;
                otherNormal[1]/=nsize;
                otherNormal[2]/=nsize;
    
                // push normal once for each vertex of this triangle
                this.normals.push(...otherNormal);
                this.normals.push(...otherNormal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                // create prism indices to create rectangles
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