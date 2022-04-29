class AuthService {
    async login() {
        console.log(process.env.REACT_APP_SPOTIFY_CLIENT_SECRET)


        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET)
            },
            body: 'grant_type=client_credentials'
        })
        const data = await result.json()
        return data.access_token
    }

    async fetchData(type: string, token: string) {
        return await fetch(`https://api.spotify.com/v1/browse/${type}`, {
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    return result
                },
                (error) => {
                    console.log("error")
                }
            )

    };


}

export default new AuthService();