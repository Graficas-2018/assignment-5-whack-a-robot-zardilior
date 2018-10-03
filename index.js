app = {
    holeRows : 5,
    holeColumns : 5,
    moles : [],
    setup : function(){
        // Initialize canvas
        // Initialize scene,camera and renderer
        // LoadModel
        // Draw holes
    },
    start : function(){
        // Generate random numbers array filled with [timeoutTime,holex,holey,deletionTimeout]
        // Run timeout with last random number
    },
    restart : function(){
        // Delete all moles
        this.mole.deleteAll();

        // Reset points
        this.points.reset();

        //Start game
        this.start()
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
        }
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
        }
        deleteAll : function(){
            // for each mole in moles
                // delete mole
        }
    }
}
document.on('DOMContentLoaded', function(){
    app.setup();    
});
