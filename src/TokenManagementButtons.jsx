import { useDispatch, useSelector } from 'react-redux'
import { _deleteToken, _useToken, _useCrypto, _convertCrypto } from './endpoints/endpoints'
import { cardAddedDeleted, cardAddedFinally, processIsSuccessully } from './reducers/control-swp-buttons/controlSWPButtonsSlice'
import { setCurrentTokenId, setResponseJson, setIsCrypto } from './reducers/default-values-form/defaultValuesFormSlice'

export const TokenManagementButtons = () => {
    // Redux
    const dispatch = useDispatch()
    const { secretKey, merchant, email, tokenId, amount, invoiceNumber, type, isCrypto, city, state, address, zipCode } = useSelector(state => state.defaultValuesForm)

    const deleteToken = async () => {
        await _deleteToken({
            secretKey: secretKey,
            merchant: merchant,
            tokenId: tokenId
        }).then(data => {
            dispatch(setResponseJson(JSON.stringify(data)))
            dispatch(cardAddedDeleted())
            dispatch(setCurrentTokenId(''))
        }).catch(err => console.error(err))
    }

    const useToken = async () => {
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
                    dispatch(setResponseJson(JSON.stringify(data)))
                    dispatch(processIsSuccessully())
                }
                dispatch(cardAddedFinally())
            }).catch(err => console.error(err))
    }

    const useCrypto = async () => {
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
                    dispatch(setResponseJson(JSON.stringify(data)))
                    dispatch(processIsSuccessully())
                    dispatch(cardAddedFinally())
                }
            }).catch(err => console.error(err))
    }

    const convertCrypto = async () => {
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
                debugger
                dispatch(setCurrentTokenId(data.TokenId))
                dispatch(setIsCrypto('false'))
            }
            console.log(data)
          }).catch(err => console.error(err))
      }

    return (
        <div>
            {isCrypto === 'false' &&
                <button
                    type='button'
                    className='button button-primary mb-big'
                    onClick={deleteToken}
                >
                    Delete Token
                </button>
            }
            {isCrypto === 'true' &&
                <button
                    type='button'
                    className='button button-primary mb-big'
                    onClick={convertCrypto}
                >
                    Convert Crypto Token
                </button>
            }
            {isCrypto === 'false' &&
                <button
                    type='button'
                    className='button button-primary mb-big'
                    onClick={useToken}
                >
                    Use Token
                </button>
            }
            {isCrypto === 'true' &&
                <button
                    type='button'
                    className='button button-primary mb-big'
                    onClick={useCrypto}
                >
                    Use Crypto
                </button>
            }
        </div>
    )
}