// const roomArray = [118,119,120,121,100,101,102,103,104,105,106,115,114,113,112,123,124,217,216,215,215,214,213,212,211,210,209,208,207,205,204,203,202,201,200]


// let value;
// const count = roomArray.length;

// document.getElementById("submitButton").addEventListener("click", ()=>{
// value = parseFloat(document.getElementById("roomInput").value)

// let result = roomArray.includes(value);
// if(result){
//      if(value <= 121 && value >=118 ){console.log("baand")}
//      if(value === 123 || value === 124 || value >= 112 && value <= 115 || value >= 100 && value <= 103 || value >=217 && value <=214 || value >=200 || value <=205){console.log('SOPAC doors')}
//      if(value >=104 && value <=106 || value >=208 && value <=211 || value ===213 || value===212){console.log('East Doors')}
// }
// else{
//     console.log("NOT A ROOM")
// }


// });

//*Okay, this was my first solution, but it SUCKS since I'm
//*hardcoding all the rooms, so I'll find a BETTER solution!!!!

let count = 0;

//this is an object
const sections = {
    //these are keys    //these are values
    "Parking Lot Exit": [118,119,120,121],
    "SOPAC Doors": [115,114,113,112,217,216,215,214,200,201,202,203,204,100,101,202,103,],
    "East Doors": [205,206,208,209,210,211,212,213,107,106,105,104]
}

document.getElementById("submitButton").addEventListener("click", ()=>{
    let value = parseFloat(document.getElementById("roomInput").value)//casting the value as a flaot since my array is stupid and is made up of only integers 
    let found = false;
    for(const key in sections){ //for-in loops are used for iterating through key:value pairs in objects, which I have, how convenient!
        if(sections[key].includes(value)){ 
            console.log(key)
            document.getElementById('result').innerHTML = "looks like your nearest exit is the " + key
            found = true;
            count = 0;
            return;
        }
    }
    if(!found){
        document.getElementById('result').innerHTML = "Sorry! Doesn't look like that's a valid room!"
        funny();
    }
});


function funny(){
    count++;
    if(count >= 4){
        document.getElementById('result').innerHTML = "THAT'S NOT A VALID ROOM DUDE, CHOOSE SOMETHING ELSE"
        count = 0
    }
}
let state = 0;
document.querySelector(".info-circle").addEventListener("click", ()=>{
    let button = document.getElementById('sideInfo')
    if(state === 0){
        button.style.visibility = 'visible'
        state++;
        return;
    }else{
        button.style.visibility = 'hidden'
        state--;
        return;
    }

});
