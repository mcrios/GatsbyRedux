//Using Ducks
import { navigate } from "gatsby"
import axiosConfig from "../config/axiosConfig"

//constantes
const dataInicial = { data: [] }

const LOAD = "LOAD"
const LOADSERVERS = "LOADSERVERS"
const LOADURL = "LOADURL"
const ADD = "ADD"
const UPDATE = "UPDATE"
const DELETE = "DELETE"

//reducer
export default function serverReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOAD:
            return { ...state, data: action.payload }
        case LOADSERVERS:
            return { ...state, servidores: action.payload }
        case LOADURL:
            return { ...state, urlServer: action.payload }
        case ADD:
            return { ...state, servidores: state.servidores.concat(action.payload) }
        case UPDATE:
            return {
                ...state, servidores: state.servidores.map((server) => {
                    if (server.idser === action.payload.idser) {
                        return {
                            ...server,
                            nombre: action.payload.nombre,
                            descripcion: action.payload.descripcion
                        }
                    } else {
                        return server
                    }
                })
            }
        case DELETE:
            console.log("ID SERVER: " + action.payload)
            return { ...state, servidores: state.servidores.filter((server) => server.idser !== action.payload) }
        default:
            return state
    }
}

//acciones
export const cargarEstados = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/monitor/getEstado'
    }).then(res => {
        dispatch({
            type: LOAD,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error);
        navigate('/')
    })
}

export const cargarServidores = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/monitor/getServer'
    }).then(res => {
        dispatch({
            type: LOADSERVERS,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error);
        navigate('/')
    })
}

export const cargarUrlServer = (idser) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/monitor/getUrlServer',
        params: {"idser": idser}
    }).then(res => {
        dispatch({
            type: LOADURL,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error);
        navigate('/')
    })
}

export const agregarServer = (server) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/monitor/addServer',
        params: server
    }).then(res => {
        dispatch({
            type: ADD,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const actualizarServer = (server) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/monitor/updateServer',
        params: server
    }).then(res => {
        dispatch({
            type: UPDATE,
            payload: server
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const eliminarServer = (idser) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/monitor/deleteServer',
        params: {"idser": idser}
    }).then(res => {
        dispatch({
            type: DELETE,
            payload: idser
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}