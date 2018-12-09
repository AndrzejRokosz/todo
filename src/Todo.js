import React from 'react'

import Paper from 'material-ui/Paper/Paper';
import { TextField, RaisedButton, List,ListItem, Checkbox, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import {connect} from 'react-redux'
import {addNewTaskAction,addNewTaskToDbAsyncAction} from './state/todo'

const style={
 paper:{
    margin:20,
    padding:20

 },
 button:{

 },
 list:{

 }
}

const Todo = (props)=>(
 <Paper
    style={style.paper}
 >

 <TextField
 floatingLabelText='Add new task'
 value={props._newTask}
 fullWidth={true}
 onChange={props._addNewTaskAction}

 />
 <RaisedButton
 label={'Add'}
 primary={true}
 style={style.button}
 fullWidth={true}
 onClick={props._addNewTaskToDbAsyncAction}

 />
<TextField
 floatingLabelText='Find task'
 fullWidth={true}
 />
<RaisedButton
 label={'All'}
 primary={true}
 style={style.button}
 fullWidth={true}
 onClick={()=>{}}
 />

 <List
	style={style.list}
 >
	{
		props._allTasks &&
		props._allTasks.map ?
		props._allTasks.map(task=>
			// console.log(task)
			<ListItem
			key={task.key}
			primaryText={task.newTask}
			leftCheckbox={<Checkbox
							defaultChecked={task.isCompleted}
							onCheck={()=>alert('checked/unchecked')}
			
			
						/>}
			rightIconButton={<IconButton
							onClick={()=>alert('clicked')}
							>
							<DeleteIcon/>
							</IconButton>
							}
			/>
			)
			:
			null
	}

 </List>

 </Paper>

)

const mapStateToProps =(state)=>({
	_newTask: state.todo._newTask,
	_allTasks: state.todo.allTasks
})

const mapDispatchToProps=(dispatch)=>({
	_addNewTaskAction: event=>dispatch(addNewTaskAction(event.target.value)),
	_addNewTaskToDbAsyncAction: ()=>dispatch(addNewTaskToDbAsyncAction())
})

export default connect(mapStateToProps,mapDispatchToProps)(Todo)