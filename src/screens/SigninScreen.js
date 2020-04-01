import React, {useContext} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { Context } from '../context/AuthContext'

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(Context);

    return (
        <View style={styles.container}>
            <NavigationEvents 
                // called instantly as soon as the button to change screens is called
                // onWillFocus={() => {}}
                // called as soon as we land on the screen we are going to
                // onDidFocus={() => {}}
                // as soon as we navigate away from the screen we changed into
                onWillBlur={clearErrorMessage}
                // as soon as we arrive back on this screen
                // onDidBlur={() => {}}
            />
            <AuthForm
                headerText="Sign In to your account"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={signin}
            />
            <NavLink 
                routeName="Signup"
                text="Don't have an account? Sign up instead"
            />
        </View>
    );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;