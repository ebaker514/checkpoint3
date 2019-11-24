var validOptions = require('../testAssests/checkpoint3asset')
var cp3page

module.exports = {
    beforeEach: browser => {
        cp3page = browser.page.checkpoint3Page()
        cp3page.navigate()
    },
    after: browser => {
        browser.end()
    },
    'Confirm Valid Options': broswer => {
        var name = 'Billian'
        cp3page
            .confirmNameOptions(name, validOptions[0])
            .confirmPhoneOptions(name, validOptions[1])
            .confirmEmailOptions(name, validOptions[2])
            .confirmTitleOptions(name, validOptions[3])
    }
}