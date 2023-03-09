/* Data */
const data = {
    secretKey: 'c1cc02b85e279a136fb9173e6e4bff8a58c8a305f6a1de9b9b51f12cf0908424',
    merchant: 'LcTBAi7HevOnPsdiQWBtzQ==',
    email: 'julian.perdomo@cenposd365.com'
}

const urls = {
    siteVerify: 'https://webtest.cenpos.net/simplewebpay/cards/?app=genericcontroller&action=siteVerify',
    getToken: 'https://webtest.cenpos.net/simplewebpay/cards/api/GetToken/',
    deleteToken: 'https://webtest.cenpos.net/simplewebpay/cards/api/DeleteToken/',
    convertCrypto: 'https://webtest.cenpos.net/simplewebpay/cards/api/ConvertCrypto/',
    useToken: 'https://webtest.cenpos.net/simplewebpay/cards/api/UseToken/',
    useCrypto: 'https://webtest.cenpos.net/simplewebpay/cards/api/UseCrypto/',
    voidTransaction: 'https://webtest.cenpos.net/simplewebpay/cards/api/Void/',
    forceTransaction: 'https://webtest.cenpos.net/simplewebpay/cards/api/Force/',
    refundTrasaction: 'https://webtest.cenpos.net/simplewebpay/cards/api/Refund/',
    reversalTrasaction: 'https://webtest.cenpos.net/simplewebpay/cards/api/Reversal/'
}

/* Helpers */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })
    return response.json()
}
/* VerifygnPost */
export const siteVerify = async formData => {
    return await postData(urls.siteVerify, 
        formData)
        .then(data => {
            console.log(data)
            return data.Data
        })
}

/* GetToken */
export const _getToken = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("email", formDataSource.email)
    const verifyingpost = await siteVerify(postSiteVerifyFormData)

    const postGetTokenFormData = new FormData()
    postGetTokenFormData.append("verifyingpost", verifyingpost)

    return await postData(urls.getToken, 
        postGetTokenFormData)
        .then(data => {
            return data.Tokens
        }).catch(err => console.err(err))
}

/* UseToken */
export const _useToken = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("amount", formDataSource.amount)
    postSiteVerifyFormData.append("invoicenumber", formDataSource.invoiceNumber)
    postSiteVerifyFormData.append("type", formDataSource.type)
    postSiteVerifyFormData.append("email", formDataSource.email)
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("tokenid", formDataSource.tokenId)
    const verifyingPost = await siteVerify(postSiteVerifyFormData)

    const postUseTokenFormData = new FormData()
    postUseTokenFormData.append("verifyingpost", verifyingPost)
    postUseTokenFormData.append("tokenid", formDataSource.tokenId)
    postUseTokenFormData.append("invoicedetail", "test data")
    
    return await postData(urls.useToken,
        postUseTokenFormData)
        .then(response => {
            return response
        }).catch(err => console.err(err))
}

/* DeleteToken */
export const _deleteToken = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("tokenid", formDataSource.tokenId)
    const verifyingpost = await siteVerify(postSiteVerifyFormData)

    const postDeleteTokenFormData = new FormData()
    postDeleteTokenFormData.append("verifyingpost", verifyingpost)
    postDeleteTokenFormData.append("tokenid", formDataSource.tokenId)
    
    return await postData(urls.deleteToken, 
        postDeleteTokenFormData)
        .then(data => {
            return data
        }).catch(err => console.err(err))
}

/* UseCrypto */
export const _useCrypto = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("amount", formDataSource.amount)
    postSiteVerifyFormData.append("invoicenumber", formDataSource.invoiceNumber)
    postSiteVerifyFormData.append("city", formDataSource.city)
    postSiteVerifyFormData.append("state", formDataSource.state)
    postSiteVerifyFormData.append("address", formDataSource.address)
    postSiteVerifyFormData.append("zipcode", formDataSource.zipCode)
    postSiteVerifyFormData.append("type", formDataSource.type)
    postSiteVerifyFormData.append("email", formDataSource.email)
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("tokenid", formDataSource.cryptoTokenId)
    const verifyingPost = await siteVerify(postSiteVerifyFormData)

    const postUseCryptoFormData = new FormData()
    postUseCryptoFormData.append("verifyingpost", verifyingPost)
    postUseCryptoFormData.append("tokenid", formDataSource.cryptoTokenId)
    postUseCryptoFormData.append("invoicedetail", "test data")
    
    return await postData(urls.useCrypto,
        postUseCryptoFormData)
        .then(data => {
            console.log(data)
            return data
        }).catch(err => console.err(err))
}

