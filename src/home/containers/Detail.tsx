import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Swipeable} from 'react-native-gesture-handler';
import {Colors, Container} from '../../uikit';
import {HomeStackParamList} from '../../navigation/HomeStack';
import {Todo, TodoList} from '../types';
import {UserContext} from '../../user/context';

type Props = NativeStackScreenProps<HomeStackParamList, 'Detail'>;
type Flex = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
const Detail = (props: Props) => {
  const {navigation, route} = props;
  const {docId} = route.params;
  const [flexStyle, setFlexStyle] = useState<Flex>('flex-end');
  const [text, setText] = useState<string>('');
  const userContext = useContext(UserContext);
  const {updateTodo, todos} = userContext;
  const todo = todos[docId];
  const {name, color, todos: todoInList} = todo;
  const [todoList, setTodoList] = useState<Array<Todo>>([...todoInList]);
  const [todoTemp, setTodoTemp] = useState<TodoList>(todo);
  const taskCount = todoList.length;
  const completedCount = todoList.filter(item => item.completed).length;

  const goBackOnPress = () => {
    navigation.goBack();
  };

  const toggleTodoDetail = (index: number) => {
    const newTodo = [...todoList];
    newTodo[index].completed = !newTodo[index].completed;
    setTodoList(newTodo);
    todo.todos = todoList;
    updateTodo(todo);
  };

  const deleteTodo = (index: number) => {
    const newTodo = [...todoList]; // copy
    newTodo.splice(index, 1);
    setTodoList(newTodo);
    todoTemp.todos = [...newTodo];
    updateTodo(todo);
  };

  const renderRightActions = (
    dragX: Animated.AnimatedInterpolation,
    index: number,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });
    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Animated.View style={[styles.deleteButton, {opacity}]}>
          <Animated.Text
            style={{
              color: Colors.white,
              fontWeight: '800',
              transform: [{scale}],
            }}>
            <Ionicons name="ios-trash" size={30} color={Colors.white} />
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderTodo = ({item, index}: {item: Todo; index: number}) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => renderRightActions(dragX, index)}>
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => toggleTodoDetail(index)}>
            <Ionicons
              name={item.completed ? 'ios-square' : 'ios-square-outline'}
              style={{width: 32}}
              size={24}
              color={item.completed ? Colors.gray : Colors.black}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.todo,
              {
                textDecorationLine: item.completed ? 'line-through' : 'none',
                color: item.completed ? Colors.gray : Colors.black,
              },
            ]}>
            {item.title}
          </Text>
        </View>
      </Swipeable>
    );
  };

  const addTodo = () => {
    if (text.trim() === '') {
      return;
    }
    const newTodo: Todo = {
      title: text,
      completed: false,
    };
    todoList.push(newTodo);
    todo.todos = todoList;
    updateTodo(todo);
    setText('');
    Keyboard.dismiss();
  };

  return (
    <Container>
      <TouchableOpacity onPress={goBackOnPress} style={styles.closeButton}>
        <AntDesign name="close" size={24} color={Colors.black} />
      </TouchableOpacity>

      <View style={[styles.section, styles.header, {borderBottomColor: color}]}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={
              styles.taskCount
            }>{`${completedCount} de ${taskCount} tareas`}</Text>
        </View>
      </View>

      <View style={[styles.section, {flex: 3}]}>
        <FlatList
          data={todoList}
          renderItem={renderTodo}
          keyExtractor={item => item.title}
          contentContainerStyle={{
            paddingVertical: 64,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>

      <KeyboardAvoidingView
        style={[styles.section, styles.footer, {alignItems: flexStyle}]}
        behavior="padding">
        <TextInput
          onChangeText={txt => setText(txt)}
          value={text}
          onBlur={() => setFlexStyle('flex-end')}
          onFocus={() => setFlexStyle('flex-start')}
          style={[styles.input, {borderColor: color}]}
          placeholder="Agregar una tarea"
        />
        <TouchableOpacity
          onPress={addTodo}
          style={[styles.addTodo, {backgroundColor: color}]}>
          <AntDesign name="plus" size={16} color={Colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    borderBottomWidth: 3,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Colors.gray,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  todoContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  todo: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.black,
  },
  rightAction: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  action: {
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 32,
    zIndex: 1000,
  },
});
