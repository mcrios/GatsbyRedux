//Using Ducks
import { navigate } from "gatsby"
import axiosConfig from "../config/axiosConfig"

//constantes
const dataInicial = { usuarios: [], openModal: false }

const LOGIN = "LOGIN"
const ADD = "ADD"
const DELETE = "DELETE"
const UPDATE = "UPDATE"
const LOAD = "LOAD"
const COUNT = "COUNT"
const CONFIG = "CONFIG"

//reducer
export default function usuarioReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, usuario: action.payload }
        case ADD:
            return { ...state, usuarios: state.usuarios.concat(action.payload), openModal: false }
        case DELETE:
            return { ...state, usuarios: state.usuarios.filter((user) => user.id !== action.payload) }
        case CONFIG:
            return { ...state, usuarioConfig: action.payload }
        case UPDATE:
            return {...state, usuarios: state.usuarios.map((user) => {
                    if (user.id === action.payload.id) {
                        return {
                            ...user,
                            correo: action.payload.correo,
                            clave: action.payload.clave,
                            estado: action.payload.estado,
                            genero: action.payload.genero,
                            nombre: action.payload.nombre,
                            role: action.payload.role
                        }
                    } else {
                        return user
                    }
                })
            }
        case LOAD:
            return { ...state, usuarios: action.payload }
        case COUNT:
            return { ...state, contador: action.payload }    
        default:
            return state
    }
}

//acciones
export const obtenerToken = (data) => async (dispatch, getState) => {

    console.log(data)
    const params = { correo: data.email, clave: data.password }
    await axiosConfig.post('/usuarios/login', params)
        .then(res => {
            if (typeof window !== `undefined`)
                localStorage.setItem('token', 'Bearer ' + res.data.token)
            dispatch({
                type: LOGIN,
                payload: res.data.user
            })
            navigate('/home/')
        })
        .catch(error => {
            console.log(error.response);
            navigate('/')
        })
}

export const cargarUsuarios = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuarios/ver',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        dispatch({
            type: LOAD,
            payload: res.data
        })
        navigate('/home/')
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const contarUsuarios = () => async (dispatch, getState) => {
    await axiosConfig({
        method: 'get',
        url: '/usuarios/contar',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        //console.log(res.data)
        dispatch({
            type: COUNT,
            payload: res.data
        })
    }).catch(error => {
        console.log(error.response);
        //navigate('/')
    })
}

export const agregarUsuario = (user) => async (dispatch, getState) => {
    const params = new FormData()
    params.append('user', JSON.stringify(user))
    await axiosConfig({
        method: 'post',
        url: '/usuarios/crear ',
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        },
        data: params
    }).then(res => {
        dispatch({
            type: ADD,
            payload: res.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const eliminarUsuario = (user) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'delete',
        url: `/usuarios/eliminar/${user}`,
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        dispatch({
            type: DELETE,
            payload: user
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}


export const configurarUsuario = (user) => async (dispatch, getState) => {

    dispatch({
        type: CONFIG,
        payload: user
    })
}

export const actualizarUsuario = (user) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'put',
        url: '/usuarios/editar',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data: user
    }).then(res => {
        dispatch({
            type: UPDATE,
            payload: user
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}
