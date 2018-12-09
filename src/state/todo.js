

const INITIAL_STATE= {
    tasks:[],
    visibleTasks:[]


}


export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case '': 
           return{

           }
    
        default:
           return state
    }
}