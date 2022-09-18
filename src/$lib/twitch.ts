  export async function getAuthToken(clientID:string):Promise<string>{
    const authURL = 'https://id.twitch.tv/oauth2/token';
    const clientSecret = 'n8hlzpp8nmd0ly2xdof9xtio6lk3kc'
    
    const params = new URLSearchParams();
    params.append('client_id', clientID);
    params.append('client_secret', clientSecret)
    params.append('grant_type','client_credentials')
    
    const res = await fetch(authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })
    const data = await res.json();
    return data.access_token
  }

  