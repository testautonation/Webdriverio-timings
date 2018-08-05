const assert = require('assert');
const timings = require('timings-client-js');
const perf = new timings.PUtils('timings.conf.js');

describe('ReactJS Navigation Links', async function () {
    it('should go to the Getting Started page when choosing Docs link', async function () {

        const perfParams = perf.getApiParams({sla: {pageLoadTime: 5000}}); //you can overwrite values in perf.js
        const injectJs = await perf.getInjectJS('usertiming', '', true); //Request inject code from API - `true` = strip querystring
        const injectCode = injectJs.data.inject_code;
        const injectCodeResponse = await browser
            .url('https://reactjs.org/')
            .execute('performance.mark("demo_start");') // Set User Timing "start" mark
            .click('=Docs')
            .isVisible('Getting Started')
            .execute('performance.mark("demo_stop");') // Set User Timing "stop" mark
            .execute(decodeURIComponent(injectCode)); // Inject JS code into browser object

        assert.equal(await browser.getUrl(), 'https://reactjs.org/docs/getting-started.html');

        const injectCodeResponseValue = injectCodeResponse.value; // Grab the browser's response - has the perf data!
        const usertimingResponse = await perf.usertiming(injectCodeResponseValue, perfParams); // Send perf data to API

        if (usertimingResponse.data) {
            const apiResponse = usertimingResponse.data; // Grab the API's response - has the assert field!
            expect(apiResponse.assert, 'Performance failed! assert field is False \nNavtiming: ' + JSON.stringify(apiResponse.export.perf, null, 2)).to.be.true; // Assert the result!
        } else {
            console.error('API error: ' + JSON.stringify(usertimingResponse, null, 2));
        }

    });


});
