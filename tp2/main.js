
import {CGFapplication} from '../lib/CGF.js';
import { MyScene } from './MyScene.js';
import { MyInterface } from './MyInterface.js';

function main()
{
    var app = new CGFapplication(document.body);
    var myScene = new MyScene(); //elementos da cena (camara, luzes, objetos...)
    var myInterface = new MyInterface(); //o que permite o user interagir com os conteúdos (controlo de camara...)

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

    app.run();
}

main();