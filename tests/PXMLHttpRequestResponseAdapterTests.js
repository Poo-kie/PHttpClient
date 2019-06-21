import test from 'ava';
import express from 'express';
import { PHttpClient, PHttpResponse } from '../src/core/index';
import PXMLHttpRequestProvider from '../src/requestProviders/PXMLHttpRequestProvider';
import * as XHR from 'xmlhttprequest';

const app = express();

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

app.listen(3000);

test('GET should', async t => {
    let xhr = XHR.XMLHttpRequest;
    let requestProvider = new PXMLHttpRequestProvider(new xhr());
    let client = new PHttpClient(requestProvider);

    await client.get("http://localhost:3000/user", 2000)
        .then(r => t.pass())
        .catch(e => {
            console.info(e);
            t.fail();
        });
});