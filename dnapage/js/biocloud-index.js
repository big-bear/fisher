// JavaScript Document
    var renderer, camera, scene, gui;

    var light;
    var state = 0;
    var steps = 0;
    var dna;
    var tempgroup = new THREE.Group();
    var group = new THREE.Group();
    var group_dna = new THREE.Group();
    var cube1, cube2, cube3;

    function initRender() {

        renderer = new THREE.WebGLRenderer({antialias:true});

        renderer.setSize(window.innerWidth, window.innerHeight);

        //告诉渲染器需要阴影效果

        renderer.setClearColor(0x000000);

        //document.body.appendChild(renderer.domElement);
        document.getElementById("s1Bg").appendChild(renderer.domElement);

    }

    function initCamera() {

        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

        camera.position.set(0, 20, 25);

        camera.lookAt(new THREE.Vector3(0,0,0));

    }

    function initScene() {

        scene = new THREE.Scene();

    }

    function initLight() {

        scene.add(new THREE.AmbientLight(0xcccccc));

 
        light = new THREE.PointLight(0xffffff);

        light.position.set(0,50,50);


        //告诉平行光需要开启阴影投射

        light.castShadow = true;


        scene.add(light);

    }

    function initModel() {

        //辅助工具

        var helper = new THREE.AxesHelper(50);

        //scene.add(helper);

        initPlane();
        
        initDna();
        
        initCornercube();

    }

    var par_material;
    
    function initDna() {
        
        var loader = new THREE.GLTFLoader();

        loader.load("models/DNA-0429-D.gltf", function (geotest) {
            
            state = state+0.5;

            //创建纹理

            par_material = new THREE.PointsMaterial({

                color: 0xffffff,

                size: 0.5,

                opacity: 0.6,

                transparent: true,

                blending: THREE.AdditiveBlending,

                depthTest: false,

                map: generateSprite()

            }); 
            
            var geometry = new THREE.Geometry();
            geotest = geotest.scene;
            console.log(geotest);
            geotest.traverse( function ( child ) {
                if ( child.isMesh ) {
                    //console.log(child.geometry);
                    var mesh = new THREE.Points(child.geometry, par_material);
                    tempgroup.add( mesh );
                }
            } );
            
            tempgroup.rotation.x = 0; //将模型摆正

            tempgroup.scale.set(7, 7, 7); //缩放
            
            //tempgroup.position.set(3,6,0);
            
            group.name = "dnaModels";
            
            group.add(tempgroup);
            
            const box = new THREE.Box3().setFromObject(group);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            group_dna.add(group);
            group_dna.rotation.set(-Math.PI*0.1,0,-Math.PI*0.15);
            //group_dna.rotation.set(-Math.PI*0.22,0,0);
            group_dna.position.set(14,-3,0);
            //group_dna.position.set(-22,-1,0);
            
            scene.add( group_dna );
            
        });
    }
    
    var group_cube1 = new THREE.Group();
    var group_cube2 = new THREE.Group();
    var group_cube3 = new THREE.Group();
    var group_cube4 = new THREE.Group();

    function initCornercube() {
        var loader = new THREE.GLTFLoader();

        loader.load("models/Corner-cube-0505-A.gltf", function (geo) {
            
            state = state+0.5;
            
            cube1 = geo.scene;
            
            group_cube1.add(cube1);
            group_cube1.scale.set(5, 5, 5); 
            group_cube1.position.set(6, 10, 10); 
            //group_cube1.position.set(10, 11, 10); 
            group_cube1.rotation.z = Math.PI*0.25;
            cube1.name = "cube1";
            scene.add( group_cube1 );
            
            cube2 = cube1.clone();
            
            group_cube2.add(cube2);
            group_cube2.scale.set(6, 4, 4); 
            group_cube2.position.set(21, -3, 0); 
            group_cube2.rotation.z = -Math.PI*0.2;
            cube2.name = "cube2";
            scene.add( group_cube2 );
            
            
            cube3 = cube1.clone();
            
            group_cube3.add(cube3);
            group_cube3.scale.set(12, 12, 12); 
            group_cube3.position.set(16.6, -5, 7); 
            group_cube3.rotation.z = Math.PI*0.3;
            cube3.name = "cube3";
            scene.add( group_cube3 );
            
            
            cube4 = cube1.clone();
            
            group_cube4.add(cube4);
            group_cube4.scale.set(1.5, 1.5, 1.5);
            //group_cube4.position.set(7.2, 13, 7); 
            group_cube4.position.set(7.4, 13, 7); 
            group_cube4.rotation.z = Math.PI*0.3;
            cube3.name = "cube4";
            scene.add( group_cube4 );
             
        });
    }
    
    //使用canvas生成粒子的纹理

    function generateSprite() {
        
        var canvas, context, gradient, texture;

 

        canvas = document.createElement('canvas');

        canvas.width = 16;

        canvas.height = 16;

 

        context = canvas.getContext('2d');

        gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

        gradient.addColorStop(0, 'rgba(255,255,255,1)');

        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');

        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');

        gradient.addColorStop(1, 'rgba(0,0,0,1)');

 

        context.fillStyle = gradient;

        context.fillRect(0, 0, canvas.width, canvas.height);

 

        texture = new THREE.Texture(canvas);

        texture.needsUpdate = true;

        return texture;


    }

 

    //初始化性能插件

    var stats;

    function initStats() {

        stats = new Stats();

        //document.body.appendChild(stats.dom);

    }

 
    function initPlane() {
        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(600, 300);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0x1a1f23});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.2 * Math.PI;
        plane.position.x = 0;
        plane.position.y = -20;
        plane.position.z = -10;

        // add the plane to the scene
        scene.add(plane);
    }



    function render() {


        renderer.render( scene, camera );

    }

 

    //窗口变动触发的函数

    function onWindowResize() {
 

        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        render();

        renderer.setSize( window.innerWidth, window.innerHeight );


    }

 
    //WebGL动画执行函数
    function animate() {

        render();

        if(state < 4 && state >= 1) {
            steps++;
            group.rotation.y = -Math.PI*steps*0.02; //将模型摆正
            cube1.rotation.y = -Math.PI*steps*0.005;
            cube2.rotation.y = -Math.PI*steps*0.005;
            cube3.rotation.y = -Math.PI*steps*0.003;
            cube4.rotation.y = -Math.PI*steps*0.003; 
        }
        requestAnimationFrame(animate);

    }

    //各个楼层元素尺寸初始化
    function initStyle() {
        $("#s1").height(window.innerHeight);
        $("#s2").height(window.innerHeight);
        $("#s3").height(window.innerHeight);
        $("#s4").height(window.innerHeight);
        $("#s5").height(window.innerHeight);
        $("#s2").css("margin-top",window.innerHeight*1.2);
        var light_scale = window.innerHeight/928;
        var light_w = 206*light_scale;
        var light_h = 104*light_scale;
        var light_r = 455*light_scale;
        var light_t = 204*light_scale;
        $("#pcLighting").css({"width":light_w,"height":light_h,"top":light_t,"right":light_r});
    }
 
    //页面滚动时，判断执行动画
    function scrollPage(){
        
        var temptop = $(document).scrollTop();
        if(state>0 && temptop<20){
            state = 1;
        }
        if(temptop>20&&temptop<window.innerHeight){
            state = 2;
        }
        if(temptop>window.innerHeight&&temptop<window.innerHeight*2.2) {
            state = 3;
        }
        if(temptop>window.innerHeight*2.2&&temptop<window.innerHeight*3.2) {
            state = 4;
            $("#s1").show();
        }
        if(temptop>window.innerHeight*3.2) {
            state = 5;
            $("#s1").hide();
        }

        switch(state)
        {
            case 1:
                $("#s1").removeClass("txtfade");
                break;
            case 2:
                console.log("state1");
                $("#s1").addClass("txtfade");
                var scroll_proc = temptop/window.innerHeight;

                var dna_x = 14+(-22-14)*scroll_proc;
                var dna_y = -3+(-1+3)*scroll_proc;
                var dna_rx = 0.1+0.12*scroll_proc;
                var dna_rz = -0.15+0.15*scroll_proc;
                group_dna.rotation.set(-Math.PI*dna_rx,0,Math.PI*dna_rz);
                group_dna.position.set(dna_x,dna_y,0);

                var cube1_x = 6+4*scroll_proc;
                var cube1_y = 10+1*scroll_proc;
                group_cube1.position.set(cube1_x, cube1_y, 10); 

                var cube4_x = 7.2+4.8*scroll_proc;
                group_cube4.position.set(cube4_x, 13, 7); 


                break;
            case 3:
                console.log("state2");
                //group_dna.rotation.set(-Math.PI*0.22,0,0);
                break;
        }      
    }

    function draw() {

        initStyle();
        
        initRender();

        initScene();

        initCamera();

        initLight();

        initModel();

        animate();

        window.onresize = onWindowResize;
        
        $(document).bind("scroll",scrollPage);

    }
$(function(){
    draw();
});