
// objects 
// -------
const SignValueEnum = {
    "NEGATIVE" : -1,
    "POSTIVE" : 1, 
}

const OperationEnum = {
    "None": null,
    "ADDITION" : 0, 
    "SUBTRACTION" : 1, 
    "MULTIPLICATION" : 2, 
    "DIVISION" : 3,
}
class Operand{
    constructor(){
        this.string_value = "";
        this.value = 0;
        this.sign = SignValueEnum.POSTIVE;
    }

    clear(){
        this.string_value = "";
        this.value = 0;
        this.sign = SignValueEnum.POSTIVE;
    }
}

// Dom object/variables
// -------------
let valueDisplay = document.querySelector("#value_display");
let operationDisplay = document.querySelector('#operation_display');

let leftOperand = new Operand();
let rightOperand = new Operand()

let operation = OperationEnum.None;

let isLeftOperandActive = true;

//

// functions
// ---------
function evaulateOperationBtnEvent(operation_enum){

    operation = operation_enum;

    // enter the left operand
    isLeftOperandActive = false;

    switch(operation_enum)
    {
        case OperationEnum.ADDITION:
            console.log("+");
            operationDisplay.textContent = "+";
            break; 
        case OperationEnum.SUBTRACTION:
            console.log("-");
            operationDisplay.textContent = "-";
            break; 
        case OperationEnum.MULTIPLICATION:
            console.log("x");
            operationDisplay.textContent = "x";
            break; 
        case OperationEnum.DIVISION:
            console.log("/");
            operationDisplay.textContent = "/";
            break; 
        default: 
            break;         
    }   
}

function evaulateNumberBtnEvent(number_str){
    console.log(number_str);

    if(isLeftOperandActive)
    {
        leftOperand.string_value += number_str;
        valueDisplay.textContent = leftOperand.string_value;
    }else{
        rightOperand.string_value += number_str;
        valueDisplay.textContent = rightOperand.string_value;
    }

}

function evaulateExpression(){

    // get operand values
    if(leftOperand.string_value.length !== 0)
    {
        leftOperand.value = parseFloat(leftOperand.string_value);
    }

    if(rightOperand.string_value.length !== 0)
    {
        rightOperand.value = parseFloat(rightOperand.string_value);
    }

    // evaluate expression
    let evaluatedResult = 0;
    switch(operation)
    {
        case OperationEnum.ADDITION:
            evaluatedResult = leftOperand.value + rightOperand.value;
            break; 
        case OperationEnum.SUBTRACTION:
            evaluatedResult = leftOperand.value - rightOperand.value;
            break; 
        case OperationEnum.MULTIPLICATION:
            evaluatedResult = leftOperand.value * rightOperand.value;
            break; 
        case OperationEnum.DIVISION:
            evaluatedResult = leftOperand.value / rightOperand.value;
            break; 
        default: 
            break;        
    }

    // post evaluation reset state
    reset(); 
    leftOperand.string_value = evaluatedResult.toString();
    valueDisplay.textContent = evaluatedResult;

}

function updateExpression(){

}

function addToHistory(value)
{

}

function reset(){

    valueDisplay.textContent = "0";
    operationDisplay.textContent = "";

    leftOperand.clear(); 
    rightOperand.clear();

    operation = OperationEnum.None;

    isLeftOperandActive = true;
}

function backspace(){
    console.log("backspace"); 

    if(isLeftOperandActive)
    {
        leftOperand.string_value = leftOperand.string_value.substring(0,leftOperand.string_value.length-1);
       
        if(leftOperand.string_value.length == 0)
        {
            valueDisplay.textContent = "0";
        }else
        {
            valueDisplay.textContent = leftOperand.string_value;
        }
    }
    else
    {
        rightOperand.string_value = rightOperand.string_value.substring(0,rightOperand.string_value.length-1);

        if(rightOperand.string_value.length == 0)
        {
            valueDisplay.textContent = "0";
        }else
        {
            valueDisplay.textContent = rightOperand.string_value;
        }
    }
}

function inputDecimal(){

    console.log(".");

    if(isLeftOperandActive)
    {
        if(leftOperand.string_value.length == 0)
        {
            leftOperand.string_value += "0.";
            valueDisplay.textContent = leftOperand.string_value;    
        }else
        {
            leftOperand.string_value += ".";
            valueDisplay.textContent = leftOperand.string_value;    
        }
    }else{
        if(rightOperand.string_value.length === 0)
        {
            rightOperand.string_value += "0.";
            valueDisplay.textContent = rightOperand.string_value;  
        }else
        {
            rightOperand.string_value += ".";
            valueDisplay.textContent = rightOperand.string_value;    
        }
    }
}

function evaluateOperandSign(){
    if(isLeftOperandActive)
    {
        leftOperand.sign *= -1; // flips sign value

        // update string value
        if(leftOperand.sign === SignValueEnum.NEGATIVE)
        {
            leftOperand.string_value = "-" + leftOperand.string_value;
        }else
        {
            leftOperand.string_value = leftOperand.string_value.substring(1,leftOperand.string_value.length);
        }
        valueDisplay.textContent = leftOperand.string_value;  

    }else
    {
        rightOperand.sign *= -1; // flips sign value

        // update string value
        if(rightOperand.sign === SignValueEnum.NEGATIVE)
        {
            rightOperand.string_value = "-" + rightOperand.string_value;
        }else
        {
            rightOperand.string_value = rightOperand.string_value.substring(1,rightOperand.string_value.length);
        }
        valueDisplay.textContent = rightOperand.string_value;   

}

}


// event listeners
// ---------------

//buttons
// ------
// number btns
document.querySelector("#btn_0").addEventListener('click', () => evaulateNumberBtnEvent("0"))
document.querySelector("#btn_1").addEventListener('click', () => evaulateNumberBtnEvent("1"))
document.querySelector("#btn_2").addEventListener('click', () => evaulateNumberBtnEvent("2"))
document.querySelector("#btn_3").addEventListener('click', () => evaulateNumberBtnEvent("3"))
document.querySelector("#btn_4").addEventListener('click', () => evaulateNumberBtnEvent("4"))
document.querySelector("#btn_5").addEventListener('click', () => evaulateNumberBtnEvent("5"))
document.querySelector("#btn_6").addEventListener('click', () => evaulateNumberBtnEvent("6"))
document.querySelector("#btn_7").addEventListener('click', () => evaulateNumberBtnEvent("7"))
document.querySelector("#btn_8").addEventListener('click', () => evaulateNumberBtnEvent("8"))
document.querySelector("#btn_9").addEventListener('click', () => evaulateNumberBtnEvent("9"))

// 
document.querySelector("#btn_decimal").addEventListener('click', () => inputDecimal())
document.querySelector("#btn_sign").addEventListener('click', () => evaluateOperandSign())

// operation btns
document.querySelector("#btn_plus").addEventListener('click', () => evaulateOperationBtnEvent(OperationEnum.ADDITION))
document.querySelector("#btn_minus").addEventListener('click', () => evaulateOperationBtnEvent(OperationEnum.SUBTRACTION))
document.querySelector("#btn_multiple").addEventListener('click', () => evaulateOperationBtnEvent(OperationEnum.MULTIPLICATION))
document.querySelector("#btn_divide").addEventListener('click', () => evaulateOperationBtnEvent(OperationEnum.DIVISION))

// 
document.querySelector("#btn_equal").addEventListener('click', () => evaulateExpression())

//
document.querySelector("#btn_clear").addEventListener('click', () => reset())
document.querySelector("#btn_backspace").addEventListener('click', () => backspace())

// keyboard events 
// ---------------

