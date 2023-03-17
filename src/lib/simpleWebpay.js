export const _createSimpleWebPay = (verifyingPost, _isCrypto, _zipcode) => {
    const isCrypto = (_isCrypto === 'true')
    const _createSimpleWebPayPromise = new Promise((resolve, reject) => {
        function CallbackSuccess(responseData) {
            debugger
            resolve({
                message: responseData.Message,
                token: (responseData.RecurringSaleTokenId) 
                    ? responseData.RecurringSaleTokenId : 'Crypto...',
                responseData: JSON.stringify(responseData),
                result: true
            })
        }
        function CallbackCancel(responseData) {
            debugger
            reject({
                message: responseData.Message,
                token: '',
                responseData: JSON.stringify(responseData),
                result: false
            })
        }
        $("#NewCenposPlugin").createWebpay({
            url: 'https://webtest.cenpos.net/simplewebpay/cards/',
            params: `isemail=true&zipcode=${_zipcode}&verifyingPost=${verifyingPost}`,
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
