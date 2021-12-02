const OperationEnum = {
    "ADDITION" : 0, 
    "SUBTRACTION" : 1, 
    "MULTIPLICATION" : 2, 
    "DIVISION" : 3,
}

// data memebers
// -------------

let display = document.querySelector("#display")
let input_str = document.querySelector("#display").textContent;
let left_operand = 0; 
let right_operand = 0;


// functions
// ---------
function parseInputString(input_str){

}

function operationBtnPressEvent(operation_enum){

}

function numberBtnPressEvent(number_str){
    console.log(number_str);
    display.textContent = display.textContent + number_str;
    input_str += number_str
}

// event listeners
// ---------------

// number btns
document.querySelector("#btn_0").addEventListener('click', function(e){
    console.log("0");
    display.textContent = display.textContent + '0';
})

document.querySelector("#btn_1").addEventListener('click', function(e){
    console.log("1");
    display.textContent = display.textContent + '1';
})

document.querySelector("#btn_2").addEventListener('click', function(e){
    console.log("2");
    display.textContent = display.textContent + '2';
})

document.querySelector("#btn_3").addEventListener('click', function(e){
    console.log("3");
    display.textContent = display.textContent + '3';
})

document.querySelector("#btn_4").addEventListener('click', function(e){
    console.log("4");
    display.textContent = display.textContent + '4';
})

document.querySelector("#btn_5").addEventListener('click', function(e){
    console.log("5");
    display.textContent = display.textContent + '5';
})

document.querySelector("#btn_6").addEventListener('click', function(e){
    console.log("6");
    display.textContent = display.textContent + '6';
})

document.querySelector("#btn_7").addEventListener('click', function(e){
    console.log("7");
    display.textContent = display.textContent + '7';
})

document.querySelector("#btn_8").addEventListener('click', function(e){
    console.log("8");
    display.textContent = display.textContent + '8';
})

document.querySelector("#btn_9").addEventListener('click', function(e){
    console.log("9");
    display.textContent = display.textContent + '9';
})

// operators

// 
