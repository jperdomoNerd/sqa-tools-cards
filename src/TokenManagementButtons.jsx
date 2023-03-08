import { useDispatch, useSelector } from 'react-redux'
import { _deleteToken } from './endpoints/endpoints'
import { setCurrentTokenId } from './reducers/default-values-form/defaultValuesFormSlice'

export const TokenManagementButtons = () => {
    
    // Redux
    const dispatch = useDispatch()
    const { secretKey, merchant, tokenId } 
        = useSelector(state => state.defaultValuesForm)

    const deleteToken = async () => {
        await _deleteToken({
            secretKey: secretKey,
            merchant: merchant,
            tokenId: tokenId
        }).then(() => {
            dispatch(cardAddedDeleted())
            dispatch(setCurrentTokenId(''))
        }).catch(err => console.error(err))
    }

    return (
        <div>
            <button
                type='button'
                className='button button-primary mb-big'
                onClick={deleteToken}
            >
                Delete Token
            </button>
            <button
                type='button'
                className='button button-primary mb-big'

            >
                Convert Crypto Token
            </button>
            <button
                type='button'
                className='button button-primary mb-big'

            >
                Use Token
            </button>
            <button
                type='button'
                className='button button-primary mb-big'

            >
                Use Crypto Token
            </button>
        </div>
    )
}