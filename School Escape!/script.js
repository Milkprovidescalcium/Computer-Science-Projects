const roomArray = [118,119,120,121,100,101,102,103,104,105,106,115,114,113,112,123,124,217,216,215,215,214,213,212,211,210,209,208,207,205,204,203,202,201,200]


let value;
const count = roomArray.length;

document.getElementById("submitButton").addEventListener("click", ()=>{
value = parseFloat(document.getElementById("roomInput").value)

let result = roomArray.includes(value);
if(result){
     if(value <= 121 && value >=118){console.log("baand")}
     if(value === 123 || value === 124 || value >= 112 && value <= 115 || value >= 100 && value <= 103){console.log('front doors')}
     if(value >=104 && value <=106){console.log('East Doors')}
}
else{
    console.log("NOT A ROOM")
}


});