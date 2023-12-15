import login from './login'
const awx = wx.async(['request'])
const app = getApp()

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class Fetch {
    async fetch(option) {
        const { url, method, data = {}, header = {}, allRquest = false } = option
        let baseUrl = app.globalData.apiUrl
        header.session_id = app.globalData.session_id
        if (header.session_id) {
            try {
                const res = await awx.request({ method, url: `${baseUrl}${url}`, header, data })
                return allRquest ? res : res.data
            } catch (err) {
                throw err
            }
        } else {
            try {
                await login()
                header.session_id = app.globalData.session_id
                const res = await awx.request({ method, url: `${baseUrl}${url}`, header, data })
                return allRquest ? res : res.data
            } catch (err) {
                throw err
            }
        }
    }

    get(url, data) {
        return this.fetch({ url, method: METHOD.GET, data })
    }

    post(url, data, allRquest) {
        return this.fetch({ url, method: METHOD.POST, data, allRquest })
    }

    put(url, data) {
        return this.fetch({ url, method: METHOD.PUT, data })
    }

    delete(url, data) {
        return this.fetch({ url, method: METHOD.DELETE, data })
    }

    all(tasks) {
        return Promise.all(tasks)
    }
}
const fetch = new Fetch()

export default fetch