//Using Ducks
import { navigate } from "gatsby"
import axiosConfig from "../config/axiosConfig"
import { hideLoader } from "./alertReducer"

//constantes
const dataInicial = { parametros: [] }
const LOAD_PARAM = "LOAD_PARAM"
const ADD_PARAM = "ADD_PARAM"
const UPDATE_PARAM = "UPDATE_PARAM"
const DELETE_PARAM = "DELETE_PARAM"

//reducer
export default function paramsReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOAD_PARAM:
            return { ...state, parametros: action.payload }
        case ADD_PARAM:
            return { ...state, parametros: action.payload }
        case UPDATE_PARAM:
            return {
                ...state, parametros: state.parametros.map((par) => {
                    if (par.idpar === action.payload.idpar) {
                        return {
                            ...par,
                            grupo: action.payload.grupo,
                            codpar: action.payload.codpar,
                            valor: action.payload.valor
                        }
                    } else {
                        return par
                    }
                })
            }
        case DELETE_PARAM:
            return { ...state, parametros: state.parametros.filter((par) => par.idpar !== action.payload) }
        default:
            return state
    }
}


//acciones
export const cargarParametros = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/params',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        dispatch({
            type: LOAD_PARAM,
            payload: res.data.data
        })
        dispatch(hideLoader())
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const addParametro = (par) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/params/create',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: par
    }).then(res => {
        dispatch({
            type: ADD_PARAM,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const updateParametro = (par) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/params/update',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: par
    }).then(res => {
        dispatch({
            type: UPDATE_PARAM,
            payload: par
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const deleteParametro = (idpar) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/params/delete',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: idpar
    }).then(res => {
        dispatch({
            type: DELETE_PARAM,
            payload: idpar.idpar
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}