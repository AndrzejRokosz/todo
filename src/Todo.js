import React from 'react'
import Paper from 'material-ui/Paper/Paper';
import { TextField, RaisedButton, List } from 'material-ui';

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
 />
 <RaisedButton
 label={'Add'}
 primary={true}
 style={style.button}
 onClick={()=>{}}
 />
<TextField
 floatingLabelText='Find task'
 />
<RaisedButton
 label={'All'}
 primary={true}
 style={style.button}
 onClick={()=>{}}
 />

 <List
	style={style.list}
 >




 </List>

 </Paper>

)


export default Todo