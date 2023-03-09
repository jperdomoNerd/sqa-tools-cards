import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    merchant: '/4S+YXsW7LBo6AjAg4VCQA==',
    secretKey: '4439cea5b6e8bd963d2c2dbeb1c57918e02f616068df0bbec3c77a82a8e7dbce',
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
    tokensId: [],
    toast: {
        title: '',
        message: '',
        isShow: false
    },
    responseJson: ''
}

export const defaultValuesFormSlice = createSlice({
    name: 'defaultValuesForm',
    initialState: initialState,
    reducers: {
        setDefaultValuesForm: (state, action) => {
        },

        setConfigurationFormData: (state, action) => {
            state.merchant = action.payload.merchant
            state.email = action.payload.email
            state.merchants = action.payload.merchants
            state.mechantsData = action.payload.mechantsData
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
            state.tokensId = action.payload.tokensId
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

        addMerchantObj: (state, action) => {
            state.mechantsData.push(action.payload)
        },

        updateMerchansData: (state, action) => {
            const index = state.mechantsData.findIndex(merchantData__ => merchantData__.merchantCode === action.payload.merchantCode)
            state.mechantsData[index] = {
                ...state.mechantsData[index],
                ...action.payload,
            };
        },

        deleteMerchantsData: (state, action) => {
            state.mechantsData = state.mechantsData.filter(merchantData__ => merchantData__.merchantCode !== action.payload.merchantCode)
        },

        deleteTokenId: (state, action) => {
            state.tokensId = state.tokensId.filter(tokenId_ => tokenId_ !== action.payload)
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

        setCurrentMerchant: (state, action) => {
            state.merchant = action.payload
        },

        setCurrentTokenId: (state, action) => {
            state.tokenId = action.payload
        },

        setResponseJson: (state, action) => {
            state.responseJson = action.payload
        },

        setIsCrypto: (state, action) => {
            state.isCrypto = action.payload
        }
    }
})

export const { setDefaultValuesForm,
    setConfigurationFormData,
    setCardFormData,
    setLocationFormData,
    setTransactionFormData,
    setVerifyingPost,
    deleteMerchantsData,
    deleteTokenId,
    setToast,
    hiddenToast,
    setCurrentMerchant,
    setCurrentTokenId,
    addMerchantObj,
    updateMerchansData,
    setResponseJson,
    setIsCrypto } = defaultValuesFormSlice.actions

export default defaultValuesFormSlice.reducer
