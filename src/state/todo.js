import {database} from '../firebaseConfig'


const ADD_NEW_TASK = 'todo/ADD_NEW_TASK'
const GET_TASKS ='todo/GET_TASKS'
const ClEAN_ADD_NEW_TASK_INPUT_FIELD='todo/ClEAN_ADD_NEW_TASK_INPUT_FIELD'
const FIND_TASK ='todo/FIND_TASK'
const SHOW_ALL='todo/SHOW_ALL'

const INITIAL_STATE= {
    allTasks: [],
    visibleTasks:[],
    newTask:'',
    isCompleted:false,
    filter:''

}

export const addNewTaskAction=text=>({
    type:ADD_NEW_TASK,
    text:text
})

const getTasksAction=tasks=>({
    type:GET_TASKS,
    tasks
})

const cleanAddNewTaskInputFieldAction= () =>({
    type:ClEAN_ADD_NEW_TASK_INPUT_FIELD
})

export const findTaskAction=(text)=>({
    type:FIND_TASK,
    input:text
})

export const showAllTasksAction=()=>({
    type:SHOW_ALL
})

export const addNewTaskToDbAsyncAction=()=>(dispatch,getState)=>{
    const newTask=getState().todo.newTask
    const uuid=getState().auth.user.uid
    const isCompleted=getState().todo.isCompleted

    newTask==='' ? 
    alert('No pain no gain. Add not empty task !!!')
    :
    database.ref(`users/${uuid}/tasks`).push({
        newTask,
        isCompleted
    })
   dispatch(cleanAddNewTaskInputFieldAction())

}

export const getTasksFromDbAsyncAction=()=>(dispatch,getState)=>{
    const uuid=getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).on(
        'value',
        snapshot => {
            if(snapshot.val()) {
            
                const tasks = Object.entries( snapshot.val() )
                            .map(entry => ({
                                ...entry[1],
                                key: entry[0]
                            }))
                dispatch(getTasksAction(tasks))
                
            } 
            else dispatch(getTasksAction(null))
        }
    )
}

export const deleteTaskAsyncAction= (key)=>(dispatch,getState)=>{
    const uuid=getState().auth.user.uid
    database.ref(`users/${uuid}/tasks`).child(key).remove()
}

export const toggleCompletedTasksAsyncAction=(task)=>(dispatch,getState)=>{
    const uuid=getState().auth.user.uid
    database.ref(`users/${uuid}/tasks/${task.key}`).update({
        isCompleted: !task.isCompleted
    })

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
                allTasks: action.tasks,
                visibleTasks: action.tasks
                
            }
        case ClEAN_ADD_NEW_TASK_INPUT_FIELD:
            return{
                ...state,
                newTask:''
            }
        case FIND_TASK:
            return{
                ...state,
                filter: action.input,
                visibleTasks: state.allTasks
                        .filter(task=>
                            task.newTask
                            .toLowerCase()
                            .replace(/\s/g, '')
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                            .includes(state.filter
                                .toLowerCase()
                                .replace(/\s/g, '')
                                .normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
            }
        case SHOW_ALL:
            return{
                ...state,
                visibleTasks: state.allTasks
                        .map(task=>task)
            }
        default:
           return state
    }
}