
import { useReducer } from 'react';
/*Digit and Operation function*/
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

import './App.css';

/*Calculator Actions*/
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch(type) {
    //Adds Digit
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      /*Prevents unnecessary zeroes*/
      if(payload.digit === "0" && state.currentOperand === "0") 
       {return state}
      /*Prevents unnecessary decimal points*/ 
      if(payload.digit === "." && state.currentOperand.includes(".")) 
      {return state}

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
      //Chooses the operation (eg: +, -, *).
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null)
        {return state}
      //Prevents action from working if theres no current number.
        if(state.currentOperand == null){
          return {
            ...state,
            operation: payload.operation,
          }
        }
        //Prevents action from working if theres no previous number.
        if (state.previousOperand == null)
        {
         return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
         } 
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null
        }
      //Clears Answer (AC).
      case ACTIONS.CLEAR:
        return{}
      // Deletes Digit (DEL). 
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return{
            ...state,
            overwrite:false,
            currentOperand: null}
        }
        if(state.currentOperand == null) return state
        if(state.currentOperand.length === 1)
        {return {...state, currentOperand: null}
      }
    
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      //Gets answer after pressing '='.
        case ACTIONS.EVALUATE:
        if(state.operation == null || state.currentOperand== null || state.previousOperand == null)
        {return state}

        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }

        default:
  }
}
//Evaluate Function
function evaluate({currentOperand, previousOperand, operation})

{  //The two operands representating the current and previous number input.
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  /*If theres no valid answer*/
  if(isNaN(prev) || isNaN(current)) return ""
  //The operations for Addition, Subtraction, Multiply, Division, Powers, Nth Root, Remainer, Pi
  //The decimal is fixed to prevent a coding glitch.
  //each operation's answer is multiplied with one to remove the unnecessary zeros.
  let computation = ""
  switch(operation) {
    case  "+":
    computation = (prev + current).toFixed(9)*1
    break
    case "-":
    computation = (prev - current).toFixed(9)*1
    break
    case "*":
    computation = (prev * current).toFixed(9)*1
    break
    case "÷":
    computation = (prev / current).toFixed(9)*1
    break
    case "^":
    computation = (prev ** current).toFixed(9)*1
    break
    case "R":
    computation = (prev % current).toFixed(9)*1
    break
    case "√":
    computation = (Math.pow(current, 1/prev)).toFixed(9)*1
    break
    case "𝜋":
    computation = (prev * (current*Math.PI)).toFixed(9)
    computation = computation*1
    break

    default:
  }
  return computation.toString()
}


function App() {
  //Operands
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  
  
  return (    
   <div className="title"> 
   {/*App Title*/}
   <h1>Calculator</h1>
   {/*Calculator*/}
   <div className="calculator-grid">
    {/*Result*/}
    <div className="output">
      {/*Previous Input*/}
      <div className="previous-operand">{previousOperand} {operation}</div>
      {/*Current Input*/}
      <div className="current-operand">{currentOperand}</div>
    </div>
    {/*AC Button (Removes all inputs*/}
    <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>AC</button>
    {/*Delete Button (Removes a single input*/}
    <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT})}>DEL</button>
    {/*The Operations Divide, Multiply Add, Subtract, Powers, Nth Root, Remainer, Pi*
    /*Digits 0-9 and Decimal*/
    /*Equals Button*/}
    <OperationButton operation="÷" dispatch={dispatch}/>
    <DigitButton digit="1" dispatch={dispatch}/>
    <DigitButton digit="2" dispatch={dispatch}/>
    <DigitButton digit="3" dispatch={dispatch}/>
    <OperationButton operation="*" dispatch={dispatch}/>
    <DigitButton digit="4" dispatch={dispatch}/>
    <DigitButton digit="5" dispatch={dispatch}/>
    <DigitButton digit="6" dispatch={dispatch}/>
    <OperationButton operation="+" dispatch={dispatch}/>
    <DigitButton digit="7" dispatch={dispatch}/>
    <DigitButton digit="8" dispatch={dispatch}/>
    <DigitButton digit="9" dispatch={dispatch}/>
    <OperationButton operation="-" dispatch={dispatch}/>
    <DigitButton digit="." dispatch={dispatch}/>
    <DigitButton digit="0" dispatch={dispatch}/>
    <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE})}>=</button>
    <OperationButton operation="^" dispatch={dispatch}/>
    <OperationButton operation="√" dispatch={dispatch}/>
    <OperationButton operation="R" dispatch={dispatch}/>
    <OperationButton operation="𝜋" dispatch={dispatch}/>
   </div>
   </div> 
  );
}

export default App;
