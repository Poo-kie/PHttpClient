import test from 'ava';
import express from 'express';
import { PHttpClient, PHttpResponse } from '../src/core/index';
import PXMLHttpRequestProvider from '../src/requestProviders/PXMLHttpRequestProvider';
import XMLHttpRequest from 'xhr2';
import bodyParser from 'body-parser';


let server = undefined;

test.before(t => {
    let app = express();
    app.use(bodyParser.text());

    app.all("/test", (req, res) => {
        res.send(req.body && req.body.length ? req.body : "test response");
    });
    
    try {
        server = app.listen(3000);
    }
    catch(e) {
        console.info(e);
    }
});

test.after(t => {
    if (server) server.close();
});

test('GET should return expected status', async t => {
    let requestProvider = new PXMLHttpRequestProvider(new XMLHttpRequest());
    let client = new PHttpClient(requestProvider);

    await client.get("http://localhost:3000/test", 2000)
        .then(r => {
            t.is(r.status, 200);
            t.is(r.statusText, "OK");
        })
        .catch(e => {
            t.fail();
        });
});

test('GET should return expected response', async t => {
    let requestProvider = new PXMLHttpRequestProvider(new XMLHttpRequest());
    let client = new PHttpClient(requestProvider);

    await client.get("http://localhost:3000/test", 2000)
        .then(r => {
            t.is(r.response, "test response");
            t.is(r.responseText, "test response");
        })
        .catch(e => {
            t.fail();
        });
});

test('POST should return expected status', async t => {
    let requestProvider = new PXMLHttpRequestProvider(new XMLHttpRequest());
    let client = new PHttpClient(requestProvider);

    await client.post("http://localhost:3000/test", 2000, "test string")
        .then(r => {
            t.is(r.status, 200);
            t.is(r.statusText, "OK");
        })
        .catch(e => {
            t.fail();
        });
});

test('POST should return expected response', async t => {
    let requestProvider = new PXMLHttpRequestProvider(new XMLHttpRequest());
    let client = new PHttpClient(requestProvider);

    await client.post("http://localhost:3000/test", 2000, "test string")
        .then(r => {
            t.is(r.response, "test string");
            t.is(r.responseText, "test string");
        })
        .catch(e => {
            t.fail();
        });
});