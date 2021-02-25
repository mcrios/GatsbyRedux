//Using Ducks
import { navigate } from "gatsby"
import axiosConfig from "../config/axiosConfig"

//constantes
const dataInicial = { data: [] }

const LOAD = "LOAD"

//reducer
export default function serverReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOAD:
            return { ...state, data: action.payload } 
        default:
            return state
    }
}

//acciones
export const cargarEstados = () => async (dispatch, getState) => {

    await axiosConfig({
        method: 'get',
        url: '/monitor/getEstado',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        dispatch({
            type: LOAD,
            payload: res.data.data
        })
        //navigate('/home/')
    }).catch(error => {
        console.log(error);
        navigate('/')
    })
}
