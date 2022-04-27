import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Container } from '../../uikit'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TodoItem from '../components/TodoItem'
import { HomeStackParamList } from '../../navigation/HomeStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Todo, TodoList } from '../types'
import { UserContext } from '../../user/context'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

const Home = (props: Props) => {
    const { navigation } = props
    const userContext = useContext(UserContext);
    const { signOut, todos } = userContext
    const addNewTodo = () => {
        navigation.navigate('New')
    }

    const toggleTodoDetail = (index: number) => {
        navigation.navigate('Detail', {
            docId: index
        })
    }

    console.log({ todos });
    return (
        <Container>
            <TouchableOpacity onPress={signOut} style={{ position: 'absolute', top: 24, right: 32, zIndex: 1000 }}>
                <AntDesign name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.divider} />
                    <Text style={styles.text}>ToDO</Text>
                    <View style={styles.divider} />
                </View>
                <View style={{ marginTop: 45 }}>
                    <TouchableOpacity onPress={addNewTodo} style={styles.addList}>
                        <AntDesign name="plus" size={16} color={Colors.blue} />
                    </TouchableOpacity>
                    <Text style={styles.add}>Add List</Text>
                </View>
                <View style={{ height: 275, marginTop: 35 }}>
                    <FlatList
                        data={todos}
                        renderItem={({ item, index }) => (
                            <TodoItem
                                name={item.name}
                                color={item.color}
                                todos={item.todos}
                                index={index}
                                onPress={toggleTodoDetail}
                            />
                        )}
                        keyExtractor={(item) => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </Container>
    )
}

export default Home

const styles = StyleSheet.create({
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.ligthBlue,
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        color: Colors.black,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    addList: {
        borderWidth: 2,
        borderColor: Colors.ligthBlue,
        borderRadius: 4,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        fontSize: 14,
        color: Colors.blue,
        fontWeight: '600',
        paddingHorizontal: 10,
        marginTop: 10
    },
})