import React, {Component} from 'react'
import ReactDOM from "react-dom";
import axios from 'axios';
import update from 'immutability-helper';

class TodosContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            inputValue: ''
        }
    }
    getTodos() {
        axios.get('/api/v1/todos').then(response => {
            this.setState({todos: response.data})
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.getTodos();
    }

    createTodoItem = (e) => {
        if(e.key === "Enter") {
            axios.post('/api/v1/todos', {todo: {title: e.target.value}}).then(response => {
                const todos = update(this.state.todos, {
                    $splice: [[0,0, response.data]]
                })
                this.setState({
                    todos: todos,
                    inputValue: ''
                })
            }).catch(error => console.log(error));
        }
    }

    handleChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    updateTodoItem = (e, id) => {
        axios.put(`/api/v1/todos/${id}`, {todo: {complete: e.target.checked}})
            .then(response => {
                const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
                const todos = update(this.state.todos, {
                    [todoIndex]: {$set: response.data}
                })
                this.setState({
                    todos: todos
                })
            })
            .catch(error => console.log(error))
    }

    deleteTodoItem = (id) => {
        axios.delete(`/api/v1/todos/${id}`)
            .then(response => {
                const todoIndex = this.state.todos.findIndex(x => x.id === id)
                const todos = update(this.state.todos, {
                    $splice: [[todoIndex, 1]]
                })
                this.setState({
                    todos: todos
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return(
            <div>
                <div className="header">
                    <h1>My Todos</h1>
                </div>
                <div className="inputContainer">
                    <input className="taskInput" type="text"
                           placeholder="Add a task" maxLength="50" onKeyPress={this.createTodoItem} value={this.state.inputValue} onChange={this.handleChange} />
                </div>
                <div className="listWrapper">
                    <ul className="taskList">
                        {this.state.todos.map((todo) => {
                            return(
                                <li className="task" todo={todo} key={todo.id}>
                                    <input className="taskcheckbox" type="checkbox" checked={todo.complete} onChange={(e) => this.updateTodoItem(e, todo.id)}/>
                                    <label className="tasklabel">{todo.title}</label>
                                    <span className="button is-danger is-small" onClick={(e) => this.deleteTodoItem(todo.id)}>x</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <TodosContainer />,
        document.body.appendChild(document.createElement('div')),
    )
})

export default TodosContainer;