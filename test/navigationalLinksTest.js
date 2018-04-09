const assert = require('assert');
const timings = require('timings-client-js');
const perf = new timings.PUtils('timings.conf.js');

describe('WebdriverIO Navigation Links', () => {
    it('should go to Developer Guide page when choosing Developer Guide link', async () => {
        const perfParams = perf.getApiParams({sla: {pageLoadTime: 5000}, debug: true}); //overwrite values in perf.js
        const injectJs = await perf.getInjectJS('usertiming', '', true); //Request inject code from API - `true` = strip querystring
        const injectCode = injectJs.data.inject_code;

        const injectCodeResponse =
            //TEST STEPS
            await browser
                .url('http://webdriver.io')
                //.isVisible('[src="\\/images\\/webdriverio\\.png"]')
                .execute('performance.mark("demo_start");') // Set User Timing "start" mark
                .click('=Developer Guide')
                .waitForExist('[id="Developer-Guide"]')
                .execute('performance.mark("demo_stop");') // Set User Timing "stop" mark
                .execute(decodeURIComponent(injectCode));
        await assert.equal(await browser.getUrl(), 'http://webdriver.io/guide.html');

        const injectCodeResponseValue = injectCodeResponse.value; // Grab the browser's response - has the perf data!
        const navtimingResponse = await perf.usertiming(injectCodeResponseValue, perfParams); // Send perf data to API

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data; // Grab the API's response - has the assert field!
            console.error(this.test.title + ":\n" + JSON.stringify(apiResponse.export.perf, null, 2));
            expect(apiResponse.assert, 'Performance failed! assert field is False').to.be.true; // Assert the result!
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }

    }, 2);

    it('should go to API page when choosing API link', async function () {
        const perfParams = perf.getApiParams({sla: {pageLoadTime: 5000}, debug: true}); //overwrite values in perf.js
        const injectJs = await perf.getInjectJS('usertiming', '', true); //Request inject code from API - `true` = strip querystring
        const injectCode = injectJs.data.inject_code;

        const injectCodeResponse =
            //TEST STEPS
            await browser
                .url('http://webdriver.io')
                .execute('performance.mark("demo_start");') // Set User Timing "start" mark
                .click('=API')
                .waitForExist('[id="WebdriverIO-API-Docs"]')
                .execute('performance.mark("demo_stop");') // Set User Timing "stop" mark
                .execute(decodeURIComponent(injectCode));
        await assert.equal(await browser.getUrl(), 'http://webdriver.io/api.html');

        const injectCodeResponseValue = injectCodeResponse.value; // Grab the browser's response - has the perf data!
        const navtimingResponse = await perf.usertiming(injectCodeResponseValue, perfParams); // Send perf data to API

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data; // Grab the API's response - has the assert field!
            console.error(this.test.title + ":\n" + JSON.stringify(apiResponse.export.perf, null, 2));
            expect(apiResponse.assert, 'Performance failed! assert field is False').to.be.true; // Assert the result!
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }
     }, 2);

    it('should go to Contribute page when choosing Contribute link', async function () {
        const perfParams = perf.getApiParams({sla: {pageLoadTime: 5000}, debug: true}); //overwrite values in perf.js
        const injectJs = await perf.getInjectJS('usertiming', '', true); //Request inject code from API - `true` = strip querystring
        const injectCode = injectJs.data.inject_code;

        const injectCodeResponse =
            //TEST STEPS
            await browser
                .url('http://webdriver.io')
                .execute('performance.mark("demo_start");') // Set User Timing "start" mark
                .click('=Contribute')
                .waitForExist('[id="Contributing"]')
                .execute('performance.mark("demo_stop");') // Set User Timing "stop" mark
                .execute(decodeURIComponent(injectCode));

        await assert.equal(await browser.getUrl(), 'http://webdriver.io/contribute.html');

        const injectCodeResponseValue = injectCodeResponse.value; // Grab the browser's response - has the perf data!
        const navtimingResponse = await perf.usertiming(injectCodeResponseValue, perfParams); // Send perf data to API

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data; // Grab the API's response - has the assert field!
            console.error(this.test.title + ":\n" + JSON.stringify(apiResponse.export.perf, null, 2));
            expect(apiResponse.assert, 'Performance failed! assert field is False').to.be.true; // Assert the result!
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }
     }, 2);

    it('should go to Home page when choosing Home link', async function () {
        const perfParams = perf.getApiParams({sla: {pageLoadTime: 5000}, debug: true}); //overwrite values in perf.js
        const injectJs = await perf.getInjectJS('usertiming', '', true); //Request inject code from API - `true` = strip querystring
        const injectCode = injectJs.data.inject_code;

        const injectCodeResponse =
            //TEST STEPS
            await browser
                .url('http://webdriver.io/api.html')
                .execute('performance.mark("demo_start");') // Set User Timing "start" mark
                .click('=Home')
                .waitForExist('[id="What-is-WebdriverIO"]')
                .execute('performance.mark("demo_stop");') // Set User Timing "stop" mark
                .execute(decodeURIComponent(injectCode));

        await assert.equal(await browser.getUrl(), 'http://webdriver.io/');

        const injectCodeResponseValue = injectCodeResponse.value; // Grab the browser's response - has the perf data!
        const navtimingResponse = await perf.usertiming(injectCodeResponseValue, perfParams); // Send perf data to API

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data; // Grab the API's response - has the assert field!
            console.error(this.test.title + ":\n" + JSON.stringify(apiResponse.export.perf, null, 2));
            expect(apiResponse.assert, 'Performance failed! assert field is False').to.be.true; // Assert the result!
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }
     }, 2);

});
