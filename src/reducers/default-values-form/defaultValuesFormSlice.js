import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    merchant: '',
    secretKey: '',
    email: '',
    cardNumber: '',
    expirationDateMonth: 0,
    expirationDateYear: 0,
    cardHolderName: '',
    tokenId: '',
    cryptoTokenId: '',
    amount: '',
    invoiceNumber: '',
    type: '',
    city: '',
    state: '',
    address: '',
    zipCode: '',
    referenceNumber: '',
    verifyingPost: '',
    isCrypto: false,
    merchants: [],
    secretKeys: [],
    toast: {
        title: '',
        message: '',
        isShow: false
    }
}

export const defaultValuesFormSlice = createSlice({
    name: 'defaultValuesForm',
    initialState: initialState,
    reducers: {
        setDefaultValuesForm: (state, action) => {
        },
        setConfigurationFormData: (state, action) => {
            state.merchant = action.payload.merchant
            state.secretKey = action.payload.secretKey
            state.email = action.payload.email
            state.merchants = action.payload.merchants
            state.secretKeys = action.payload.secretKeys
        },
        setCardFormData: (state, action) => {
            state.cardNumber = action.payload.cardNumber
            state.expirationDateMonth = action.payload.expirationDateMonth
            state.expirationDateYear = action.payload.expirationDateYear
            state.cardHolderName = action.payload.cardHolderName
        },
        setLocationFormData: (state, action) => {
            state.city = action.payload.city
            state.state = action.payload.state
            state.address = action.payload.address
            state.zipCode = action.payload.zipCode
        },
        setTransactionFormData: (state, action) => {
            state.tokenId = action.payload.tokenId
            state.cryptoTokenId = action.payload.cryptoTokenId
            state.amount = action.payload.amount
            state.invoiceNumber = action.payload.invoiceNumber
            state.type = action.payload.type
            state.referenceNumber = action.payload.referenceNumber
            state.isCrypto = action.payload.isCrypto
        },
        setVerifyingPost: (state, action) => {
            state.verifyingPost = action.payload
        },
        addMerchant: (state, action) => {
            state.merchants.push(action.payload)
        },
        addSecretKey: (state, action) => {
            state.secretKeys.push(action.payload)
        },
        deleteMerchant: (state, action) => {
            state.merchants = state.merchants.filter(merchant__ => {
                merchant__ != action.payload
            })
        },
        setToast: (state, action) => {
            state.toast = {
                title: action.payload.title,
                message: action.payload.message,
                isShow: true
            }
        },
        hiddenToast: state => {
            state.toast.isShow = false
        },
        setCurrentMerchant(state, action) {
            state.merchant = action.payload
        },
        setCurrentSecretKey(state, action) {
            state.secretKey = action.payload
        }
    }
})

export const { setDefaultValuesForm,
    setConfigurationFormData,
    setCardFormData,
    setLocationFormData,
    setTransactionFormData,
    setVerifyingPost,
    addMerchant,
    addSecretKey,
    deleteMerchant,
    setToast,
    hiddenToast,
    setCurrentSecretKey,
    setCurrentMerchant } = defaultValuesFormSlice.actions

export default defaultValuesFormSlice.reducer
