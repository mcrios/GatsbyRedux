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
const ADDURL = "ADDURL"
const UPDATEURL = "UPDATEURL"
const DELETEURL = "DELETEURL"
const SETIDSER = "SETIDSER"

//reducer
export default function serverReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOAD:
            return { ...state, data: action.payload }
        case LOADSERVERS:
            return { ...state, servidores: action.payload }
        case LOADURL:
            return { ...state, urlServer: action.payload }
        case SETIDSER:
            return { ...state, idser: action.payload }
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
            return { ...state, servidores: state.servidores.filter((server) => server.idser !== action.payload) }
        case ADDURL:
            return { ...state, urlServer: state.urlServer.concat(action.payload) }
        case UPDATEURL:
            return {
                ...state, urlServer: state.urlServer.map((server) => {
                    if (server.idcon === action.payload.idcon) {
                        return {
                            ...server,
                            url: action.payload.url,
                            tipo: action.payload.tipo,
                            contrasena: action.payload.contrasena,
                            usuario: action.payload.usuario
                        }
                    } else {
                        return server
                    }
                })
            }
        case DELETEURL:
            return { ...state, urlServer: state.urlServer.filter((url) => url.idcon !== action.payload) }
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
        params: { "idser": idser }
    }).then(res => {
        if (res.data.data.length <= 0) {

            dispatch({
                type: LOADURL,
                payload: res.data.data
            })
            dispatch({
                type: SETIDSER,
                payload: idser
            })
        } else {
            dispatch({
                type: LOADURL,
                payload: res.data.data
            })
        }
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
        params: { "idser": idser }
    }).then(res => {
        dispatch({
            type: DELETE,
            payload: idser
        })
    }).catch(error => {
        console.log(error);
        navigate('/')
    })
}

export const agregarUrlServer = (url) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/monitor/addUrlServer',
        params: url
    }).then(res => {
        dispatch({
            type: ADDURL,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const actualizarUrlServer = (url) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/monitor/updateUrlServer',
        params: url
    }).then(res => {
        dispatch({
            type: UPDATEURL,
            payload: url
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const eliminarUrlServer = (idcon) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/monitor/deleteUrlServer',
        params: { "idcon": idcon }
    }).then(res => {
        dispatch({
            type: DELETEURL,
            payload: idcon
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}