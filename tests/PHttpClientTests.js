import test from 'ava';
import { PHttpClient, PHttpResponse } from '../src/core/index';
import PStubHttpRequestProvider from '../src/requestProviders/PStubHttpRequestProvider'

test('GET request should be resolved when stub provider is used with empty ctor', async t => {
    let requestProvider = new PStubHttpRequestProvider();
    let client = new PHttpClient(requestProvider);

    await client.get("url", 2000)
        .then(r => t.pass())
        .catch(e => t.fail());
});

test('GET request should resolve specified object when stub provider is used with response', async t => {
    let response = new PHttpResponse();
    response.status = 200;
    response.statusText = "OK";

    let requestProvider = new PStubHttpRequestProvider(response);
    let client = new PHttpClient(requestProvider);

    await client.get("url", 2000)
        .then(r => {
            t.deepEqual(r, response);
        })
        .catch(e => t.fail());
});

test('GET request should be rejected when stub provider specifies rejection', async t => {
    let requestProvider = new PStubHttpRequestProvider(undefined, true);
    let client = new PHttpClient(requestProvider);

    await client.get("url", 2000)
        .then(r => t.fail())
        .catch(e => t.pass());
});

test('GET request should reject with specified object when stub provider is used with response and rejection', async t => {
    let response = new PHttpResponse();
    response.status = 401;
    response.statusText = "Unauthorized";

    let requestProvider = new PStubHttpRequestProvider(response, true);
    let client = new PHttpClient(requestProvider);

    await client.get("url", 2000)
        .then(r => {
            t.fail();
        })
        .catch(e => {
            t.deepEqual(e, new Error('{"status":401,"statusText":"Unauthorized"}'));
        });
});