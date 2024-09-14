//? Design a program that will move a character/object 
//? around the screen and get it to find the quickest path around 
//? a minimum of 3 obstacles.


let x = 0, //wow, you can declare multiple variables with one "let"! that's cool
 y =0,
 dirX = 1,
 dirY = 1;
const speed = 5;

const player = document.getElementById('roomba')
const playerHeight = player.clientHeight; //okay guys, I don't really know what clientHeight and clientWidth are, 
const playerWidth = player.clientWidth;   //from my understanding, its the width of the element in pixels including padding, but NOT the border and margin?

const box = document.getElementById('containerContainer')
const boxWidth = box.clientWidth;
const boxHeight = box.clientHeight;

function randomDirection(){
    return (Math.random() * 0.4 - 0.2); //small variety in direction, so the roomba doesnt just go back and forth every time
}






//PLACING OBSTACLES--------------------------------------------------------------
let obstacleCount = 0;
for(let i = 0; i < 4; i++){
    obstacleCount++;
    let randX = Math.floor(Math.random()*boxWidth)
    let randY = Math.floor(Math.random()*boxHeight)
    const div = document.createElement("div");
    
    div.className = 'obstacle';
    // div.id = obstacleCount;
    box.appendChild(div)
    div.style.left = randY + 'px';
    div.style.top = randX + 'px';
}
//PLACING OBSTACLES--------------------------------------------------------------
//PLACING JUNK-------------------------------------------------------------------

let junkCount = 0;
for(let i = 0; i < 3; i++){
    junkCount++;
    let randX = Math.floor(Math.random()*boxWidth)
    let randY = Math.floor(Math.random()*boxHeight)
    const div = document.createElement("div");
    
    div.className = 'junk';
    div.id = junkCount;
    box.appendChild(div)
    div.style.left = randY + 'px';
    div.style.top = randX + 'px';
}
//PLACING JUNK-------------------------------------------------------------------
















let count = 0;
document.getElementById('startButton').addEventListener('click',()=>{

//SEARCHSTATE--------------------------------------------------------------------
//TODO: find how far the junk is from the roomba, and then make the roomba go to the junk with the least distance  beteween them

//SEARCHSTATE--------------------------------------------------------------------

//ROAM STATE---------------------------------------------------------------------
function roamState(){
    count++;
    if(x+playerWidth >= boxWidth || x < 0){ //horizontal check
        dirX *= -1; //reverse direction!
        dirX +=randomDirection() //make it a bit spicyyy (random)
        if(count>=1000){ //doing the direction reset thing so the dumb roomba doesnt speed up dumb'ly
            if(dirX <0){dirX = -1} else{dirX = 1}
            if(dirY <0){dirY = -1} else{dirY = 1}
            count = 0;
        }
        }
    if(y+playerHeight >= boxHeight || y < 0){ //vertical check
        dirY *= -1;
        dirY +=randomDirection()
        if(count>=1000){
            if(dirX <0){dirX = -1} else{dirX = 1}
            if(dirY <0){dirY = -1} else{dirY = 1}
            count = 0;
        }
    }
    //!problem: the roomba slowly gets faster, since the dir's are no longer integers,
    //*solution: reset the dir's every like, couple seconds
    x+=dirX * speed;
    y+=dirY * speed;
	player.style.left = x + 'px'
    player.style.top = y + 'px'



    requestAnimationFrame(roamState); //keep calling it. I heard this is called "recursion"
}

if(targets === 0){requestAnimationFrame(roamState);} //first call it
//ROAM STATE---------------------------------------------------------------------
// requestAnimationFrame(update)


});


let coordinates = {
    x: [],
    y: []
}

function findPoint(){
    for (let i = 1; i<4; i++){
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



let targets = 3;
let visitedJunk = []; 
function findNearest(){
    let nearestIndex = -1 //have to adjust for arrays starting at 0, Could also modify forloop if I wanted
    let minDistance = 999999999;
    for(let i = 0; i< coordinates.x.length; i++){
        if (visitedJunk.includes(i)) continue; //skip if the roomba has already collected the junk
        let x = coordinates.x[i]
        let y = coordinates.y[i]
    
        //using the distance formula to calculate distance 
        let distance = Math.pow(x - player.offsetLeft , 2) + Math.pow(y - player.offsetTop, 2)

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
let angleRadians = angle * (Math.PI/180); //equation for converting degrees to radians

let deltaX = speed* Math.cos(angle)
let deltaY = speed* Math.sin(angle)





let arrayCount = 1;
let temp;
function update(){
 
    if(posX >= goalX-10 && posY >= goalY -10){

        visitedJunk.push(nearestPoint.index);
        temp = document.getElementById(arrayCount)
        temp.style.display = "none" //!problem, I don't know how to check which cookie I actually collided with in order to make it invisible
        arrayCount++
        targets--;
        // console.log('done')
        if (targets > 0) {
            nearestPoint = findNearest();
            if (nearestPoint) {
                goalX = nearestPoint.x;
                goalY = nearestPoint.y;
                angle = Math.atan2(goalY - posY, goalX - posX);
                deltaX = speed * Math.cos(angle);
                deltaY = speed * Math.sin(angle);
    
            }
        } else {
            posX = goalX
            posY = goalY
            cancelAnimationFrame(update);
            return;
        }

    }else{
        posX += deltaX
        posY += deltaY
    
    }
    player.style.left = posX + 'px'
    player.style.top = posY + 'px'

    requestAnimationFrame(update)
}

update()
