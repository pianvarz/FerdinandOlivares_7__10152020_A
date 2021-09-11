class Apiclient {
    constructor() {
        this.baseUrl = 'http://localhost:3000/'
    }
    
    headers (options = {}) {
        const withContent = options.needsForm ? {} :
        { 'Content-Type': 'application/json' }
        return {
            ...withContent,
            Authorization: 'Bearer ' + localStorage.getItem('userToken')
        }
    }

    get(path) {
        return fetch(this.baseUrl + path, {
            headers: this.headers()
        }).then(res => {
            if (res.status === 401) {
                localStorage.clear()
                this.$router.push({ name: 'Login' })
            }
            return res.json()
        }).catch(() => alert('Cannot connect to the API, please try again later! '))
    }

    post (path, body, options= {}) {
        return fetch(this.baseUrl + path, {
            method: 'POST',
            body: options.needsForm ? body : JSON.stringify(body),
            headers: this.headers(options)
        }).then(res => this.regulateRes(res))
    }

    put (path, body, options = {}) {
        return fetch(this.baseUrl + path, {
            method: 'PUT',
            body: options.needsForm ? body : JSON.stringify(body),
            headers: this.headers(options)
        }).then(res => this.regulateRes(res))
    }

    delete (path) {
        return fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: this.headers()
        }).then(res => this.regulateRes(res))
    }

    async regulateRes (res) {
        if (!res.status.toString().match(/20[01]/))
        throw await res.json()
        return res.json()
    }
}

export const apiClient = new Apiclient()