export const _createSimpleWebPay = (verifyingPost, _isCrypto) => {
    const isCrypto = (_isCrypto === 'true')
    const _createSimpleWebPayPromise = new Promise((resolve, reject) => {
        const CallbackSuccess = responseData => {
            resolve({
                message: responseData.Message,
                token: (responseData.RecurringSaleTokenId) 
                    ? responseData.RecurringSaleTokenId : 'Crypto...',
                result: true
            })
        }
        const CallbackCancel = responseData => {
            reject({
                message: responseData.Message,
                token: '',
                result: false
            })
        }
        $("#NewCenposPlugin").createWebpay({
            url: 'https://webtest.cenpos.net/simplewebpay/cards/',
            params: `&verifyingPost=${verifyingPost}&callbacksuccess=true&callbacksuccess=true`,
            sessionToken: isCrypto,
            success: CallbackSuccess,
            cancel:  CallbackCancel
        })
    })
    return _createSimpleWebPayPromise
}

export const _submitAction = () => {
    return new Promise((resolve, reject) => {
        $("#NewCenposPlugin").submitAction()
        resolve(true)
    })
}
