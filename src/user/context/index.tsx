import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, createContext, useState} from 'react';
import {TodoList} from '../../home/types';
import {FirebaseAuth} from '../../sdk';

export interface UserContextProps {
  getUser: () => FirebaseAuthTypes.User | null;
  registerUser: (email: string, password: string) => void;
  user: FirebaseAuthTypes.User | null;
  signOut: () => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  addTodo: (todo: string, color: string) => void;
  todos: Array<TodoList>;
  updateTodo: (todo: TodoList) => void;
  setTodos: (todos: Array<TodoList>) => void;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as UserContextProps);

const UserProvider = (props: ProviderProps) => {
  const firebase = new FirebaseAuth();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [todos, setTodos] = useState<Array<TodoList>>([]);
  const {children} = props;

  const getSnap = (querySnapshot: any) => {
    const todoList: Array<TodoList> = [];
    querySnapshot.forEach((doc: any) => {
      const docData = doc.data() as TodoList;
      docData.id = doc.id;
      if (Object.keys(docData).length > 0) {
        todoList.push(docData);
      }
    });
    setTodos(todoList);
  };

  const getUser = (): FirebaseAuthTypes.User | null => {
    return user;
  };

  const registerUser = async (email: string, password: string) => {
    const registerResult = await firebase.createUserWithEmailAndPassword(
      email,
      password,
    );
    if (registerResult.result) {
      setUser(registerResult.user);
    }
  };

  const signOut = async () => {
    await firebase.signOut();
    setUser(null);
    setTodos([]);
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    const signInResult = await firebase.signInWithEmailAndPassword(
      email,
      password,
    );
    if (signInResult?.result) {
      setUser(signInResult.user);
      getListTodo();
    }
  };

  const getListTodo = async () => {
    await firebase.getTodoList(getSnap);
  };

  const addTodo = async (todo: string, color: string) => {
    await firebase.createTodoList({
      name: todo,
      color: color,
      todos: [],
    });
  };

  const updateTodo = async (todo: TodoList) => {
    const response = await firebase.updateTodoList(todo);
  };

  useEffect(() => {
    getListTodo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUser,
        registerUser,
        user,
        signOut,
        signInWithEmailAndPassword,
        addTodo,
        todos,
        updateTodo,
        setTodos,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
