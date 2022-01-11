import UserList from './components/UserList';
import {useState, useRef, useReducer} from "react";
import CreateUser from './components/CreateUser';

function App() {
  const initialState = {
    inputs: {
      username: '',
      userage: ''
    },
    users: [
      {id:1, username: "그린", age: 40},
      {id:2, username: "블루", age: 30},
      {id:3, username: "퍼플", age: 20},
      {id:4, username: "핑크", age: 10}
    ]
  }
  function reducer(state,action){
    switch(action.type){
      case 'CHANGE_INPUT':
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.name]:action.value
          }
        };
      case 'CREATE_USER':
        return {
          inputs: state.inputs,
          users: [
            ...state.users,
            action.user
          ]
        }
        default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const {users} = state;
  const {username, userage} = state.inputs;
  const nextId = useRef(5);

  function onChange(e){
    const {name, value} = e.target;
    console.log(name,value);
    dispatch({
      type: 'CHANGE_INPUT',
      name: name,
      value: value
    })
  }

  function onCreate(){
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username: username,
        age: userage
      }
    })
    nextId.current = nextId.current+1;
    // setUsers([
    //   ...users,
    //   {id:nextId.current,
    //   username: username,
    // age: userage}
    // ])
  }

  return (
    <div className="App">
      <CreateUser onCreate={onCreate} onChange={onChange} username={username} userage={userage}/>
      <UserList users={users} />
    </div>
  );
}

export default App;
