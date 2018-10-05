app = {
    holeRows : 5,
    holeColumns : 5,
    moles : [],
    holes : [],
    setup : function(){
        console.log(app);
        // Initialize scene,camera,renderer and lights
        
            // Scene
            app.scene = new THREE.Scene();
            app.width = window.innerWidth;
            app.height = window.innerHeight;

            // Renderer
            app.renderer = new THREE.WebGLRenderer({
                antialias:true,
                canvas:document.getElementById('canvas')
            });
            app.renderer.setSize(app.width,app.height*.8);

            // Camera
            app.camera = new THREE.PerspectiveCamera(45,app.width/app.height*.8,.1,20000);
            app.camera.position.set(0,-70,50);
            app.camera.lookAt(0,-20,0);
            app.scene.add(app.camera);

            // Lights
            app.hemisphereLight = new THREE.HemisphereLight(0xffffff,0x000000);
            app.scene.add(app.hemisphereLight);
            app.pointLight = new THREE.PointLight(0xffff00);
            app.pointLight.position.set(0,0,15);
            app.scene.add(app.pointLight);

        // Create plane
            var geometry = new THREE.PlaneGeometry( 100, 100);
            var material = new THREE.MeshPhongMaterial( {
                color: 0xffffff, 
                side: THREE.DoubleSide,
            });
            app.plane = new THREE.Mesh( geometry, material );
            app.scene.add(app.plane );


        // LoadModel
        // Draw holes
            var circleRadius = 100/Math.max(app.holeColumns+1,app.holeRows+1)/4;
            var geometry = new THREE.CircleGeometry( 
                circleRadius,
                32
            );
            var material = new THREE.MeshPhongMaterial( { color: 0x000033 } );
            var tileInitial = -50+circleRadius*4;
            var tileLength = circleRadius*4;
            for(let i=0;i<app.holeColumns;i++){
               for(let j=0;j<app.holeRows;j++){
                    var hole = new THREE.Mesh(geometry,material);
                    hole.position.set(tileInitial+i*tileLength,tileInitial+j*tileLength,1);
                    console.log(hole.position);
                    app.holes.push(hole);
                    app.scene.add(hole);
               }
            }
        // Render scene
            setTimeout(function(){app.renderer.render(app.scene,app.camera)},300);
    },
    start : function(){
        // Generate random numbers array filled with [timeoutTime,holex,holey,deletionTimeout]
        // Run timeout with last random number
    },
    restart : function(){
        // Delete all moles
        app.mole.deleteAll();

        // Reset points
        app.points.reset();

        //Start game
        app.start()
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
        onClick : function(){
            // Run dead animation
            // On dead animation finish add points and remove
        },
        draw : function(mole,holeX,holeY,deleteTimeout){
            // Draw at coordinates
            // Add raytracer click listener
            // Add delete timeout
        },
        deathAnimation : function(){
            // Rotate on the side
            // Run walk animation, each time slower until stop and remove
        },
        deleteAll : function(){
            // for each mole in moles
                // delete mole
        }
    }
}

document.addEventListener('DOMContentLoaded', app.setup);
