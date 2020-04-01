import React, { useReducer } from 'react';
import { Button, Container, FormGroup, Label, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';

const initialState = {
    todo : [],
};

const todoActions = {
    addTodo : 'add-todo',
};

const addTODO = task => {
    return {
        type: todoActions.addTodo,
        payload: task
    }
}

function todoReducer(state, action) {
    switch(action.type) {
        case todoActions.addTodo:
            // var arr = state.todo;
            // arr.push(action.payload);
            // return {
            //     todo: arr
            // };
            return Object.assign({}, state, {
                todo: [
                  ...state.todo,
                  action.payload
                ]
              })
        default :
            throw new Error();
    }
}

function TodoAppComponent(props) {

    const [state, dispatch] = useReducer(todoReducer, initialState);

    let schema = yup.string().matches(/.*\S.*/);

    const onSubmit = e => { 
        schema.isValid(document.getElementById('inputTask').value).then(function(valid) {
            if(valid)
                dispatch(addTODO(document.getElementById('inputTask').value)); 
        });

        displayTasks();
    }

    const displayTasks = () => {
        var arr = state.todo;
        var i=0;
        var content = '';
        for(i=0; i< arr.length; i++) {
            content += '<Label>'+arr[i]+'</label><br/>';
        }
        document.getElementById('tasks').innerHTML = content;
    }

    // const onChange = e => {
    //     // const {value, name} = e.target;
    //     // e.preventDefault();
    //     dispatch(addTODO(e.target.value));
    // }

    return(
        <div style={{padding : "20px"}} > 
            <FormGroup>
                <Label>Add Task</Label>
                <Input class="form-control" 
                        type="text" 
                        name="task" 
                        id="inputTask" 
                        placeholder="Enter todo task" ></Input>
            </FormGroup>
            <Button onClick={onSubmit}>Add</Button>
            <Container id="tasks" className="themed-container"/>
        </div>
    );
}

export default TodoAppComponent;