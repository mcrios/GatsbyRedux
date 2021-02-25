import Axios from 'axios'

let instance = null
if (process.env.NODE_ENV === 'development') {
    //Pruebas
    instance = Axios.create({
        baseURL: 'http://172.17.81.22:8080/'
    })
} else {
    //Produccion
    // instance = Axios.create({
    //     baseURL: 'https://pagodev.premium.sv/apppaydev/'
    // })
    instance = Axios.create({
        baseURL: 'https://pago.premium.sv/apppay/'
    })
}


export default instance