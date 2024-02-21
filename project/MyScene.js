import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyBird } from "./bird/MyBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyMovingBird } from "./bird/MyMovingBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyNest } from "./bird/MyNest.js";
import { MyBirdEggs } from "./bird/MyBirdEggs.js";
import { MyTreeGroupPatch } from "./trees/MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./trees/MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(50);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;

    //Initialize MyScene variables
    this.scaleFactor = 1;
    this.acceleration = 0;
    this.speedFactor = 1;
    this.birdHeight = 0    
    this.startTime = Date.now();
    this.amplitude = 0.3;

    //Initialize Textures
    this.enableTextures(true);

    this.earthTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.birdEyes = new CGFtexture(this, "images/bird_eyes.png");
    this.birdNozzle = new CGFtexture(this, "images/bird_bico.png");
    this.birdHead = new CGFtexture(this, "images/bird.png");
    this.birdBody = new CGFtexture(this, "images/bird_body.png");
    this.birdTail = new CGFtexture(this, "images/bird_tail.png");
    this.eggTexture = new CGFtexture(this, "images/egg.png");
    this.nestTexture = new CGFtexture(this, "images/nest.jpg");

    //Initialize Appearance
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.panorama = new MyPanorama(this, this.earthTexture);
    this.bird = new MyBird(this, this.birdHead, this.birdBody, this.birdTail, this.birdEyes, this.birdNozzle);
    this.movingBird = new MyMovingBird(this, this.bird, [20,-70.3,50]);
    this.birdEggs = new MyBirdEggs(this, 200, 50, this.eggTexture);
    this.nest = new MyNest(this, this.nestTexture);
    this.treePatch = new MyTreeGroupPatch(this);
    this.treeRowPatch = new MyTreeRowPatch(this);
    
  /**
   * @method initLights
   * Initialize scene lights
   */
  }
  initLights() {
    this.lights[0].setPosition(30, -55, 75, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(0.2,0.2,0.2,1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(10, -55, 35, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setAmbient(0.2,0.2,0.2,1.0);
    this.lights[1].enable();
    this.lights[1].update();

    this.lights[2].setPosition(30, 30, 35, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setAmbient(0.2,0.2,0.2,1.0);
    this.lights[2].enable();
    this.lights[2].update();

    this.lights[3].setPosition(10, 30, 75, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setAmbient(0.2,0.2,0.2,1.0);
    this.lights[3].enable();
    this.lights[3].update();
  }
  
  /**
   * @method initCameras
   * Initialize scene camera
   */
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(0, -55, 45), //where the camera is
      vec3.fromValues(20,-70.3,50) //the target
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update() {
    this.checkKeys();
    this.movingBird.update((this.speedFactor + this.acceleration));
    this.movingBird.scaleFactor = this.scaleFactor;

    if(this.movingBird.goingDown){
      if(this.movingBird.egg == null){
        const x = this.movingBird.position[0];
        const z = this.movingBird.position[2];
        const y = this.movingBird.position[1];
        this.movingBird.egg = this.birdEggs.getEgg([x,y,z]);
      }
    }
  }

  /**
   * @method checkKeys
   * Function to handle what happens after a key is pressed
   */
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      this.acceleration += 0.1;
      this.movingBird.accelerate(0.1);
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text+=" S ";
      keysPressed=true;
      this.acceleration -= 0.1;
      if(this.acceleration < 1)
        this.acceleration = 0;
      this.movingBird.accelerate(-0.1);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      keysPressed=true;
      this.movingBird.turn(10 * Math.PI / 180);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text+=" D ";
      keysPressed=true;
      this.movingBird.turn(-10 * Math.PI / 180);
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text+=" R ";
      keysPressed=true;
      this.acceleration = 0;
      this.movingBird.reset([20,-70.3,50]);
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      keysPressed = true;

      if(!this.movingBird.goingDown){
        this.movingBird.goingDown = true;
        this.movingBird.clickedPTime = Date.now();
      }
    }

    if (this.gui.isKeyPressed("KeyO")) {
      text += " O ";
      keysPressed = true;
      if(this.movingBird.egg != null){
        this.movingBird.dropEgg(this.nest);
      }
    }

    if (keysPressed)
      console.log(text);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.terrain.display()
    this.popMatrix();

    this.pushMatrix();
    this.translate(this.camera.position[0],this.camera.position[1],this.camera.position[2]);
    this.panorama.display();
    this.popMatrix();

    this.pushMatrix();
    this.movingBird.display();
    this.popMatrix();

    this.pushMatrix();
    this.birdEggs.display();
    this.popMatrix();

    this.pushMatrix();
    this.nest.display();
    this.popMatrix();

    this.pushMatrix();
    this.treePatch.display();
    this.treeRowPatch.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
