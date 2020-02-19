import React, { Component } from 'react';
import './TodoList.css';
class Todo extends Component {
 
  constructor(props) {
    super(props);
 
    this.state = {
      edit: false,
      id: null,
      mockData: [ ]
    }
  }
 
  onSubmitHandle(event) {
    event.preventDefault();
 
    this.setState({
      mockData: [...this.state.mockData, {
        id: Date.now(),
        title: event.target.item.value,
        done: false,
        date: new Date()
      }]
    });
 
    event.target.item.value = '';
 
 
  }
 
  onDeleteHandle() {
    let id = arguments[0];
 
let r=window.confirm("are u sure?");
if(r===true){
    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
}
  }
 
  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }
 
  onUpdateHandle(event) {
    event.preventDefault();
 
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }
 
        return item;
      })
    });
 
    this.setState({
      edit: false
    });
  }
 
  onCompleteHandle() {
    let id = arguments[0];
 
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }
 
        return item;
      })
    });
  }
 
  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)} className="header">
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.title} required/>
        <button className="update-add-item">Update</button>
      </form>
    }
  }
 
  render() {
    return (
      <div>
        {this.renderEditForm()}
        <div className="header">
        <form onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="text" name="item" className="item" required />
          <button className="btn-add-item">Add</button>
        </form>
        </div>
        <ul className="theList">
          {this.state.mockData.map(item => (
            <li key={item.id} className={ item.done ? 'done' : 'hidden' }>
              {item.title}
              <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
              <button onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</button>
              <button onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
 
export default Todo;
