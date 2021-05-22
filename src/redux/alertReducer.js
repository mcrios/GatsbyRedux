//Using Ducks

//constantes
const data = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    type: 'success',
    message: '',
    loading: false
}

const SHOW_ALERT = "SHOW_ALERT"
const HIDE_ALERT = "HIDE_ALERT"
const SHOWLOADER = "SHOWLOADER"
const HIDELOADER = "HIDELOADER"


//reducer
export default function alertReducer(state = data, action) {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, data: action.payload }
        case HIDE_ALERT:
            return { ...state, data: action.payload }
        case SHOWLOADER:
            return { ...state, loading: true }
        case HIDELOADER:
            return { ...state, loading: false }
        default:
            return state
    }
}

//acciones
export const showAlert = (message) => async (dispatch, getState) => {
    dispatch({
        type: SHOW_ALERT,
        payload: {
            open: true,
            vertical: 'top',
            horizontal: 'center',
            message: message
        }
    })
}

export const hideAlert = () => async (dispatch, getState) => {
    dispatch({
        type: HIDE_ALERT,
        payload: {
            open: false,
            vertical: 'top',
            horizontal: 'center',
            message: ''
        }
    })
}

export const showLoader = () => async (dispatch, getState) => {
    dispatch({
        type: SHOWLOADER
    })
}

export const hideLoader = () => async (dispatch, getState) => {
    dispatch({
        type: HIDELOADER
    })
}