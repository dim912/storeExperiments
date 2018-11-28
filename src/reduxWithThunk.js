import { createStore, applyMiddleware } from 'redux';

//State and action is passed to reducer by redux
function myReducer(state = {}, action) {
    if (action.type == 'TEST_ACTION') {
        return { ...state, 'a': 1, 'c': 1 }
    }
    return state
}

//redux pass store, next and action to middleware
const myMiddleware = (store) => (next) => (action) => {
    console.log("Middlware is called" + action.type)
    next(action)
}

//------------ START SET UP----------------
const store = createStore(
    myReducer,
    {},
    applyMiddleware(myMiddleware)
)

store.subscribe(() => {
    console.log('subscriber triggered')
})


store.dispatch({ type: 'TEST_ACTION', payload: { 'data': '1' } })
