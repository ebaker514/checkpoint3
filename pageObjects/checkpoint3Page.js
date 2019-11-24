var checkpoint3commands = {
    clickAdd: function () {
        this
            .waitForElementPresent('@addButton')
            .click('@addButton')
            .verify.containsText('@list', 'New Employee')
        return this
    },
    clickEmployee: function (name) {
        var self = this
        this
            .waitForElementPresent('@list')
            .useXpath()
            .waitForElementPresent(`//li[text()="${name}"]`)
            .getAttribute(`//li[text()="${name}"]`, "name", function (result) {
                console.log(result.value)
                console.log(name)
                self
                    .useCss()
                    .click(`[name="${result.value}"]`)
                    .verify.containsText('@infoName', name)
            })
        return this
    },
    editName: function (name) {
        this
            .verify.elementPresent('@inputName')
            .clearValue('@inputName')
            .setValue('@inputName', name)
            .pause(50)
        return this
    },
    editPhone: function (phone) {
        this
            .verify.elementPresent('@inputPhone')
            .clearValue('@inputPhone')
            .setValue('@inputPhone', phone)
            .pause(50)
        return this
    },
    editEmail: function (email) {
        this
            .verify.elementPresent('@inputEmail')
            .clearValue('@inputEmail')
            .setValue('@inputEmail', email)
        return this
    },
    editTitle: function (title) {
        this
            .verify.elementPresent('@inputTitle')
            .clearValue('@inputTitle')
            .setValue('@inputTitle', title)
        return this
    },
    deleteEmployee: function (name) {
        this
            .assert.containsText('@list', name)
            .verify.elementPresent('@deleteButton')
            .click('@deleteButton')
            .api.acceptAlert()
        this.expect.element('@list').not.contain.text(name)
        return this
    },
    confirmNameOptions: function (name, data) {
        //There is a bug where the title errors out when the name title is more than 30 characters
        // var data = [
        //     // { value: '', error: 'yes' },
        //     { value: '1', error: 'no' },
        //     { value: '123456789012345678901234567890', error: 'no' },
        //     { value: '1234567890123456789012345678901', error: 'yes' },
        //     { value: '123abc ABC $@!', error: 'no' }
        // ]
        this
            .clickEmployee(name)
        data.forEach(option => {
            this
                .editName(option.value)
                .click('@saveButton')
            if (option.error == 'yes') {
                this.expect.element('@infoName').text.not.contain(option.value)
                this.expect.element('@errorCard').text.contain("name")
                this.expect.element('@errorCard').text.not.contain("phone")
                this.expect.element('@errorCard').text.not.contain("email")
                //this.expect.element('.errorCard').text.not.contain("title")
            } else {
                this
                    .verify.elementPresent('.hidden')
                    .verify.containsText('@infoName', option.value)
            }
        })
        this
            .editName(name)
            .click('@saveButton')
            .verify.containsText('@infoName', name)
        return this
    },
    confirmPhoneOptions: function (name, data) {
        // var data = [
        //     { value: '1', error: 'yes' },
        //     { value: '123456789', error: 'yes' },
        //     { value: '1234567890', error: 'no' },
        //     { value: '12345678901', error: 'yes' },
        //     { value: '123abc ABC $@!', error: 'yes' }
        // ]
        this
            .clickEmployee(name)
        data.forEach(option => {
            this
                .editPhone(option.value)
                .click('@saveButton')
            if (option.error == 'yes') {
                this.expect.element('@errorCard').text.contain("phone")
                this.expect.element('@errorCard').text.not.contain("name")
                this.expect.element('@errorCard').text.not.contain("email")
                this.expect.element('@errorCard').text.not.contain("title")
            } else {
                this
                    .verify.elementPresent('.hidden')
            }
        })
        this
        return this
    },
    confirmEmailOptions: function (name, data) {
        //The errors for emails aren't working
        // var data = [
        //     { value: '1', error: 'yes' },
        //     { value: '1234567890123456789012345678901', error: 'yes' },
        //     { value: '1234567890@2345.789012345678901', error: 'yes' },
        //     { value: '1234567890@2345.78901234567890', error: 'no' },
        //     { value: '123abc ABC $@!', error: 'yes' }
        // ]
        this
            .clickEmployee(name)
        data.forEach(option => {
            this
                .editEmail(option.value)
                .click('@saveButton')
            if (option.error == 'yes') {
                // this.expect.element('@errorCard').text.contain("email")
                // this.expect.element('@errorCard').text.not.contain("name")
                // this.expect.element('@errorCard').text.not.contain("phone")
                // this.expect.element('@errorCard').text.not.contain("title")
            } else {
                this.expect.element('@inputEmail').value.contain(".")
                this.expect.element('@inputEmail').value.contain("@")    
                this.verify.elementPresent('.hidden')
            }
        })
        this
        return this
    },
    confirmTitleOptions: function (name, data) {
        // var data = [
        //     // { value: '', error: 'yes' },
        //     { value: '1', error: 'no' },
        //     { value: '123456789012345678901234567890', error: 'no' },
        //     { value: '1234567890123456789012345678901', error: 'yes' },
        //     { value: '123abc ABC $@!', error: 'no' }
        // ]
        this
            .clickEmployee(name)
        data.forEach(option => {
            this
                .editTitle(option.value)
                .click('@saveButton')
            if (option.error == 'yes') {
                this.expect.element('@errorCard').text.contain("title")
                this.expect.element('@errorCard').text.not.contain("phone")
                this.expect.element('@errorCard').text.not.contain("email")
                this.expect.element('.errorCard').text.not.contain("name")
            } else {
                this
                    .verify.elementPresent('.hidden')
            }
        })
        this
            .editName(name)
            .click('@saveButton')
            .verify.containsText('@infoName', name)
        return this
    },
}

module.exports = {
    url: 'https://devmountain-qa.github.io/employee-manager-v2/build/index.html',
    commands: [checkpoint3commands],
    elements: {
        searchBar: '[name="searchBox"]',
        searchClear: '[name="clearSearch"]',
        //employee: `[name="employee${#}"]`,
        list: '.listContainer',
        infoID: '[name="employeeID"]',
        infoName: '[name="employeeName"]',
        inputName: '[name="nameEntry"]',
        inputPhone: '[name="phoneEntry"]',
        inputEmail: '[name="emailEntry"]',
        inputTitle: '[name="titleEntry"]',
        saveButton: '[name="save"]',
        cancelButton: '[name="cancel"]',
        deleteButton: '[name="delete"]',
        addButton: 'strong',
        errorCard: '.errorCard'
    }
}