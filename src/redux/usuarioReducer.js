//Using Ducks
import { navigate } from "gatsby"
import axiosConfig from "../config/axiosConfig"
import { showAlert } from "./alertReducer"

//constantes
const dataInicial = { usuarios: [], loading: false }

const LOGIN = "LOGIN"
const ADD_USER = "ADD_USER"
const ADD_ROL = "ADD_ROL"
const ADD_OPCION_ROL = "ADD_OPCION_ROL"
const ADD_ROL_USER = "ADD_ROL_USER"
const DELETE_USER = "DELETE_USER"
const DELETE_ROL_USER = "DELETE_ROL_USER"
const DELETE_ROL = "DELETE_ROL"
const DELETE_OPCION_ROL = "DELETE_OPCION_ROL"
const DELETE_MENU = "DELETE_MENU"
const UPDATE_USER = "UPDATE_USER"
const LOAD_USER = "LOAD_USER"
const LOAD_ACCESOS_USER = "LOAD_ACCESOS_USER"
const LOAD_ROLES_USER = "LOAD_ROLES_USER"
const LOAD_ROLES = "LOAD_ROLES"
const LOAD_ROLES_AVAIL = "LOAD_ROLES_AVAIL"
const LOAD_OPCIONES_ROL = "LOAD_OPCIONES_ROL"
const LOAD_OPCIONES_ROL_AVAIL = "LOAD_OPCIONES_ROL_AVAIL"
const COUNT_USER = "COUNT_USER"
const CONFIG_USER = "CONFIG_USER"
const SHOWLOADER = "SHOWLOADER"
const SETIDUSR = "SETIDUSR"
const SETCODROL = "SETCODROL"

//reducer
export default function usuarioReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, usuario: action.payload }
        case ADD_USER:
            return { ...state, usuarios: state.usuarios.concat(action.payload) }
        case ADD_ROL:
            return { ...state, roles: action.payload }
        case ADD_ROL_USER:
            return { ...state, rolesUsuario: action.payload.roles }
        case ADD_OPCION_ROL:
            return { ...state, opcionesRol: action.payload.opcionesRol }
        case DELETE_USER:
            return { ...state, usuarios: state.usuarios.filter((user) => user.idusr !== action.payload) }
        case DELETE_ROL:
            return { ...state, roles: state.roles.filter((rol) => rol.codrol !== action.payload) }
        case DELETE_ROL_USER:
            return { ...state, rolesUsuario: action.payload.rolesUsuario }
        case DELETE_OPCION_ROL:
            return { ...state, opcionesRol: action.payload.opcionesRol }
        case DELETE_MENU:
            return { ...state, opcionesRol: action.payload.opcionesRol }
        case CONFIG_USER:
            return { ...state, usuarioConfig: action.payload }
        case UPDATE_USER:
            return {
                ...state, usuarios: state.usuarios.map((user) => {
                    if (user.idusr === action.payload.idusr) {
                        return {
                            ...user,
                            codusr: action.payload.codusr,
                            correo: action.payload.correo,
                            clave: action.payload.clave,
                            clave_old: action.payload.clave_old,
                            estado: action.payload.estado,
                            nombre: action.payload.nombre
                        }
                    } else {
                        return user
                    }
                })
            }
        case LOAD_USER:
            return { ...state, usuarios: action.payload, loading: false }
        case LOAD_ROLES_USER:
            return { ...state, rolesUsuario: action.payload }
        case LOAD_ROLES:
            return { ...state, roles: action.payload }
        case LOAD_OPCIONES_ROL:
            return { ...state, opcionesRol: action.payload }
        case LOAD_OPCIONES_ROL_AVAIL:
            return { ...state, opcionesRolAvail: action.payload }
        case LOAD_ROLES_AVAIL:
            return { ...state, rolesAvail: action.payload }
        case LOAD_ACCESOS_USER:
            return { ...state, accesosUsuario: action.payload }
        case COUNT_USER:
            return { ...state, contador: action.payload }
        case SHOWLOADER:
            return { ...state, loading: true }
        case SETIDUSR:
            return { ...state, idusr: action.payload }
        case SETCODROL:
            return { ...state, codrol: action.payload }
        default:
            return state
    }
}

//acciones
export const obtenerToken = (data, isSubmiting) => async (dispatch, getState) => {

    const params = new FormData()
    params.append("username", data.username)
    params.append("password", data.password)
    await axiosConfig.post('/auth/login', params)
        .then(res => {
            if (typeof window !== `undefined`)
                localStorage.setItem('token', 'Bearer ' + res.data.data.token)
            dispatch({
                type: LOGIN,
                payload: res.data.data.usuario
            })
            navigate('/home/')
        })
        .catch(error => {
            isSubmiting(false)
            dispatch(showAlert(typeof error.response != 'undefined' ? error.response.data.mensajeRetorno : "OCURRIO UN ERROR, VUELVA A INTENTARLO"))
            navigate('/')
        })
}

