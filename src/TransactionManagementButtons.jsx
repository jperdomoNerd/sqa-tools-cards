import { _forceTransaction, _voidTrasaction, _refundTransaction, _reversalTransaction } from './endpoints/endpoints'
import { setResponseJson } from './reducers/default-values-form/defaultValuesFormSlice'
import { useDispatch, useSelector } from 'react-redux'


export const TransactionManagementButtons = () => {
    // Redux
    const { secretKey, merchant, amount, referenceNumber } = useSelector(state => state.defaultValuesForm)
    const dispatch = useDispatch()

    const voidTransaction = async () => {
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber
        }
        await _voidTrasaction(formDataSource)
            .then(data => {
                console.log(data)
                dispatch(setResponseJson(JSON.stringify(data)))
            }).catch(err => console.error(err))
    }

    const forceTransaction = async () => {
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber,
            amount: amount
        }
        await _forceTransaction(formDataSource)
            .then(data => {
                console.log(data)
                dispatch(setResponseJson(JSON.stringify(data)))
            }).catch(err => console.error(err))
    }

    const refundTransaction = async () => {
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber,
            amount: amount
        }
        await _refundTransaction(formDataSource)
            .then(data => {
                console.log(data)
                dispatch(setResponseJson(JSON.stringify(data)))
            }).catch(err => console.error(err))
    }

    const reversalTransaction = async () => {
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber,
            amount: amount
        }
        await _reversalTransaction(formDataSource)
            .then(data => {
                console.log(data)
                dispatch(setResponseJson(JSON.stringify(data)))
            }).catch(err => console.error(err))
    }

    return (
        <div className='button-card'>
            <button
                type="button"
                className="button button-primary mb-big"
                onClick={() => voidTransaction()}
            >
                Void Trasaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big"
                onClick={() => forceTransaction()}
            >
                Force Transaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big"
                onClick={() => refundTransaction()}
            >
                Refund Transaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big"
                onClick={() => reversalTransaction()}
            >
                Reversal Transaction
            </button>
        </div>
    )
}
