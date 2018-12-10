import React from 'react'

import Paper from 'material-ui/Paper/Paper';
import { TextField, RaisedButton, List, ListItem, Checkbox, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import { connect } from 'react-redux'
import {
	addNewTaskAction,
	addNewTaskToDbAsyncAction,
	deleteTaskAsyncAction,
	toggleCompletedTasksAsyncAction,
	findTaskAction,
	showAllTasksAction,
	showCompletedTasksAction,
	showUnCompletedTasksAction

} from './state/todo'

const style = {
	paper: {
		margin: 20,
		padding: 20

	},
	button: {
		margin: 1,
		padding: 1

	},
	list: {

	}
}

const Todo = (props) => (
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

			onChange={props._findTaskAction}
		/>
		<RaisedButton
			label={'All'}
			primary={true}
			style={style.button}
			fullWidth={true}
			onClick={props._showAllTasksAction}
		/>
		<RaisedButton
			label={'Completed'}
			primary={true}
			style={style.button}
			fullWidth={true}
			onClick={props._showCompletedTasksAction}
		/>
		<RaisedButton
			label={'To Be Done'}
			primary={true}
			style={style.button}
			fullWidth={true}
			onClick={props._showUnCompletedTasksAction}
		/>


		<List
			style={style.list}
		>
			{
				props._visibleTasks &&
					props._visibleTasks.map ?
					props._visibleTasks.map(task =>
						// console.log(task)
						<ListItem
							key={task.key}
							primaryText={task.newTask}
							leftCheckbox={<Checkbox
								defaultChecked={task.isCompleted}
								onCheck={() => props._toggleCompletedTasksAsyncAction(task)}
							/>}
							rightIconButton={<IconButton
								onClick={() => props._deleteTaskAsyncAction(task.key)}
							>
								<DeleteIcon />
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

const mapStateToProps = (state) => ({
	_newTask: state.todo.newTask,
	_allTasks: state.todo.allTasks,
	_visibleTasks: state.todo.visibleTasks,
	_filter: state.todo.filter
})

const mapDispatchToProps = (dispatch) => ({
	_addNewTaskAction: event => dispatch(addNewTaskAction(event.target.value)),
	_addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction()),
	_deleteTaskAsyncAction: (key) => dispatch(deleteTaskAsyncAction(key)),
	_toggleCompletedTasksAsyncAction: (task) => dispatch(toggleCompletedTasksAsyncAction(task)),
	_findTaskAction: (event) => dispatch(findTaskAction(event.target.value)),
	_showAllTasksAction: () => dispatch(showAllTasksAction()),
	_showCompletedTasksAction: () => dispatch(showCompletedTasksAction()),
	_showUnCompletedTasksAction: () => dispatch(showUnCompletedTasksAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)