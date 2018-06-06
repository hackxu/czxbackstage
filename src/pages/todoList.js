import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';


@observer
class TodoListView extends Component {
    @observable count = 0;

    componentWillMount() {
        console.log(this.props)
        setInterval(() => {
            this.count++
        }, 1000)
    }
    render() {
        // this.props.todoList.changeTodos([{ id: 1, finished: false }, { id: 2, finished: false }, { id: 3, finished: false }])
        return <div>
            <ul>
                <TodoList></TodoList>
            </ul>
            count :{this.count}
        </div>
    }
}

class TodoList extends Component {
    @observable countone = 0;

    componentWillMount() {
        console.log(this.props)

        setInterval(() => {
            this.countone++
        }, 1000)
    }
    render() {
        // this.props.todoList.changeTodos([{ id: 1, finished: false }, { id: 2, finished: false }, { id: 3, finished: false }])
        return <div>
            <ul>

            </ul>
            countone :{this.countone}
        </div>
    }
}



const TodoView = observer(({ todo }) =>
    <li>
        <input type="checkbox" checked={todo.finished} onClick={() => todo.finished = !todo.finished} />
    </li>
)

export default TodoListView