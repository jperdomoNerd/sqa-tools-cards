export const _createSimpleWebPay = (verifyingPost, _isCrypto) => {
    const isCrypto = (_isCrypto === 'true')
    const _createSimpleWebPayPromise = new Promise((resolve, reject) => {
        $("#NewCenposPlugin").createWebpay({
            url: 'https://webtest.cenpos.net/simplewebpay/cards/',
            params: `&verifyingPost=${verifyingPost}`,
            sessionToken: isCrypto,
            CallbackSuccess(data) {
                console.log(data)
            },
            CallbackCancel(err) {
                console.log(err)
                reject(false)
            }
        })
        resolve(true)
    })
    return _createSimpleWebPayPromise
}

export const _submitAction = () => {
    $("#NewCenposPlugin").submitAction()
}
