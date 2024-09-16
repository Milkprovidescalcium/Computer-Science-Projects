//? Design a program that will move a character/object 
//? around the screen and get it to find the quickest path around 
//? a minimum of 3 obstacles.


 //wow, you can declare multiple variables with one "let"! that's cool
 let x = 0,
 y = 0,
 dirX = 1,
 dirY = 1;
let speed = 3;

const player = document.getElementById('roomba')
const playerHeight = player.clientHeight; //okay guys, I don't really know what clientHeight and clientWidth are, 
const playerWidth = player.clientWidth;   //from my understanding, its the width of the element in pixels including padding, but NOT the border and margin?

const box = document.getElementById('containerContainer')
const boxWidth = box.clientWidth;
const boxHeight = box.clientHeight;

const spawn = document.getElementById('spawnArea')
const spawnWidth = spawn.clientWidth;
const spawnHeight = spawn.clientHeight;

const spawnRect = spawn.getBoundingClientRect();
const containerRect = box.getBoundingClientRect();

function randomDirection(){
 return (Math.random() * 0.4 - 0.2); //small variety in direction, so the roomba doesnt just go back and forth every time
}


let obstaclesArray = []


//PLACING OBSTACLES--------------------------------------------------------------
let obstacleCount = 0;
for(let i = 0; i < 4; i++){

 let randX = Math.floor(Math.random()*(spawnWidth - 89)) //minusing 89 to adjust for the width of the obstacle, which I had to find through an aspect-ratio calculator since past me was stupid and tried to try new things
 let randY = Math.floor(Math.random()*(spawnHeight - 89))
 const div = document.createElement("div");
//  console.log(spawnHeight)
//  console.log(spawnWidth)
 
 div.className = 'obstacle';
 div.id = 'obstacle' + obstacleCount
 // div.id = obstacleCount;
 box.appendChild(div)
 div.style.left = (spawnRect.left - containerRect.left + randX) + 'px'; //Using the gbcr lefts ro adjust some stuff I do not understand about container offsets 
 div.style.top = (spawnRect.top - containerRect.top + randY) + 'px';
 obstaclesArray.push(div)
 obstacleCount++;
}
//PLACING OBSTACLES--------------------------------------------------------------
//PLACING JUNK-------------------------------------------------------------------

let junkCount = 0;
for(let i = 0; i < 3; i++){

 let randX = Math.floor(Math.random()*spawnWidth)
 let randY = Math.floor(Math.random()*spawnHeight)
 const div = document.createElement("div");
 
 div.className = 'junk';
 div.id = junkCount;
 box.appendChild(div)
 div.style.left = (spawnRect.left - containerRect.left + randX) + 'px';
 div.style.top = (spawnRect.top - containerRect.top + randY) + 'px';
 junkCount++;
}
//PLACING JUNK-------------------------------------------------------------------



let count = 0;
document.getElementById('startButton').addEventListener('click',()=>{






});

let direction = ' '
//ROAM STATE---------------------------------------------------------------------
function roamState(){
 speed = 2;
 count++;
 if(x+playerWidth >= boxWidth || x < 0){ //horizontal check
     dirX *= -1; //reverse direction!
 }
 if(y+playerHeight >= boxHeight || y < 0){ //vertical check
     dirY *= -1;
 }
    if(dirX < 0 && dirY > 0){
        direction = 'SW'
    }
    else if(dirX > 0 && dirY > 0){
        direction = 'SE'
    }
    else if(dirX < 0 && dirY < 0){
        direction = 'NW'
    }
    else if(dirX > 0 && dirY < 0){
        direction = 'NE'
    }else{
        direction = ' '
    }

// console.log('dirX: ' + dirX)
// console.log('dirY: ' + dirY)

 for(let i = 0; i < obstaclesArray.length;i++){
    // console.log(obstaclesArray[i])
    if(isCollide(player, obstaclesArray[i])){
        // console.log('collided with box')
    
        switch (direction){
            case 'SW':
                dirX *= -1;
            break;
            case 'SE':
                dirY *= -1;
            break;
            case 'NW':
                dirY *= -1;
            break;
            case 'NE':
                dirX *= -1;
            break;
            default:
                console.log('no collision')
        }
    }
 }


 x+=dirX * speed;
 y+=dirY * speed;
 player.style.left = x + 'px'
 player.style.top = y + 'px'
 requestAnimationFrame(roamState); //keep calling it. I heard this is called "recursion"
}
//ROAM STATE---------------------------------------------------------------------

let coordinates = {
 x: [],
 y: []
}

function findPoint(){
 for (let i = 0; i<3; i++){
     let junk = document.getElementById(parseInt(i))
     coordinates.x.push(parseInt(junk.style.left))
     coordinates.y.push(parseInt(junk.style.top))
 }
}
findPoint()
//! problem, when the roomba is moving, the x and y values are MISMATCHED, since I yknow, tried to sort them
//* solution!: find the nearest junk by using the distance formula (thanks physics) to find the nearest 'junk'!
console.log('x values: ' + coordinates.x)
console.log('y values: '+ coordinates.y)


let posX = 0;
let posY = 0;



