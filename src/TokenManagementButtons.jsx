import { useDispatch, useSelector } from 'react-redux'
import { _deleteToken, _useToken, _useCrypto, _convertCrypto } from './endpoints/endpoints'
import { cardAddedDeleted, cardAddedFinally, processIsSuccessully } from './reducers/control-swp-buttons/controlSWPButtonsSlice'
import { setCurrentTokenId, setIsCrypto, appendLogHistory } from './reducers/default-values-form/defaultValuesFormSlice'

export const TokenManagementButtons = () => {
    // Redux
    const dispatch = useDispatch()
    const { secretKey, merchant, email, tokenId, amount, invoiceNumber, type, isCrypto, city, state, address, zipCode } = useSelector(state => state.defaultValuesForm)

    const deleteToken = async () => {
        dispatch(appendLogHistory('Deletion of token initiated'))
        await _deleteToken({
            secretKey: secretKey,
            merchant: merchant,
            tokenId: tokenId
        }).then(data => {
            dispatch(appendLogHistory('Deletion of token completed'))
            dispatch(appendLogHistory(JSON.stringify(data)))
            dispatch(cardAddedDeleted())
            dispatch(setCurrentTokenId(''))
        }).catch(err => console.error(err))
    }

    const useToken = async () => {
        dispatch(appendLogHistory('Use token initiated'))
        const formDataSource = {
            amount: amount,
            invoiceNumber: invoiceNumber,
            type: type,
            email: email,
            merchant: merchant,
            secretKey: secretKey,
            tokenId: tokenId
        }
        await _useToken(formDataSource)
            .then(data => {
                if (data.Result === 0) {
                    dispatch(appendLogHistory('Use token completed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                    dispatch(processIsSuccessully())
                } else {
                    dispatch(appendLogHistory('Use token token failed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                }
                dispatch(cardAddedFinally())
            }).catch(err => console.error(err))
    }

    const useCrypto = async () => {
        dispatch(appendLogHistory('Use crypto initiated'))
        const formDataSource = {
            amount: amount,
            invoiceNumber: invoiceNumber,
            city: city,
            state: state,
            address: address,
            zipCode: zipCode,
            type: type,
            email: email,
            merchant: merchant,
            secretKey: secretKey,
            cryptoTokenId: tokenId
        }
        await _useCrypto(formDataSource)
            .then(data => {
                if (data.Result === 0) {
                    dispatch(appendLogHistory('Use crypto completed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                    dispatch(processIsSuccessully())
                    dispatch(cardAddedFinally())
                } else {
                    dispatch(appendLogHistory('Use crypto failed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                }
            }).catch(err => console.error(err))
    }

    const convertCrypto = async () => {
        dispatch(appendLogHistory('Convert crypto initiated'))
        const formDataSource = {
            city: city,
            state: state,
            address: address,
            zipCode: zipCode,
            email: email,
            merchant: merchant,
            secretKey: secretKey,
            cryptoTokenId: tokenId
        }
        await _convertCrypto(formDataSource)
            .then(data => {
                if (data.Result === 0) {
                    dispatch(appendLogHistory('Convert crypto completed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                    dispatch(setCurrentTokenId(data.TokenId))
                    dispatch(setIsCrypto('false'))
                } else {
                    dispatch(appendLogHistory('Convert crypto failed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                }
            }).catch(err => console.error(err))
    }

    return (
        <>
            {isCrypto === 'false' &&
                <button
                    type='button'
                    className='button button-primary mb-big mr-medium'
                    onClick={deleteToken}
                >
                    Delete Token
                </button>
            }
            {isCrypto === 'true' &&
                <button
                    type='button'
                    className='button button-primary mb-big mr-medium'
                    onClick={convertCrypto}
                >
                    Convert Crypto Token
                </button>
            }
            {isCrypto === 'false' &&
                <button
                    type='button'
                    className='button button-primary mb-big mr-medium'
                    onClick={useToken}
                >
                    Use Token
                </button>
            }
            {isCrypto === 'true' &&
                <button
                    type='button'
                    className='button button-primary mb-big mr-medium'
                    onClick={useCrypto}
                >
                    Use Crypto
                </button>
            }
        </>
    )
}