import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/Colors'

type Props = {
    children: React.ReactNode
}

const Container = (props: Props) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {props.children}
            </View>
        </SafeAreaView>
    )
}

export default Container

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
    }
})