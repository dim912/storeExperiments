import { createStore, applyMiddleware } from 'redux'

//State and action is passed to reducer by redux
//Reducers are better be pure functions.
//1. Because should not modify the previous state => This is to enable the possibility of undo (Time traval)
//2. Should not do any out calls (file freeds, network calls etc). For performance
// Because reducers are called by redux one after another 
function myReducer(state = {}, action) {
    // if (action.type == 'TEST_ACTION') {
    //     return { ...state, 'a': 1, 'c': 1 }
    //  }
    return state
}

//redux pass store, next and action to middleware
const myMiddleware = (store) => (next) => (action) => {
    console.log("Middlware is called" + action.type)
    next(action)
}

//------------ START SET UP----------------
//This is the starting point of Redux (middleware sits between calling dispatch and triggering the reducer)
const store = createStore(
    myReducer,
    {},
    applyMiddleware(myMiddleware)
)

store.subscribe(() => {
    console.log('subscriber triggered')
})
//----------------END SET UP-------

///-------------WORK FLOW----------------

//---------------ALL BELOW HAPPENS SYNC.--------------

//1. User calls the dispatch function at store (type is a must), with action object
store.dispatch({ type: 'TEST_ACTION', payload: { 'data': '1' } })

//2)Then redux calls middleware functions

//3)Then redux calls all reducers with currentState and action object

//4)Reducer combines the action and return the new state. Then redux sets state of store as the state returned from reducer
//** calls one after another */

//5)Redux calls all subscribers (call back methods)
//** calls one after another */
