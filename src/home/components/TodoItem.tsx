import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../uikit'
import { Todo, TodoList } from '../types'

type Props = {
    color: string,
    name: string,
    todos: Array<Todo>,
    index: number,
    onPress: (index: number) => void,
}

const TodoItem = (props: Props) => {
    const { color, name, todos, onPress, index } = props
    const cmpletedCount = todos.filter(todo => todo.completed).length
    const remainginCount = todos.length - cmpletedCount
    return (
        <TouchableOpacity onPress={() => onPress(index)}>
            <View style={[styles.list, { backgroundColor: color }]}>
                <Text numberOfLines={1} style={styles.listText}>{name}</Text>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{remainginCount}</Text>
                        <Text style={styles.subtitle}>{"remaingin"}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{cmpletedCount}</Text>
                        <Text style={styles.subtitle}>{"completed"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TodoItem

const styles = StyleSheet.create({
    list: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listText: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: '700',
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    }
})