/* ConvertCrypto */
export const _convertCrypto = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("city", formDataSource.city)
    postSiteVerifyFormData.append("state", formDataSource.state)
    postSiteVerifyFormData.append("address", formDataSource.address)
    postSiteVerifyFormData.append("zipcode", formDataSource.zipCode)
    postSiteVerifyFormData.append("email", formDataSource.email)
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("tokenid", formDataSource.cryptoTokenId)
    const verifyingPost = await siteVerify(postSiteVerifyFormData)

    const postConvertCryptoFormData = new FormData()
    postConvertCryptoFormData.append("verifyingpost", verifyingPost)
    postConvertCryptoFormData.append("tokenid", formDataSource.cryptoTokenId)

    return await postData(urls.convertCrypto,
        postConvertCryptoFormData)
        .then(data => {
            return data
        }).catch(err => console.err(err))
}

/* Void Transaction */
export const _voidTrasaction = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("referencenumber", formDataSource.referenceNumber)
    const verifyingPost = await siteVerify(postSiteVerifyFormData)

    const postVoidTransactionFormData = new FormData()
    postVoidTransactionFormData.append("verifyingpost", verifyingPost)
    postVoidTransactionFormData.append("referencenumber", formDataSource.referenceNumber)

    return await postData(urls.voidTransaction, 
        postVoidTransactionFormData)
        .then(data => {
            return data
        }).catch(err => console.err(err))
}

/* Force Transaction */
export const _forceTransaction = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("referencenumber", formDataSource.referenceNumber)
    postSiteVerifyFormData.append("amount", formDataSource.amount)
    const verifyingPost = await siteVerify(postSiteVerifyFormData)

    const postForceTransactionFormData = new FormData()
    postForceTransactionFormData.append("verifyingpost", verifyingPost)
    postForceTransactionFormData.append("referencenumber", formDataSource.referenceNumber)

    return await postData(urls.forceTransaction, 
        postForceTransactionFormData)
        .then(data => {
            return data
        }).catch(err => console.err(err))
}

export const _refundTransaction = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("referencenumber", formDataSource.referenceNumber)
    postSiteVerifyFormData.append("amount", formDataSource.amount)
    const verifyingPost = await siteVerify(postSiteVerifyFormData)

    const postRefundTransactionFormData = new FormData()
    postRefundTransactionFormData.append("verifyingpost", verifyingPost)
    postRefundTransactionFormData.append("referencenumber", formDataSource.referenceNumber)

    return await postData(urls.refundTrasaction, 
        postRefundTransactionFormData)
        .then(data => {
            return data
        }).catch(err => console.log(err))
}

export const _reversalTransaction = async formDataSource => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append("merchant", formDataSource.merchant)
    postSiteVerifyFormData.append("secretkey", formDataSource.secretKey)
    postSiteVerifyFormData.append("referencenumber", formDataSource.referenceNumber)
    postSiteVerifyFormData.append("amount", formDataSource.amount)
    const verifyingPost = await siteVerify(postSiteVerifyFormData)

    const postReversalTransactionFormData = new FormData()
    postReversalTransactionFormData.append("verifyingpost", verifyingPost)
    postReversalTransactionFormData.append("referencenumber", formDataSource.referenceNumber)

    return await postData(urls.reversalTrasaction, 
        postReversalTransactionFormData)
        .then(data => {
            return data
        }).catch(err => console.log(err))
}


/* Init method */
// const init = async () => {
//     const postSiteVerifyFormData = new FormData()
//     postSiteVerifyFormData.append("secretKey", data.secretKey)
//     postSiteVerifyFormData.append("merchant", data.merchant)
//     postSiteVerifyFormData.append("email", data.email)
//     const verifyingPost = await siteVerify(postSiteVerifyFormData)

//     $("#NewCenposPlugin").createWebpay({
//         url: 'https://webtest.cenpos.net/simplewebpay/cards/',
//         params: `&verifyingPost=${verifyingPost}`, 
//         sessiontoken: false,
//         CallbackSuccess(data) {
//             console.log(data)
//         }
//     })
    
//     await getToken()
//     await deleteToken().then(() => {
//         getToken()
//         convertCrypto()
//         useToken()
//         useCrypto()
//     }).catch(() => console.err('Dont can delete token :('))

//     $("#submit").click(() => {
//         $("#NewCenposPlugin").submitAction()
//     })
// }

// init()
