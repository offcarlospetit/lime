import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors, Container } from '../../uikit'
import { LoginStackParamList } from '../../navigation/LoginStack'
import { UserContext } from '../context'

type Props = NativeStackScreenProps<LoginStackParamList, 'Register'>


const Register = (props: Props) => {
    const [email, setEmail] = useState('ca.alberto.p@gmail.com')
    const [password, setPassword] = useState('123456')
    const userContext = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)
    const { registerUser, user } = userContext

    const handleRegister = () => {
        setIsLoading(true)
        registerUser(email, password)
    }

    return (
        <Container>
            <View style={styles.container}>
                <View style={{ marginTop: 20 }}>
                    <Text>Register</Text>
                    <TextInput
                        autoComplete='email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Button title="Register" onPress={handleRegister} />
                    <ActivityIndicator style={{ display: isLoading && !user ? 'flex' : 'none' }} size="large" animating={true} color={Colors.ligthBlue} />

                </View>
            </View>
        </Container>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
        marginVertical: 16
    },
})