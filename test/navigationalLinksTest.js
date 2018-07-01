const assert = require('assert');
const timings = require('timings-client-js');
const perf = new timings.PUtils('timings.conf.js');

describe('WebdriverIO Navigation Links', () => {
    it('should go to Developer Guide page when choosing Developer Guide link', async () => {

        const perfParams = perf.getApiParams({}); //you can overwrite values in perf.js
        const injectJs = await perf.getInjectJS('navtiming', 'visual_complete', true); //Request inject code from API - `true` = strip querystring
        const injectCode = injectJs.data.inject_code;
        const injectCodeResponse = await browser
            .url('http://webdriver.io/')
            .waitForVisible('[alt="WebdriverIO"]')
            .click('=Developer Guide')
            .isVisible('[id="Developer-Guide"]')
            .execute('window.performance.mark("visual_complete");') // Set visual complete mark
            .execute(decodeURIComponent(injectCode)); // Inject JS code into browser object

        assert.equal(await browser.getUrl(), 'http://webdriver.io/guide.html');

        const injectCodeResponseValue = injectCodeResponse.value; // Grab the browser's response - has the perf data!
        const navtimingResponse = await perf.navtiming(injectCodeResponseValue, perfParams); // Send perf data to API

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data; // Grab the API's response - has the assert field!
            expect(apiResponse.assert, 'Performance failed! assert field is False \nNavtiming: '+JSON.stringify(apiResponse.export.perf, null, 2)).to.be.true; // Assert the result!
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }

    }, 2);

    it('should go to API page when choosing API link', async function () {

        const perfParams = perf.getApiParams({}); //overwrite values in perf.js
        const injectJs = await perf.getInjectJS('navtiming', 'visual_complete', true);
        const injectCode = injectJs.data.inject_code;
        const injectCodeResponse = await browser
            .url('http://webdriver.io/')
            .waitForVisible('[alt="WebdriverIO"]')
            .click('=API')
            .isVisible(('[id="WebdriverIO-API-Docs"]'))
            .execute('window.performance.mark("visual_complete");')
            .execute(decodeURIComponent(injectCode));

        assert.equal(await browser.getUrl(), 'http://webdriver.io/api.html');

        const injectCodeResponseValue = injectCodeResponse.value;
        const navtimingResponse = await perf.navtiming(injectCodeResponseValue, perfParams);
        // }

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data;
            expect(apiResponse.assert, 'Performance failed! assert field is False \nNavtiming: '+JSON.stringify(apiResponse.export.perf, null, 2)).to.be.true;
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }
    }, 2);

    it('should go to Contribute page when choosing Contribute link', async function () {
        const perfParams = perf.getApiParams({});
        const injectJs = await perf.getInjectJS('navtiming', 'visual_complete', true); //Request inject code from API - `true` = strip querystring
        const injectCode = injectJs.data.inject_code;

        const injectCodeResponse = await browser
            .url('http://webdriver.io')
            .waitForVisible('[alt="WebdriverIO"]')
            .click('=Contribute')
            .isVisible('[id="Contributing"]')
            .execute('window.performance.mark("visual_complete");')
            .execute(decodeURIComponent(injectCode));

        assert.equal(await browser.getUrl(), 'http://webdriver.io/contribute.html');

        const injectCodeResponseValue = injectCodeResponse.value;
        const navtimingResponse = await perf.navtiming(injectCodeResponseValue, perfParams);

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data;
            expect(apiResponse.assert, 'Performance failed! assert field is False \nNavtiming: '+JSON.stringify(apiResponse.export.perf, null, 2)).to.be.true;
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }
    }, 2);

    it('should go to Home page when choosing Home link', async function () {
        const perfParams = perf.getApiParams({});
        const injectJs = await perf.getInjectJS('navtiming', 'visual_complete', true);
        const injectCode = injectJs.data.inject_code;

        const injectCodeResponse = await browser
            .url('http://webdriver.io/api.html')
            .waitForVisible('[id="WebdriverIO-API-Docs"]')
            .click('=Home')
            .isVisible('[id="What-is-WebdriverIO"]')
            .execute('window.performance.mark("visual_complete");')
            .execute(decodeURIComponent(injectCode));

        assert.equal(await browser.getUrl(), 'http://webdriver.io/');

        const injectCodeResponseValue = injectCodeResponse.value;
        const navtimingResponse = await perf.navtiming(injectCodeResponseValue, perfParams);

        if (navtimingResponse.data) {
            const apiResponse = navtimingResponse.data;
            expect(apiResponse.assert, 'Performance failed! assert field is False \nNavtiming: '+JSON.stringify(apiResponse.export.perf, null, 2)).to.be.true;
        } else {
            console.error('API error: ' + JSON.stringify(navtimingResponse, null, 2));
        }
    }, 2);
});