export const cargarUsuarios = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuario/list',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        dispatch({
            type: LOAD_USER,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const cargarRolesAvail = (idusr) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuario/roles-avail',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: { 'idusr': idusr }
    }).then(res => {

        dispatch({
            type: SETIDUSR,
            payload: idusr
        })
        dispatch({
            type: LOAD_ROLES_AVAIL,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const cargarRoles = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuario/roles',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        dispatch({
            type: LOAD_ROLES,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const cargarRolesUsuario = (idusr) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuario/roles-usuario',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: { 'idusr': idusr }
    }).then(res => {
        dispatch({
            type: LOAD_ROLES_USER,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const cargarOpcionesRoles = (codrol) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuario/accesoRoles',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: { 'codrol': codrol }
    }).then(res => {
        dispatch({
            type: SETCODROL,
            payload: codrol
        })
        dispatch({
            type: LOAD_OPCIONES_ROL,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const cargarOpcionesAvial = (codrol) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuario/accesoRolesAvial',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: { 'codrol': codrol }
    }).then(res => {
        dispatch({
            type: SETCODROL,
            payload: codrol
        })
        dispatch({
            type: LOAD_OPCIONES_ROL_AVAIL,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

// export const contarUsuarios = () => async (dispatch, getState) => {
//     await axiosConfig({
//         method: 'get',
//         url: '/usuarios/contar',
//         headers: {
//             Authorization: localStorage.getItem('token')
//         }
//     }).then(res => {
//         //console.log(res.data)
//         dispatch({
//             type: COUNT,
//             payload: res.data
//         })
//     }).catch(error => {
//         console.log(error.response);
//         //navigate('/')
//     })
// }

export const agregarUsuario = (user) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/usuario/create',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: user
    }).then(res => {
        dispatch({
            type: ADD_USER,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        //navigate('/')
    })
}

export const agregarRol = (rol) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/usuario/addRol',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: rol
    }).then(res => {
        dispatch({
            type: ADD_ROL,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        //navigate('/')
    })
}

export const agregarOpcionRol = (opcionRol) => async (dispatch, getState) => {
    console.log(opcionRol)
    await axiosConfig({
        method: 'post',
        url: '/usuario/addOpcionRol',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: opcionRol
    }).then(res => {
        dispatch({
            type: ADD_OPCION_ROL,
            payload: { "opcionesRol": res.data.data, "idopc": opcionRol.idopc }
        })
    }).catch(error => {
        console.log(error.response);
        dispatch(showAlert("Error: " + error.response.data))
        //navigate('/')
    })
}

export const agregarRolUsuario = (rolUser) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/usuario/addRolUser',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: rolUser
    }).then(res => {
        console.log(res);
        dispatch({
            type: ADD_ROL_USER,
            payload: { "roles": res.data.data, "codrol": rolUser.codrol }
        })
    }).catch(error => {
        console.log(error);
        //navigate('/')
    })
}

export const agregarMenu = (menu) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/usuario/addMenu',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: menu
    }).then(res => {
        dispatch({
            type: LOAD_OPCIONES_ROL,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        //navigate('/')
    })
}

export const actualizarUsuario = (user) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: '/usuario/update',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: user
    }).then(res => {
        dispatch({
            type: UPDATE_USER,
            payload: res.data.data[0]
        })
    }).catch(error => {
        console.log(error.response);
        //navigate('/')
    })
}

export const eliminarUsuario = (idusr) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: `/usuario/delete`,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: { 'idusr': idusr }
    }).then(res => {
        dispatch({
            type: DELETE_USER,
            payload: idusr
        })
    }).catch(error => {
        console.log(error.response);
        navigate('/')
    })
}

export const eliminarRolUsuario = (rol) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: `/usuario/deleteRolUsuario`,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: rol
    }).then(res => {
        dispatch({
            type: DELETE_ROL_USER,
            payload: { "idusrl": rol.idusrl, "rolesUsuario": res.data.data }
        })
    }).catch(error => {
        console.log(error);
        dispatch(showAlert("Error: " + typeof error.response !== 'undefined' && typeof error !== 'undefined' ? error.response.data : "NO SE LOGRO COMPLETAR SU PETICION"))
    })
}

export const eliminarOpcionRol = (opcionRol) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: `/usuario/deleteOpcionRol`,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: opcionRol
    }).then(res => {
        dispatch({
            type: DELETE_OPCION_ROL,
            payload: { "idopr": opcionRol.idopr, "opcionesRol": res.data.data }
        })
    }).catch(error => {
        console.log(error.response);
        dispatch(showAlert("Error: " + error.response.data))
    })
}

export const eliminarRol = (codrol) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: `/usuario/deleteRol`,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: { 'codrol': codrol }
    }).then(res => {
        dispatch({
            type: DELETE_ROL,
            payload: codrol
        })
        dispatch(showAlert("Rol eliminado exitosamente"))
    }).catch(error => {
        console.log(error.response)
        dispatch(showAlert("Error: " + error.response.data))
        //navigate('/')
    })
}

export const eliminarMenu = (menu) => async (dispatch, getState) => {

    await axiosConfig({
        method: 'post',
        url: `/usuario/deleteMenu`,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: menu
    }).then(res => {
        dispatch({
            type: DELETE_MENU,
            payload: { "opcionesRol": res.data.data }
        })
        dispatch(showAlert("Menu eliminado exitosamente"))
    }).catch(error => {
        console.log(error.response)
        dispatch(showAlert("Error: " + error.response.data))
        //navigate('/')
    })
}

export const cargarAccesosUsuario = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/usuario/accesosUsuario',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        dispatch({
            type: LOAD_ACCESOS_USER,
            payload: res.data.data
        })
    }).catch(error => {
        console.log(error.response);
        //navigate('/')
    })
}