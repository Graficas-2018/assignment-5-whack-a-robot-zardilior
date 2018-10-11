app = {
    holeRows : 5,
    holeColumns : 5,
    molesGroup : new THREE.Group(),
    moles: [],
    holes : [],
    mouse : {},
    stop : true,
    duration:10,
    setup : function(){
        // Initialize scene,camera,renderer and lights
        
            // Scene
            app.scene = new THREE.Scene();
            app.width = window.innerWidth;
            app.height = window.innerHeight*.8;

            app.canvas=document.getElementById('canvas')

            // Renderer
            app.renderer = new THREE.WebGLRenderer({
                antialias:true,
                canvas:app.canvas
            });
            app.renderer.setSize(app.height,app.height);

            // Camera
            app.camera = new THREE.PerspectiveCamera(45,app.height/app.height,.5,20000);
            app.camera.position.set(0,0,130);
            app.camera.lookAt(0,0,0);
            app.scene.add(app.camera);

            // Lights
            app.hemisphereLight = new THREE.HemisphereLight(0xffffff,0x000000);
            app.scene.add(app.hemisphereLight);
            app.pointLight = new THREE.PointLight(0xffff00);
            app.pointLight.position.set(0,0,15);
            app.scene.add(app.pointLight);

        // LoadModel
            var loader = (new THREE.FBXLoader()).load('robot/robot_idle.fbx',function(obj){
                app.fbx = obj;
                app.mole.draw(10,10,0);
                app.mole.draw(-10,-10,0);
                app.fbx.animationMixer["idle"].clipAction( object.animations[ 0 ], app.fbx ).play();

                loader.load( 'robot/robot_atk.fbx', function ( object ) 
                {
                    app.fbx.animationMixer["attack"] = new THREE.AnimationMixer( scene );
                    app.fbx.animationMixer["attack"].clipAction(
                        object.animations[ 0 ], app.fbx ).play();
                } );

                loader.load( 'robot/robot_run.fbx', function ( object ) 
                {
                    app.fbx.animationMixer["run"] = new THREE.AnimationMixer( scene );
                    app.fbx.animationMixer["run"].clipAction(
                        object.animations[ 0 ], app.fbx ).play();
                } );

                loader.load( 'robot/robot_walk.fbx', function ( object ) 
                {
                    app.fbx.animationMixer["walk"] = new THREE.AnimationMixer( scene );
                    app.fbx.animationMixer["walk"].clipAction(
                        object.animations[ 0 ], app.fbx ).play();
                } );
            });            

            app.scene.add(app.molesGroup);
        // Create plane
            var geometry = new THREE.PlaneGeometry( 100, 100);
            var material = new THREE.MeshPhongMaterial( {
                color: 0xffffff, 
                side: THREE.DoubleSide,
            });
            app.plane = new THREE.Mesh( geometry, material );
            app.scene.add(app.plane );

        // Draw holes
            var circleRadius = 100/Math.max(app.holeColumns+1,app.holeRows+1)/4;
            var geometry = new THREE.CircleGeometry( 
                circleRadius,
                32
            );
            var material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
            var tileInitial = -50+circleRadius*4;
            var tileLength = circleRadius*4;
            for(let i=0;i<app.holeColumns;i++){
               for(let j=0;j<app.holeRows;j++){
                    var hole = new THREE.Mesh(geometry,material);
                    hole.position.set(tileInitial+i*tileLength,tileInitial+j*tileLength,1);
                    app.holes.push(hole);
                    app.scene.add(hole);
               }
            }
        
        // Set up the raycaster
            app.raycaster = new THREE.Raycaster();
            canvas.addEventListener('mousedown', app.onMouseDown);

        // Render scene

        // Buttons and text
            app.points.text = document.getElementById("pointsText");
            app.startButton = document.getElementById("startButton");
            app.startButton.addEventListener("click",app.start);

        setTimeout(function(){app.renderer.render(app.scene,app.camera)},300);
    },
    start : function(){
        // Generate random numbers array filled with [timeoutTime,holex,holey,deletionTimeout]
        // Run timeout with last random number
        alert("start");
        app.stop = false;
        app.run();
    },
    restart : function(){
        // Delete all moles
        app.mole.deleteAll();

        // Reset points
        app.points.reset();

        //Start game
        app.start()
    },
    run : function(){
        // Animate all moles
        app.moles.children.map((x)=>x.animate());

        // Update the animations
        KF.update();

        // Render the scene
        app.renderer.render( app.scene, app.camera );

        var req = requestAnimationFrame(app.run);
        if( app.stop )
            cancelAnimationFrame(req);
    },
    points : {
        value : 0,
        text : null,
        add : function(x){
            // Add to points variable
            this.value+=x;
            // Draw points
            this.draw();
        },
        reset : function(){
            // set points to 0
            this.value=0;
            // Draw points
            this.draw();
        },
        draw : function(){
            // text element draw
            this.text.textContent = this.value;
        }
    },
    mole : {
        construct : function(holeX,holeY,deleteTimeout){
            this.model = cloneFbx(app.fbx);
            this.model.position.set(holeX,holeY,0);
            this.model.rotation.set(Math.PI/3,0,0);
            this.model.scale.set(.02,.02,.02);
            this.model.name = app.moles.length;
            this.deathAnimate = new KF.KeyFrameAnimator;
            this.deathAnimate.init({
                interps:[{
                    keys:[0,1], 
                    values:[0,Math.PI/2],
                    target:this.model.rotation.x
                }],
                loop:false,
                duration:app.duration*1000,
                easing:TWEEN.Easing.Cubic.Out,
            });
        },
        onClick : function(mole){
            // Run dead animation
            console.log(mole);
            var obj = app.moles[mole.name];
            console.log(obj);
            obj.deathAnimate.play();
            // On dead animation finish add points and remove
            setTimeout(function(){
                app.moleGroup.remove(obj);
            },duration*1000);
        },
        draw : function(holeX,holeY,deleteTimeout){
            // Draw at coordinates
            var mole = new app.mole.construct(holeX,holeY,deleteTimeout);
            app.molesGroup.add(mole.model);
            app.moles.push(mole)
            setTimeout(function(){app.renderer.render(app.scene,app.camera)},300);

            // Add default animation
            /* mole.mixer = app.fbx.mixer.clone();
            mole.animate = app.mole.animate(mole);
            mole.animation = "idle"; */

            // Add delete timeout
            setTimeout(function(){app.renderer.render(app.scene,app.camera)},300);
        },
        animate : function(mole){
            currentTime = Date.now();
            return function(){ 
                var now = Date.now();
                var deltat = now - currentTime;
                currentTime = now;

                if(mole && mole.mixer[mole.animation])
                {
                    mole.mixer[mole.animation].update(deltat * 0.001);
                }
            }
        },
        deathAnimation : function(){
            // Rotate on the side
            // Run walk animation, each time slower until stop and remove
        },
        deleteAll : function(){
            // for each mole in moles
                // delete mole
        }
    },
    onMouseDown : function(){
        event.preventDefault();
        app.mouse.x = event.clientX - canvas.offsetLeft; 
        app.mouse.y = event.clientY - canvas.offsetTop;
        app.mouse.x /= app.height;
        app.mouse.y /= app.height;
        app.mouse.x *= 2;
        app.mouse.y *= 2;
        app.mouse.x -= 1;
        app.mouse.y -= 1;
        app.mouse.y *=  -1;
        app.raycaster.setFromCamera( app.mouse, app.camera );
        var intersects = app.raycaster.intersectObjects( app.molesGroup.children ,true);
        if(intersects[0]){
           console.log(intersects[0].object.parent)
           app.mole.onClick(intersects[0].object.parent);
        }
        /*app.scene.add(
            new THREE.ArrowHelper( 
                app.raycaster.ray.direction,
                app.raycaster.ray.origin,
                100,
                Math.random() * 0xffffff 
            )
        );*/
        setTimeout(function(){app.renderer.render(app.scene,app.camera)},300);
    }
}

document.addEventListener('DOMContentLoaded', app.setup);
