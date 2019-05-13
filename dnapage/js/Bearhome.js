// Code By Xingzhuangzhi 2018
(function (window) {
    var bear, scene, camera, webGLRenderer, pieceGroup, bearBox, bgplane, pointLight1, pointLight2, spotLight; 
    var steps = 0;
    var pieceSpeed = 0.8;
    var pieceNumber = 20;
    var distanceZ = 140;
    var bearScale = 100;
    var EndScale = 160;
    var bearstate = -1;  //-1 Loading, 0-4 Bounce, 5 Head Stay，6 Scroll Head, 7 Wireframe
    var win_w = window.innerWidth;
    var win_h = window.innerHeight;
    var win_t = 0;            //ScrollTop
    var changekey = win_h/2;  //Change to WireFame

    function init() {
        
        document.getElementById("emptyFloor").style.height = win_h*2+"px";
        document.getElementById("aboutMe").style.top = win_h+"px";
        document.getElementById("aboutMe").style.height = win_h+"px";
        document.getElementById("Contacts").style.height = win_h+"px";
        
        window.addEventListener("scroll", pageScroll);
        
        document.getElementById("main").addEventListener("mousemove",function(e){
            if(bearstate == 6) {
                //console.log("HeadMove");
                var mousex = e.clientX;
                var mousey = e.clientY;
                bear.rotation.x = (mousey-win_h/2)*0.001;
                bear.rotation.y = (mousex-win_w/2)*0.001;
            }
        });
        // create a scene, that will hold all our elements such as objects, cameras and lights.

        scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0x000080, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;

        // position and point the camera to the center of the scene
        camera.position.x = -5;
        camera.position.y = 10;
        camera.position.z = 100;
        camera.lookAt(new THREE.Vector3(-5, 10, 0));

        setLight();
        createPlane();
        loadBear();
        //GeneratePieces
        pieceGroup = new THREE.Group();
        scene.add(pieceGroup);

        // call the render function
        //var step = 0;
        // add the output of the renderer to the html element
        document.getElementById('main').appendChild(webGLRenderer.domElement);

        //setTimeout(function(){pieceNumber+=10;},1000);

        render();

    }
    //Init END

    // Load Bear model
    function loadBear() {

        var loader = new THREE.GLTFLoader();
        loader.load( 'models/Bear1017D.gltf', function ( gltf ) {

            bear = gltf.scene;
            bear.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material.side = THREE.DoubleSide;
                }
            } );
            bear.scale.set(1, 1, 1);
            bear.rotation.x = Math.PI*0;
            bear.rotation.y = -Math.PI*0;
            bear.position.set(-6,10,0);
            bear.id = "bearhead";
            bearstate = 0;  //0-1-2-3-4  4为正常
            scene.add( bear );
            console.log(bear);

        }, undefined, function ( e ) {

            console.error( e );

        } );
    }

    // add spotlight for the shadows
    function setLight() {
        spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(-70, 340, 900);
        spotLight.intensity = 1;

        //spotLight.castShadow = true;
        //spotLight.shadowCameraFar = 10000;
        //spotLight.shadowDarkness = 1;
        scene.add(spotLight);

        pointLight1 = new THREE.PointLight("#FFC8C3");
        pointLight1.distance = 120;
        pointLight1.intensity = 0.9;
        pointLight1.position.set(-65,60,70);
        pointLight1.castShadow = true;
        scene.add(pointLight1);

        pointLight2 = new THREE.PointLight("#FFF8E3");
        pointLight2.distance = 150;
        pointLight2.intensity = 0.3;
        pointLight2.position.set(20,-20,20);
        scene.add(pointLight2);

    }
    
    // create the ground plane
    function createPlane() {
        var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
        var planeMaterial = new THREE.MeshPhongMaterial({color: 0xDFB422});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // rotate and position the plane
        plane.rotation.x = 0 * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = -40;

        // add the plane to the scene
        //plane.receiveShadow = true;
        bgplane = plane;
        scene.add(bgplane);
        //console.log(plane.material.color);
    }


    function drawShape(temppiece) {
        // create a basic shape
        var shape = new THREE.Shape();
        // startpoint
        shape.moveTo(0, 0);
        shape.lineTo(temppiece.p1, 0);
        shape.lineTo(temppiece.p2, temppiece.p3);
        shape.lineTo(0, 0);
        return shape;
    }

    function moveShape() {
        var tempobj;
        pieceGroup.traverse( function ( child ) {
            if ( child.isMesh ) {
                if (child.position.z>distanceZ || Math.abs(child.position.x)>distanceZ) {
                    tempobj = child;
                }
                else {
                    child.position.x = child.position.x + child.vx;
                    child.position.y = child.position.y + child.vy;
                    child.position.z = child.position.z + child.vz;
                    child.rotation.x = child.rotation.x+0.008;
                    child.rotation.y= child.rotation.y+0.008;
                }

            }
        } );
        pieceGroup.remove(tempobj);
    }

    function generatePiece() {
        if(bearstate>7) {
            return false;
        }
        var temppiece = {
            p1 : Math.random()*3+5,      //绘制三角的三个坐标
            p2 : Math.random()*3+5,
            p3 : Math.random()*3+5,
            vx : 1-Math.random()*2,       //跑动的方向向量
            vy : 1-Math.random()*2,
            vz : Math.random()*1,
            v : pieceSpeed+Math.random()*0.5,        //跑动的速度
            rx : Math.random()*0.7*Math.PI,  //X轴转动角度
            rx : Math.random()*0.7*Math.PI  //Y轴转动角度
        };

        var piece_geometry = new THREE.ShapeBufferGeometry( drawShape(temppiece) );
        var p_mesh = new THREE.Mesh( piece_geometry, new THREE.LineBasicMaterial( { color: "#fcf77b" } ) );
        p_mesh.vx = temppiece.vx*temppiece.v;
        p_mesh.vy = temppiece.vy*temppiece.v;
        p_mesh.vz = temppiece.vz*temppiece.v;
        p_mesh.rx = temppiece.rx;
        p_mesh.ry = temppiece.ry;
        var gr = 60;
        //console.log(tempr);
        p_mesh.sx = gr*temppiece.vx;
        p_mesh.sy = gr*temppiece.vy;

        //p_mesh.state = 0;
        p_mesh.position.set(p_mesh.sx,p_mesh.sy,-20);
        pieceGroup.add(p_mesh);
    }    

    //Head's Bounce
    function initHead() {
        if(bearstate==0) {
            var tempscale = bear.scale.x+10;
            if(tempscale>150) {
                bearstate++;
            }
            else {
                bear.scale.set(tempscale, tempscale, tempscale);
            }
        }
        if(bearstate==1) {
            var tempscale = bear.scale.x-6;
            if(tempscale<70) {
                bearstate++;
            }
            else {
                bear.scale.set(tempscale, tempscale, tempscale);
            }
        }
        if(bearstate==2) {
            var tempscale = bear.scale.x+8;
            if(tempscale>110) {
                bearstate++;
            }
            else {
                bear.scale.set(tempscale, tempscale, tempscale);
            }
        }
        if(bearstate==3) {
            var tempscale = bear.scale.x-10;
            if(tempscale<90) {
                bearstate++;
            }
            else {
                bear.scale.set(tempscale, tempscale, tempscale);
            }
        }
        if(bearstate==4) {
            var tempscale = bear.scale.x+10;
            if(tempscale>100) {
                bearstate = 5; 
            }
            else {
                bear.scale.set(tempscale, tempscale, tempscale);
            }
        }
    }

    function stayHead() {
        bear.scale.set(100, 100, 100);
        document.getElementById("f1_content").className = "show";
        var tempTimer = setTimeout(function(){
            bearstate = 6;
        },300);
    }
    
    //Change Bear's head
    function changeWire() {
        //spotLight.intensity = 0.5;
        bear.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material.wireframe = true;
                child.material.emissive.r = 0.74;
                child.material.emissive.g = 0.8;
                child.material.emissive.b = 0.91;

            }
        } );
    }
    function changeBack() {
        //spotLight.intensity = 1;
        bear.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material.wireframe = false;
                child.material.emissive.r = 0;
                child.material.emissive.g = 0;
                child.material.emissive.b = 0;
            }
        } );
    }
    
    //Scroll Head Animation
    function headScroll() {
        //-6 10 0
        var rate = win_t/win_h;  //Change to 0-1
        spotLight.intensity = 1 - 0.5*rate;
        bear.position.x = -6-44*rate;
        bear.position.y = 10-11*rate;
        bear.position.z = 0+40*rate;
        bear.rotation.x = 0;
        bear.rotation.y = Math.PI*2.2*rate;
        bear.rotation.z = 0;
        bear.scale.x = 100-10*rate;
        //223,180,34 to 48 48 51
        var tr = Math.round(223 - 175*rate);
        var tg = Math.round(180 - 132*rate);
        var tb = Math.round(34 + 17*rate);
        var tempcolor = new THREE.Color("rgb("+tr+", "+tg+", "+tb+")");
        bgplane.material.color = tempcolor;
        
    }
    
    //Page Scroll
    function pageScroll() {
        win_t = document.body.scrollTop+document.documentElement.scrollTop;
        //console.log(win_t);
        if(win_t == 0){
            stayHead();
        }
        if(win_t>0 && win_t<changekey) {
            if(bearstate == 8) {
                changeBack();
                bearstate = 7;
            }
            headScroll();
            bearstate = 7;
        }
        else if(win_t>changekey && win_t<win_h) {
            if(bearstate == 7) {
                changeWire();
                document.getElementById("f1_content").className = "";
            }
            if(bearstate == 9) {
                document.getElementById("main").style.position = "fixed";
                document.getElementById("main").style.top = 0;
            }
            headScroll();
            bearstate = 8;
        }
        else if(win_t > win_h && win_t < win_h+200) {
            if(bearstate == 8) {
                document.getElementById("main").style.position = "absolute";
                document.getElementById("main").style.top = win_h+"px";   
            }
            bearstate = 9;
            document.getElementById("Details").className = "";
        }
        else if(win_t > win_h+200 && win_t < win_h+640) {
            bearstate = 10;
            document.getElementById("Details").className = "show";
            document.getElementById("Contacts").className = "";
        }
        else if(win_t > win_h+640) {
            document.getElementById("Contacts").className = "show";
            bearstate = 11;
        }
            
    }
    
    function render() {

        moveShape();
        if(pieceGroup.children.length<pieceNumber) {
            generatePiece();
        }
        if(bearstate < 5) {
            initHead();
        }
        if(bearstate == 5) {
            stayHead();
        }
        if(bearstate == 6) {
            document.body.style.overflow = "auto";
        }

        //console.log(scene.children[5]);

        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
        steps++;
    } 
    
    window.initPage = init;      
    
})(window);