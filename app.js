
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
let expression = document.querySelector('#expression');
let valueDisplay = document.querySelector("#value_display");
let operationDisplay = document.querySelector('#operation_display');
let history = document.querySelector('#history_list');

let leftOperand = new Operand();
let rightOperand = new Operand()

let operation = OperationEnum.None;
let opStr = "";

let isLeftOperandActive = true;

//

// functions
// ---------
function handleNumberBtnEvent(number_str){
    console.log(number_str);

    if(isLeftOperandActive)
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
            opStr = "+";
            break; 
        case OperationEnum.SUBTRACTION:
            console.log("-");
            opStr = "-";
            break; 
        case OperationEnum.MULTIPLICATION:
            console.log("x");
            opStr = "x";
            break; 
        case OperationEnum.DIVISION:
            console.log("/");
            opStr = "/";
            break; 
        default: 
            break;         
    }   
    operationDisplay.textContent = opStr;

    updateExpressionStr();

    isLeftOperandActive = false;
}

function handleOperandSignBtnEvent(){
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

function handleDecimalBtnEvent(){

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

function handleBackspaceBtnEvent(){
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

function handleClearBtnEvent(){
    expression.textContent = "";
    reset();
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

    // post evaluation reset state
    updateExpressionStr(); 
    addToHistoryList(exprSolution);

    reset(); 
    leftOperand.string_value = exprSolution.toString();
    valueDisplay.textContent = exprSolution;

}

function updateExpressionStr(){

    if(isLeftOperandActive)
    { 
        expression.textContent = leftOperand.string_value + opStr; 
    }
    else{
        expression.textContent = leftOperand.string_value + opStr + rightOperand.string_value + "="; 
    }
}

function addToHistoryList(solution)
{
    let LiElem = document.createElement('li'); 
    let pElem = document.createElement('p'); 
    let expressionSpan = document.createElement('span'); 
    let solutionSpan = document.createElement('span'); 


    expressionSpan.id = "exprs"; 
    solutionSpan.id = "solution";
    expressionSpan.textContent = leftOperand.string_value + opStr + rightOperand.string_value; 
    solutionSpan.textContent = solution;

    pElem.classList.add("m-0");
    pElem.innerHTML = `${expressionSpan.outerHTML}  =  ${solutionSpan.outerHTML}`

    LiElem.id = ""
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

    isLeftOperandActive = true;
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

// 
document.querySelector('#history_list').addEventListener('click', function(e){
    let targetSolution = e.target.querySelector("#solution")

    reset(); 
    expression.textContent = "";

    leftOperand.string_value = targetSolution.textContent
    valueDisplay.textContent = leftOperand.string_value
    isLeftOperandActive = false;

})

// keyboard events 
// ---------------

