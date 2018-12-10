import { auth, googleProvider, database } from '../firebaseConfig'
import { getTasksFromDbAsyncAction } from './todo'


const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'
const EMAIL_CHANGE = 'auth/EMAIL_CHANGE'
const PASSWORD_CHANGE = 'auth/PASSWORD_CHANGE'

export const initAuthChangeListeningAction = () => (dispatch, getState) => {
    auth.onAuthStateChanged(

        user => {
            if (user) {
                dispatch(logInAction(user))
                dispatch(getTasksFromDbAsyncAction())

            } else {
                dispatch(logOutAction())
            }
        }
    )
}

export const logOutAsyncAction = () => (dispatch, getState) => {
    auth.signOut()
}

export const loginByGoogleAsyncAction = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
}

export const logInAsyncWithEmailAndPassword = () => (dispatch, getState) => {
    const { auth: { email, password } } = getState()

    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            alert('Something is wrong!')

        })

}

export const emailChangeAction = newValue => ({
    type: EMAIL_CHANGE,
    newValue
})
export const passwordChangeAction = newValue => ({
    type: PASSWORD_CHANGE,
    newValue
})

const logInAction = (user) => ({
    type: LOG_IN,
    user
})

const logOutAction = () => ({ type: LOG_OUT })

const INITIAL_STATE = {
    isUserLoggedIn: false,
    email: '',
    password: '',
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isUserLoggedIn: true,
                user: action.user
            }
        case LOG_OUT:
            return {
                ...state,
                isUserLoggedIn: false,
                user: null
            }
        case EMAIL_CHANGE:
            return {
                ...state,
                email: action.newValue
            }
        case PASSWORD_CHANGE:
            return {
                ...state,
                password: action.newValue
            }

        default:
            return state
    }
}