import UserList from './components/UserList';
import React, {useState, useRef, useReducer} from "react";
import CreateUser from './components/CreateUser';
import useInputs from './components/hooks/useInputs';

//UserDispatch라는 context를 생성하고 내보내기
export const UserDispatch = React.createContext(null);
function App() {
  const initialState = {
    users: [
      {id:1, username: "그린", age: 40},
      {id:2, username: "블루", age: 30},
      {id:3, username: "퍼플", age: 20},
      {id:4, username: "핑크", age: 10}
    ]
  }
  function reducer(state,action){
    switch(action.type){
      case 'CREATE_USER':
        return {
          users: [
            ...state.users,
            action.user
          ]
        }
      case 'MEMBER_TOGGLE':
        return {
          users: state.users.map(user=>
            user.id === action.id ? {...user, member:!user.member}: user)
        }
      case 'MEMBER-DELETE':
        return {
          users: state.users.filter(user=> user.id !== action.id)
        }  
        default:
        return state;
    }
  }
  const [{username, userage} , onChange, reset ] = useInputs({
    username: '',
    userage: ''
  })
  const [state, dispatch] = useReducer(reducer, initialState)
  const {users} = state;
  const nextId = useRef(5);

  function onCreate(){
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username: username,
        age: userage,
        member: false
      }
    })
    nextId.current = nextId.current+1;
  }
  function onToggle(id){
    dispatch({
      type: 'MEMBER_TOGGLE',
      id: id
    })
  }
  function onDelete(id){
    dispatch({
      type: 'MEMBER-DELETE',
      id: id
    })
  }
  return (
    <UserDispatch.Provider value={dispatch}>
    <div className="App">
      <CreateUser onCreate={onCreate} onChange={onChange} username={username} userage={userage}/>
      <UserList users={users} />
    </div>
    </UserDispatch.Provider>
  );
}

export default App;
