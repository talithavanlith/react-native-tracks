import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import {AsyncStorage} from 'react-native'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return {errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return {token:null, errorMessage: ''};
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({type: 'signin', payload: token});
        navigate('TrackList');
    }else{
        navigate('Signup');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => {
    return async ({email, password}) => {
        // make api request to sign up with email and password
        try{
            const response = await trackerApi.post('/signup', {email, password});

            // if we sign up then modify state to say that we are authenticated/signed in   
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'signin', payload: response.data.token})

            navigate('TrackList');
        } catch (err){
            // if signing up fails we need to reflect an error message somehow/somewhere
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
        }


    }
}

const signin = (dispatch) => {
    return async ({email, password}) => {
        try{
            const response = await trackerApi.post('/signin', {email, password});

            // if we sign up then modify state to say that we are authenticated/signed in   
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'signin', payload: response.data.token})

            navigate('TrackList');
        } catch (err){
            // if signing in fails we need to reflect an error message somehow/somewhere
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' })
        }


    }
}

const signout = (dispatch) => {
    return async () => {
        try{

            // if we sign up then modify state to say that we are authenticated/signed in   
            await AsyncStorage.removeItem('token')
            dispatch({type: 'signout'})

            navigate('loginFlow');
        } catch (err){
            // if signing in fails we need to reflect an error message somehow/somewhere
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign out' })
        }


    }
}

export const {Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage: ''}
);