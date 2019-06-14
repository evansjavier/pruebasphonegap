<template>
    <div>
        <canvas ref="canvas" class="mx-auto d-block" id="firma" width="320" height="180" style='border: 2px solid black; max-width: 100%;'></canvas>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                context: null,
                clickX: [],
                clickY: [],
                clickDrag: [],
                painting: null,
            }
        },
        computed: {
            canvas: function(){
                return this.$refs['canvas'];
            },
            hasSign: function(){
                return this.clickX.length > 0;
            }
        },
        mounted(){
            let vm = this;
            this.context = this.canvas.getContext('2d');
          
            $(this.canvas)
            .on('mousedown touchstart', function(e){
              vm.painting = true;
              let x = e.pageX - $(this).offset().left;
              let y = e.pageY - $(this).offset().top;
              
              vm.addClick(x, y);
              vm.draw();
             })
            .on('mouseleave mouseup touchend touchleave', function(){
                vm.painting = false; 
            })
            .on('mousemove touchmove', function(e){
              e.preventDefault();
              
              let deltaX = e.pageX || e.originalEvent.touches[0].pageX;
              let deltaY = e.pageY || e.originalEvent.touches[0].pageY;
              
              if(vm.painting) {
                  let x = deltaX - $(this).offset().left;
                  let y = deltaY - $(this).offset().top;
                  
                  vm.addClick(x, y, true);
                  vm.draw();
              }
             });
          
        },
        beforeDestroy(){
          $(this.canvas).off();  
        },
        methods: {
            addClick: function(x, y, dragging) {
              if(x < 0)  x = y = NaN;
              
              this.clickX.push(x);
              this.clickY.push(y);
              this.clickDrag.push(dragging);
            },
            draw: function() {
              // Empty the canvas
              this.clearCanvas();
              this.context.strokeStyle = "#111";
              this.context.lineJoin = "round";
              this.context.lineWidth = this.canvas.getAttribute('height') * 0.0085;
              
              for(let i = 0; i < this.clickX.length; i++) {
                  // Begin the path
                  this.context.beginPath();
                  
                  if(this.clickDrag[i] && i) {
                      this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
                  }
                  else {
                      this.context.moveTo( Math.abs(this.clickX[i] - 1), Math.abs(this.clickY[i]) );
                  }
                  
                  this.context.lineTo(this.clickX[i], this.clickY[i]);
                  
                  this.context.closePath();
                  
                  this.context.stroke();
              }
             },
            clearCanvas: function() {
                this.context.clearRect(0, 0, $(this.canvas).outerWidth() * 1.5 , $(this.canvas).outerHeight() * 1.5);
            },
            eraseCanvas: function() {
                this.clearCanvas();
                this.clickX = [];
                this.clickY = [];
                this.clickDrag = [];
            },
            calibrateCanvas: function() {
                let beforeHeight = this.canvas.getAttribute('height');
                      
                this.canvas.setAttribute('height', $(this.canvas).innerHeight());
                this.canvas.setAttribute('width', $(this.canvas).innerWidth());
                this.context = this.canvas.getContext('2d');
                  
                let deltaH = this.canvas.getAttribute('height') / beforeHeight;
                  
                for(let i = 0; i < clickX.length; i++) {
                    this.clickX[i] = this.clickX[i] * (deltaH);
                    this.clickY[i] = this.clickY[i] * (deltaH);
                }
                
                this.draw();
            }
        }
    }

</script>