if (window.localStorage.getItem('defaultValues') === null) {
    window.localStorage.setItem('defaultValues', JSON.stringify({
        merchant: '/4S+YXsW7LBo6AjAg4VCQA==',
        secretKey: '4439cea5b6e8bd963d2c2dbeb1c57918e02f616068df0bbec3c77a82a8e7dbce',
        merchantCode: '20000023',
        environment: 'https://webqa.cenpos.net/simplewebpay/',
        mechantsData: [
            {
                merchant: 'MzrC/gl6VwS67JrIE+Kyng==',
                merchantCode: '577',
                secretKey: '7f127fdad955567d93861c206027e6b7796592645692c77375666ef00629b230'
            },
            {
                merchant: '/4S+YXsW7LBo6AjAg4VCQA==',
                merchantCode: '20000023',
                secretKey: '4439cea5b6e8bd963d2c2dbeb1c57918e02f616068df0bbec3c77a82a8e7dbce'
            }
        ],
        environments: [
            {
                    value: 'https://webtest.cenpos.net/simplewebpay/',
                    text: 'Dev'
            },
            {
                value: 'https://webqa.cenpos.net/simplewebpay/',
                text: 'QA'
            }
        ],
        email: 'julian.perdomo@cenposd365.com',
        cardNumber: '4545454555455',
        expirationDateMonth: 12,
        expirationDateYear: 23,
        cardHolderName: 'Julian Perdomo',
        tokenId: 'CA7F8LYG',
        cryptoTokenId: 'CRYPTO%eyJDcnlwdG8iOiJyMFA0WURpTk5QYnVaQnJaN1R0ZTlLWlNrb2ZQUFNYVWt3VHJ4V2YrT3l6RWdGUEFoUURcL2NsbThSM0hGU1pcL1QiLCJTYWx0IjoidlViRmF1S1hwWGkzVEZqMGd4UzFWbjJiSGREUDg4OFJCQzhOXC9iTnFMQzJtbjZuZzVoOTBtTFhreXFKMUE3R3R0WXlSd3NzM256bnVIWXJhMFp5QTZnPT0iLCJTZXNzaW9uIjoiTVRjM2ZEWXpPREV4TWpreE5UVXpNelF3TlRVMk1BPT0iLCJWZXJzaW9uIjoiQUVTIEhNQUMgMC4yIn0=',
        amount: '50',
        invoiceNumber: '123456',
        type: 'Auth',
        city: 'Chicago',
        state: 'Illinois',
        address: '121 N. LaSalle Street',
        zipCode: '6060255',
        referenceNumber: '2310420327',
        verifyingPost: '',
        isCrypto: 'false',
        tokensId: [
            'CA7F8LYG'
        ],
        responseJson: ''
    }))
}