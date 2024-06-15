import axios from 'axios'

export async function sendRequest(method, url, data = null, token) {
    let resData = { code: 500, message: 'api error' }
    let reqUrl = `${process.env.VUE_APP_API_BASE_URL}/${url}`
    console.log(reqUrl)
    try {
        if (method == 'get') {
            resData = await axios.get(reqUrl, {
                headers: {
                    'Authorization': token
                }
            })
        } else if (method == 'post') {
            resData = await axios.post(reqUrl, data, {
                headers: {
                    'Authorization': token
                }
            })
        }
    } catch (err) {
        if (err.response) {
            if (typeof err.response.data == 'string') {
                return resData
            }
            return err.response.data.data;
        } else {
            return resData
        }
    }

    return resData.data.data
}