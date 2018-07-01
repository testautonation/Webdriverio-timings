module.exports = {
    "PERF_API_URL": "http://localhost/v2/api/cicd/",
    "api_timeout": 3000,
    "api_params": {
        "sla": {
            "pageLoadTime": 1000
        },
        "baseline": {
            "days": 7,
            "perc": 75,
            "padding": 1.2
        },
        "flags": {
            "assertBaseline": true,
            "debug": true,
            "esTrace": false,
            "esCreate": true,
            "passOnFailedAssert": false
        },
        "log": {
            "test_info": "Webdriverio tests",
            "env_tester": "Sample tester",
            "browser": "Chrome",
            "env_target": "Sample target",
            "team": "TestAutonation"
        }
    }
};