import React, { useContext } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { Colors, Container } from '../../uikit'
import { UserContext } from '../../user/context';

type Props = NativeStackScreenProps<HomeStackParamList, 'New'>

const AddScreen = (props: Props) => {
    const { navigation, route } = props;
    const colors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"]
    const userContext = useContext(UserContext);
    const [name, setName] = React.useState('');
    const [color, setColor] = React.useState(colors[0]);
    const { addTodo } = userContext

    const renderColors = () => {
        return colors.map((color, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={[styles.color, { backgroundColor: color }]}
                    onPress={() => {
                        setColor(color)
                    }}
                />
            )
        })
    }

    const createToDo = () => {
        addTodo(name, color)
        navigation.goBack()
    }

    return (
        <Container>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 64, right: 32 }}>
                    <AntDesign name="close" size={24} color={Colors.black} />
                </TouchableOpacity>
                <View style={{ alignSelf: 'stretch' }}>
                    <Text style={styles.title}>Create todo</Text>
                    <TextInput style={styles.input} value={name} onChangeText={(txt) => setName(txt)} placeholder="List name" />

                    <View style={styles.colorContainers}>
                        {renderColors()}
                    </View>

                    <TouchableOpacity onPress={createToDo} style={[styles.create, { backgroundColor: color }]}>
                        <Text style={styles.createText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Container>
    )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 16
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white
    },
    color: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    colorContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    }
})