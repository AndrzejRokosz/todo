import {database} from '../firebaseConfig'

const ADD_NEW_TASK = 'todo/ADD_NEW_TASK'
const GET_TASKS ='todo/GET_TASKS'

const INITIAL_STATE= {
    tasks: null,
    visibleTasks:[],
    newTask:''

}


export const addNewTaskAction=text=>({
    type:ADD_NEW_TASK,
    text:text
})

const getTasksAction=tasks=>({
    type:GET_TASKS,
    tasks
})



export const addNewTaskToDbAsyncAction=()=>(dispatch,getState)=>{
    const newTaskToDb=getState().todo.newTask
    const uuid=getState().auth.user.uid
    console.log(uuid)
    database.ref(`users/${uuid}/tasks`).push({
        newTaskToDb
    })
}

export const getTasksFromDbAsyncAction=()=>(dispatch,getState)=>{
    const uuid=getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).on(
        'value',
        snapshot => {
            console.log(snapshot.val())
            const tasks = Object.entries(
                snapshot.val()
            ).map(entry => ({
                ...entry[1],
                key: entry[0]
            }))
            dispatch(getTasksAction(tasks))
        }
    )
}



export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ADD_NEW_TASK: 
           return{
               ...state,
               newTask:action.text       
           }
        case GET_TASKS:
            return{
                ...state,
                tasks: action.tasks
            }

    
        default:
           return state
    }
}