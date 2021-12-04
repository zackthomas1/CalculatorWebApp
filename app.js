
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
        this.isDecimalActive = false;
    }

    clear(){
        this.string_value = "";
        this.value = 0;
        this.sign = SignValueEnum.POSTIVE;
        this.isDecimalActive = false;
    }
}

// Dom object/variables
// -------------
let expression = document.querySelector('#expression');
let valueDisplay = document.querySelector("#value_display");
let operationDisplay = document.querySelector('#operation_display');
let history = document.querySelector('#history_list');

let leftOperand = new Operand();
let rightOperand = new Operand()

let operation = OperationEnum.None;
let _opStr = "";

let _isLeftOperandActive = true;
let _roundingFactor = 1000;


//

// functions
// ---------
function handleNumberBtnEvent(number_str){
    console.log(number_str);

    if(_isLeftOperandActive)
    {
        if(number_str === '0' && leftOperand.string_value.length === 0)
        {

        }else
        {
            leftOperand.string_value += number_str;
            valueDisplay.textContent = leftOperand.string_value;                
        }
    }else{
        if(number_str === '0' && rightOperand.string_value.length === 0)
        {

        }else
        {
            rightOperand.string_value += number_str;
            valueDisplay.textContent = rightOperand.string_value;    
        }
    }

}

function handleOperationBtnEvent(operation_enum){

    operation = operation_enum;

    switch(operation_enum)
    {
        case OperationEnum.ADDITION:
            console.log("+");
            _opStr = "+";
            break; 
        case OperationEnum.SUBTRACTION:
            console.log("-");
            _opStr = "-";
            break; 
        case OperationEnum.MULTIPLICATION:
            console.log("x");
            _opStr = "x";
            break; 
        case OperationEnum.DIVISION:
            console.log("/");
            _opStr = "/";
            break; 
        default: 
            break;         
    }   
    operationDisplay.textContent = _opStr;

    updateExpressionStr();

    _isLeftOperandActive = false;
}

function handleOperandSignBtnEvent(){
    if(_isLeftOperandActive)
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

function handleDecimalBtnEvent(){

    console.log(".");

    if(_isLeftOperandActive)
    {
        if(!leftOperand.isDecimalActive)
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
            leftOperand.isDecimalActive = true;
        }
    }else{
        if(!rightOperand.isDecimalActive)
        {
            if(rightOperand.string_value.length === 0)
            {
                rightOperand.string_value += "0.";
                valueDisplay.textContent = rightOperand.string_value;  
            }else
            {
                rightOperand.string_value += ".";
                valueDisplay.textContent = rightOperand.string_value;    
            }
            rightOperand.isDecimalActive = true;
        }
    }
}