let targets = junkCount;
let visitedJunk = []; 
function findNearest(){
 let nearestIndex = -1 //have to adjust for arrays starting at 0, Could also modify forloop if I wanted
 let minDistance = 999999999;
 for(let i = 0; i< coordinates.x.length; i++){
     if (visitedJunk.includes(i)) continue; //skip if the roomba has already collected the junk
     let junkx = coordinates.x[i]
     let junky = coordinates.y[i]
 
     //using the distance formula to calculate distance between box and all the junks
     let distance = Math.pow(junkx - player.offsetLeft , 2) + Math.pow(junky - player.offsetTop, 2)

     //if the 'new' distance is lower the minimum distance, make the new minimum distance the lower one. The first distance will always be default the lowest, since the min value is like a bajillion
     if(distance < minDistance){
         minDistance = distance
         nearestIndex = i; //the newest index, gonna use this for the arrays
     }
 }
     return{
         x:coordinates.x[nearestIndex],
         y:coordinates.y[nearestIndex],
         index: nearestIndex
     };
}
findNearest()
let nearestPoint = findNearest(); //wow, calling the function to extract the variables returned
let goalX = nearestPoint.x
let goalY = nearestPoint.y


let angle =  Math.atan2(goalY - posY, goalX - posX) //calculating angle (copied off of stackOverflow)


let deltaX = speed* Math.cos(angle) //I guess this calculated the angle? 
let deltaY = speed* Math.sin(angle)


function isCollide(a, b) {//OMG A REUSABLE COLLIDE FUNCTION WHY DIDN'T I THINK OF THIS LAST YEAR
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    
    return !( //revamped collision code copied from stackOverflow
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    );//this is like, a bool return type? It returns a boolean based on the condition (which is the collision logic in this case)
}

let arrayCount = 1;
let temp;
function update(){

 temp = document.getElementById(nearestPoint.index)

 if(isCollide(player, temp)){

     visitedJunk.push(nearestPoint.index);
     temp = document.getElementById(nearestPoint.index)
     // console.log(visitedJunk)
     temp.style.display = "none" 
     targets--;
     // console.log('done')
     if (targets > 0) {
         nearestPoint = findNearest();
         if (nearestPoint) { //this if-statment checks if there is a nearest point(if 'nearestPoint' is not null of undefined)
             goalX = nearestPoint.x;
             goalY = nearestPoint.y;
             angle = Math.atan2(goalY - posY, goalX - posX);
             deltaX = speed * Math.cos(angle);
             deltaY = speed * Math.sin(angle);
 
         }
     } else {

     

         x = posX;
         y = posY;

        cancelAnimationFrame(update);

        requestAnimationFrame(roamState);

       
         return{
             currentX:player.offsetLeft + player.offsetWidth,
             currentY:player.offsetTop + player.offsetHeight
         }
     }

 }else{
     posX += deltaX
     posY += deltaY
 
 }
// console.log('delta x '+deltaX)
// console.log('delta y '+deltaY)

 for(let i = 0; i < obstaclesArray.length;i++){
    // console.log(obstaclesArray[i])
    if(isCollide(player, obstaclesArray[i])){
        // console.log('collided with box')

        posX -= deltaX
        posY -= deltaY
        trace(obstaclesArray[i])
    }
 }
 player.style.left = posX + 'px'
 player.style.top = posY + 'px'

 requestAnimationFrame(update)
}

update()

let currentPlayerX = update.currentX
let currentPlayerY = update.currentY




function detectCollisionDirection(obj1, obj2) {
    const bounds1 = obj1.getBounds();
    const bounds2 = obj2.getBounds();
    
    // Calculate the overlap distances
    const overlapX = Math.min(bounds1.right - bounds2.left, bounds2.right - bounds1.left);
    const overlapY = Math.min(bounds1.bottom - bounds2.top, bounds2.bottom - bounds1.top);

    // Determine the direction of the collision
    if (overlapX < overlapY) {
        // Horizontal collision
        if (obj1.x + obj1.width / 2 < obj2.x + obj2.width / 2) {
            return 'left';
        } else {
            return 'right';
        }
    } else {
        // Vertical collision
        if (obj1.y + obj1.height / 2 < obj2.y + obj2.height / 2) {
            return 'top';
        } else {
            return 'bottom';
        }
    }
}



function trace(obstacle){
//!NOT WORKING---------------------------
    //?negative x = moving left
    //?negative y = moving up
    //?positive x = moving right
    //?position y = moving down 

    if(deltaX < 0 && deltaY > 0){
        direction = 'SW'
        deltaX *= -1
    }
    else if(deltaX > 0 && deltaY > 0){
        direction = 'SE'
        deltaX *= -1
    }
    else if(deltaX < 0 && deltaY < 0){
        direction = 'NW'
        deltaX *= -1
    }
    else if(deltaX > 0 && deltaY < 0){
        direction = 'NE'
        deltaX *= -1
    }else{
        direction = ' '
    }

    // console.log('collided')
    let obstacleWidth = obstacle.offsetWidth
    let obstacleHeight = obstacle.offsetHeight
    // console.log('width ' + obstacleWidth)
    // console.log('height ' + obstacleHeight)
}

//TODO: Make 'pathfinding' by, first detecting collision and then tracing around the object based on it's direction