export const _createSimpleWebPay = (verifyingPost, _isCrypto) => {
    const isCrypto = (_isCrypto === 'true')
    const _createSimpleWebPayPromise = new Promise((resolve, reject) => {
        $("#NewCenposPlugin").createWebpay({
            url: 'https://webtest.cenpos.net/simplewebpay/cards/',
            params: `&verifyingPost=${verifyingPost}&callbacksuccess=true&callbacksuccess=true`,
            sessionToken: isCrypto
        })
        resolve(true)
    })
    return _createSimpleWebPayPromise
}

export const _submitAction = () => {
    return new Promise((resolve, reject) => {
        $("#NewCenposPlugin").submitAction()
        resolve(true)
    })
}
