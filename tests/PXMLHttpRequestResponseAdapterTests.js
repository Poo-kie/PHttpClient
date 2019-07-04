import test from 'ava';
import express from 'express';
import { PHttpClient, PHttpResponse } from '../src/core/index';
import PXMLHttpRequestProvider from '../src/requestProviders/PXMLHttpRequestProvider';
import XMLHttpRequest from 'xhr2';

let app = express();
let server = undefined;

test.beforeEach(t => {
    app.get("/test", (req, res) => {
        res.send("GET test response");
    });    
    
    server = app.listen(3000);
});

test.afterEach(t => {
    server.close();
});

test('GET should', async t => {
    let requestProvider = new PXMLHttpRequestProvider(new XMLHttpRequest());
    let client = new PHttpClient(requestProvider);

    await client.get("http://localhost:3000/test", 2000)
        .then(r => {
            t.pass();
        })
        .catch(e => {
            console.info(e);
            t.fail();
        });
});