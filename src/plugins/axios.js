
import axios from 'axios'

export default {
    install: (app, options) => {
        window.axios = axios.create({
            baseURL: options.baseUrl,
        })
    }
}