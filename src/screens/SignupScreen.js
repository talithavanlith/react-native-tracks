import React, {useContext } from 'react'
import {View, StyleSheet } from 'react-native'
import {Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import { NavigationEvents } from 'react-navigation'
import NavLink from '../components/NavLink'

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);


    return <View style={styles.container}>
        <NavigationEvents 
                // as soon as we navigate away from the screen we changed into
                onWillBlur={clearErrorMessage}
            />
        <AuthForm 
            headerText="Sign Up for Tracker"
            errorMessage={state.errorMessage}
            submitButtonText="Sign Up"
            onSubmit={signup}
        />
        <NavLink
            routeName="Signin"
            text="Already have an account? Sign in"
        />

    </View>;
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
});

export default SignupScreen;