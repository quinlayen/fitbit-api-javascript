const express = require('express');
const qs = require('qs');
const request = require('sync-request')
const querystring = require('querystring')
const cons = require('consolidate')
const __ = require('underscore')
const app = express();



const redirect_uri = "https://1ae167e6.ngrok.io/callback"

app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', 'files/client');


let client = {
    "client_id": "22BBPF",
    "client_secret": "80e6d8dd5336d0a612de1d64067351f4"
}

app.get('/callback', (req, res) =>{
    
    const code = req.query.code;
    console.log('code: ', code)
    let form_data = qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri
    });

    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodeClientCredentials(client.client_id, client.client_secret)}`
    }
   
    let tokRes = request('POST', 'https://api.fitbit.com/oauth2/token', {
        body: form_data,
        headers
    })

    console.log('form_data: ', form_data)
    console.log('headers: ', headers)
    console.log('tokRes: ' ,tokRes)
    //if (tokRes.statusCode == tokRes.statusCode >= 200 && tokRes.statusCode < 300) {
        let body = JSON.parse(tokRes.getBody())
    
        access_token = body.access_token;
        console.log('Got access token: %s', body)
    res.send('<h1>access_token</h1>')
    //}


     //tokRes = request
})

var encodeClientCredentials = (clientId, clientSecret) => {
	return new Buffer.from(querystring.escape(clientId) + ':' + querystring.escape(clientSecret)).toString('base64');
};

app.listen(80, () => console.log('listening on port 80'))