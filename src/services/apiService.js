import axios from 'axios'

export async function sendRequest(method, url, data = null) {
    let resData = { status: 500, message: 'api error' }
    let reqUrl = `${process.env.VUE_APP_API_BASE_URL}/${url}`

    try {
        if (method == 'get') {
            resData = await axios.get(reqUrl)
            return resData.data
        } else if (method == 'post') {
            resData = await axios.post(reqUrl, data)
            return resData.data
        }
    } catch (err) {
        // console.log(err)
    }

    return resData
}