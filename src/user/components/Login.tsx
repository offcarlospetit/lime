import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors, Container } from '../../uikit'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginStackParamList } from '../../navigation/LoginStack'
import { UserContext } from '../context'

type Props = NativeStackScreenProps<LoginStackParamList, 'Login'>

const Login = (props: Props) => {
    const { navigation } = props
    const [email, setEmail] = useState('ca.alberto.p@gmail.com')
    const [password, setPassword] = useState('123456')
    const [isLoading, setIsLoading] = useState(false)
    const userContext = useContext(UserContext);
    const { user, signInWithEmailAndPassword } = userContext
    const goToRegister = () => {
        navigation.navigate('Register')
    }
    const submitLogin = () => {
        setIsLoading(true)
        signInWithEmailAndPassword(email, password)
    }


    return (
        <Container>
            <View style={styles.container}>
                <View style={{ marginTop: 20 }}>
                    <Text>Login</Text>
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
                    <Button title="Login" onPress={submitLogin} />
                    <ActivityIndicator style={{ display: isLoading && !user ? 'flex' : 'none' }} size="large" animating={true} color={Colors.ligthBlue} />

                </View>
            </View>
            <Button title="Register" onPress={goToRegister} />
        </Container>
    )
}

export default Login

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