function handleBackspaceBtnEvent(){
    console.log("backspace"); 

    if(_isLeftOperandActive)
    {
        
        if(leftOperand.string_value[leftOperand.string_value.length-1] === '.')
        {
            leftOperand.isDecimalActive = false;
        }

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
        if(rightOperand.string_value[rightOperand.string_value.length-1] === '.')
        {
            rightOperand.isDecimalActive = false;
        }

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

function handleClearBtnEvent(){
    expression.textContent = "";
    reset();
}

function handleKeyboardEvent(e){
    // console.log(e);
    console.log(e.code);
    console.log("shiftActive: " + e.shiftKey)

    switch(e.code)
    {
        case "Numpad0":

        case "Digit0":
            handleNumberBtnEvent('0');
            break;
        case "Numpad1":

        case "Digit1":
            handleNumberBtnEvent('1');
            break;
        case "Numpad2":

        case "Digit2":
            handleNumberBtnEvent('2');
            break;
        case "Numpad3":

        case "Digit3":
            handleNumberBtnEvent('3');
            break;
        case "Numpad4":

        case "Digit4":
            handleNumberBtnEvent('4');
            break;
        case "Numpad5":

        case "Digit5":
            handleNumberBtnEvent('5');
            break;
        case "Numpad6":

        case "Digit6":
            handleNumberBtnEvent('6');
            break;
        case "Numpad7":

        case "Digit7":
            handleNumberBtnEvent('7');
            break;       
        case "Numpad8":

        case "Digit8":
            if(e.shiftKey === true)
            {
                handleOperationBtnEvent(OperationEnum.MULTIPLICATION);
            }
            else{
                handleNumberBtnEvent('8');
            }
            break;
        case "Numpad9":

        case "Digit9":
            handleNumberBtnEvent('9');
            break;   
        case "Equal":
            if(e.shiftKey === true)
            {
                handleOperationBtnEvent(OperationEnum.ADDITION);
            }
            else
            {
                evaulateExpression();
            }
            break;
        case "NumpadAdd":
            handleOperationBtnEvent(OperationEnum.ADDITION);
            break;
        case "Minus":
 
        case "NumpadSubtract":
            handleOperationBtnEvent(OperationEnum.SUBTRACTION);
            break;  
        case "NumpadMultiply":
            handleOperationBtnEvent(OperationEnum.MULTIPLICATION);
            break;  
        case "Slash":

        case "NumpadDivide":
            handleOperationBtnEvent(OperationEnum.DIVISION);
            break;  
        case "NumpadEnter": 
            evaulateExpression();
            break;
        case "period": 
            
        case "NumpadDecimal": 
            handleDecimalBtnEvent()
            break;
        default:
            break;

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
    let exprSolution = 0;
    switch(operation)
    {
        case OperationEnum.ADDITION:
            exprSolution = leftOperand.value + rightOperand.value;
            break; 
        case OperationEnum.SUBTRACTION:
            exprSolution = leftOperand.value - rightOperand.value;
            break; 
        case OperationEnum.MULTIPLICATION:
            exprSolution = leftOperand.value * rightOperand.value;
            break; 
        case OperationEnum.DIVISION:
            exprSolution = leftOperand.value / rightOperand.value;
            break; 
        default: 
            throw new Error("No operation selected");
            break;        
    }

    // post evaluation reset 
    // leftOperand.string_value = (Math.round((leftOperand.value*_roundingFactor))/_roundingFactor).toString();
    // rightOperand.string_value = (Math.round((rightOperand.value*_roundingFactor))/_roundingFactor).toString();
    let exprSolutionStr = (Math.round((exprSolution*_roundingFactor))/_roundingFactor).toString();
    
    updateExpressionStr(); 
    addItemToHistoryList(exprSolutionStr);

    reset(); 
    leftOperand.string_value = exprSolutionStr;
    valueDisplay.textContent = exprSolutionStr;
}

function updateExpressionStr(){
    if(_isLeftOperandActive)
    { 
        expression.textContent = leftOperand.string_value + _opStr; 
    }
    else{
        expression.textContent = leftOperand.string_value + _opStr + rightOperand.string_value + "="; 
    }
}

function addItemToHistoryList(solutionStr)
{
    let LiElem = document.createElement('li'); 
    let pElem = document.createElement('p'); 
    let expressionSpan = document.createElement('span'); 
    let solutionSpan = document.createElement('span'); 


    expressionSpan.id = "exprs"; 
    solutionSpan.id = "solution";
    expressionSpan.textContent = leftOperand.string_value + _opStr + rightOperand.string_value; 
    solutionSpan.textContent = solutionStr;

    pElem.classList.add("m-0");
    pElem.innerHTML = `${expressionSpan.outerHTML}  =  ${solutionSpan.outerHTML}`

    LiElem.id = "historyItem"
    LiElem.classList.add('list-group-item');
    LiElem.appendChild(pElem); 
    
    history.prepend(LiElem);

}

function reset(){

    valueDisplay.textContent = "0";
    operationDisplay.textContent = "";

    leftOperand.clear(); 
    rightOperand.clear();

    operation = OperationEnum.None;

    _isLeftOperandActive = true;
}

// event listeners
// ---------------

//buttons
// ------
// number btns
document.querySelector("#btn_0").addEventListener('click', () => handleNumberBtnEvent("0"))
document.querySelector("#btn_1").addEventListener('click', () => handleNumberBtnEvent("1"))
document.querySelector("#btn_2").addEventListener('click', () => handleNumberBtnEvent("2"))
document.querySelector("#btn_3").addEventListener('click', () => handleNumberBtnEvent("3"))
document.querySelector("#btn_4").addEventListener('click', () => handleNumberBtnEvent("4"))
document.querySelector("#btn_5").addEventListener('click', () => handleNumberBtnEvent("5"))
document.querySelector("#btn_6").addEventListener('click', () => handleNumberBtnEvent("6"))
document.querySelector("#btn_7").addEventListener('click', () => handleNumberBtnEvent("7"))
document.querySelector("#btn_8").addEventListener('click', () => handleNumberBtnEvent("8"))
document.querySelector("#btn_9").addEventListener('click', () => handleNumberBtnEvent("9"))

// 
document.querySelector("#btn_decimal").addEventListener('click', () => handleDecimalBtnEvent())
document.querySelector("#btn_sign").addEventListener('click',   () => handleOperandSignBtnEvent())

// operation btns
document.querySelector("#btn_plus").addEventListener('click', () => handleOperationBtnEvent(OperationEnum.ADDITION))
document.querySelector("#btn_minus").addEventListener('click', () => handleOperationBtnEvent(OperationEnum.SUBTRACTION))
document.querySelector("#btn_multiple").addEventListener('click', () => handleOperationBtnEvent(OperationEnum.MULTIPLICATION))
document.querySelector("#btn_divide").addEventListener('click', () => handleOperationBtnEvent(OperationEnum.DIVISION))

// 
document.querySelector("#btn_equal").addEventListener('click', () => evaulateExpression())

//
document.querySelector("#btn_clear").addEventListener('click', () => handleClearBtnEvent())
document.querySelector("#btn_backspace").addEventListener('click', () => handleBackspaceBtnEvent())

// history list
document.querySelector('#history_list').addEventListener('click', function(e){
    let targetSolution = e.target.querySelector("#solution")

    reset(); 
    expression.textContent = "";

    leftOperand.string_value = targetSolution.textContent
    valueDisplay.textContent = leftOperand.string_value
    _isLeftOperandActive = true;

})

document.querySelector('#history_list').addEventListener('mouseover', function(e){
    let target = e.target;

    target.classList.add('list-group-item-light');
    
})

document.querySelector('#history_list').addEventListener('mouseout', function(e){
    let target = e.target;

    target.classList.remove('list-group-item-light');    
})

// keyboard events 
// ---------------
document.addEventListener('keypress', function(e){
    handleKeyboardEvent(e);
})

document.addEventListener('keydown', function(e){
    const key = e.key; 
    if (key === "Backspace") 
    {
        handleBackspaceBtnEvent();
    }

})
