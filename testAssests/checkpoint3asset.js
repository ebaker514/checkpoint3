module.exports = [
        [
            //This array is for valid names
            { value: '1', error: 'no' },
            { value: '123456789012345678901234567890', error: 'no' },
            { value: '1234567890123456789012345678901', error: 'yes' },
            { value: '123abc ABC $@!', error: 'no' }
        ],
        [
            //This array is for valid phones
            { value: '1', error: 'yes' },
            { value: '123456789', error: 'yes' },
            { value: '1234567890', error: 'no' },
            { value: '12345678901', error: 'yes' },
            { value: '123abc ABC $@!', error: 'yes' }
        ],
        [
            //This array is for valid emails
            { value: '1', error: 'yes' },
            { value: '1234567890123456789012345678901', error: 'yes' },
            { value: '1234567890@2345.789012345678901', error: 'yes' },
            { value: '1234567890@2345.78901234567890', error: 'no' },
            { value: '123abc ABC $@!', error: 'yes' }
        ],
        [
            //This array is for valid titles
            { value: '1', error: 'no' },
            { value: '123456789012345678901234567890', error: 'no' },
            { value: '1234567890123456789012345678901', error: 'yes' },
            { value: '123abc ABC $@!', error: 'no' }
        ]
    ]