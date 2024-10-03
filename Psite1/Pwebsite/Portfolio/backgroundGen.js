let heightMap = [];
let res = 8;
let thresh = 5;
let t = 0;
let darkBGColour = "#0e2431";
let darkLineColour = "#777";
let lightBGColour = "#e3e3e3";
let lightLineColour = "#333333";
let bgColour = darkBGColour;
let lineColour = lightBGColour;
let currentTheme = 0;

function setup() {
    let canvas = createCanvas(windowWidth, document.getElementById("body").offsetHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    noLoop();
    genHMap();
}

function genHMap(){
  console.log("regening hmap");
  let rand = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  console.log(rand);
  for(let i = 0; i < 1 + width/res; i++){
    heightMap[i] = [];
    for(let j = 0; j < 1 + height/res; j++){
      heightMap[i][j] = noise(i/rand, j/rand)*rand;
    }
  }
}

function draw(){
  console.log("redrawing");
  background(bgColour);
  stroke(lineColour);
  strokeWeight(1);

  // console.log(heightMap[0][1]);

  for(let i = 0; i < 1 + width/res; i++){
    for(let j = 0; j < 1 + height/res; j++){

      if(i < width/res && j < height/res){
        let a = floor(heightMap[i][j]/thresh);
        let b = floor(heightMap[i+1][j]/thresh);
        let c = floor(heightMap[i][j+1]/thresh);
        let d = floor(heightMap[i+1][j+1]/thresh);
        
        let ab = 0;
        let ac = 0;
        let bcx = 0;
        let bcy = 0;
        let bd = 0;
        let cd = 0;
        let height = 0;
        
        if(a != b){
          let contourValue = thresh * max(a,b);
          height =contourValue;
          let diff = abs(heightMap[i][j] - heightMap[i+1][j]) ;
          let add = abs(heightMap[i][j] - contourValue);
          ab = i * res + res * add / diff;
        }
        
        if(a != c){
          let contourValue = thresh * max(a,c);
          height =contourValue;
          
          let diff = abs(heightMap[i][j] - heightMap[i][j+1]) ;
          let add = abs(heightMap[i][j] - contourValue);
          ac = j * res + res * add / diff;
        }
        
        if(c != d){
          let contourValue = thresh * max(c,d);
          height =contourValue;
          
          let diff = abs(heightMap[i][j+1] - heightMap[i+1][j+1]) ;
          let add = abs(heightMap[i][j+1] - contourValue);
          cd = i * res + res * add / diff;
        }
        
        if(b != c){
          let contourValue = thresh * max(b,c);
          height =contourValue;
          
          let diff = abs(heightMap[i+1][j] - heightMap[i][j+1]) ;
          let add = abs(heightMap[i+1][j] - contourValue);
          bcx = (i+1) * res - res * add / diff;
          bcy = j * res + res * add / diff;
        }
        if(b != d){
          let contourValue = thresh * max(b,d);
          height =contourValue;
          
          let diff = abs(heightMap[i+1][j] - heightMap[i+1][j+1]) ;
          let add = abs(heightMap[i+1][j] - contourValue);
          bd = j * res + res * add / diff;
        }

        if(ab){
          if(ac){
            line(ab, j*res, i*res, ac);
          }
          if(bcx || bcy){
            
            line(ab, j*res, bcx, bcy);
          }
        }else if(ac){
          if(bcx || bcy){
            
            line(i*res, ac, bcx, bcy);
          }
        }
        
        if(cd){
          if(bd){
            
            line(cd, (j+1)*res, (i+1)*res, bd);
          }
          if(bcx || bcy){
            
            line(cd, (j+1)*res, bcx, bcy);
          }
        } else if(bd){
          if(bcx || bcy){
            
            line((i+1)*res, bd, bcx, bcy);
          }
        }
      }
    }
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    draw();
}

function changeTheme(){
    if(currentTheme == 0){
        bgColour = lightBGColour;
        lineColour = lightLineColour;
        currentTheme = 1;
    }
    else{
        bgColour = darkBGColour;
        lineColour = darkLineColour;
        currentTheme = 0;
    }
    draw();
}
