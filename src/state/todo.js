import {database} from '../firebaseConfig'

const ADD_NEW_TASK = 'todo/ADD_NEW_TASK'

const INITIAL_STATE= {
    tasks:[],
    visibleTasks:[],
    newTask:''

}

export const addNewTaskAction=text=>({
    type:ADD_NEW_TASK,
    text:text
})

export const addNewTaskToDbAsyncAction=()=>(dispatch,getState)=>{
    const newTaskToDb=getState().todo.newTask
    const userID=getState().auth.user.uuid
    database.ref(`users/${userID}/tasks`).push({
        newTaskToDb
    })
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ADD_NEW_TASK: 
           return{
               ...state,
               newTask:action.text

           }
    
        default:
           return state
    }
}