import { ACTIONS } from "./App"
/*Exports Operator Function*/
export default function OperationButton({ dispatch, operation}) {
    return (
    <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload:{operation}})}>
            {operation}
            </button>
    )
}