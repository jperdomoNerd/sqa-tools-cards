import { _forceTransaction, _voidTrasaction, _refundTransaction, _reversalTransaction } from './endpoints/endpoints'
import { appendLogHistory } from './reducers/default-values-form/defaultValuesFormSlice'
import { useDispatch, useSelector } from 'react-redux'


export const TransactionManagementButtons = () => {
    // Redux
    const { secretKey, merchant, amount, referenceNumber } = useSelector(state => state.defaultValuesForm)
    const dispatch = useDispatch()

    const voidTransaction = async () => {
        dispatch(appendLogHistory('Void transaction initiated'))
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber
        }
        await _voidTrasaction(formDataSource)
            .then(data => {
                if (data.Result === 0) {
                    dispatch(appendLogHistory('Void transaction completed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                } else {
                    dispatch(appendLogHistory('Void transaction failed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                }
            }).catch(err => console.error(err))
    }

    const forceTransaction = async () => {
        dispatch(appendLogHistory('Force transaction initiated'))
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber,
            amount: amount
        }
        await _forceTransaction(formDataSource)
            .then(data => {
                if (data.Result === 0) {
                    dispatch(appendLogHistory('Void transaction completed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                } else {
                    dispatch(appendLogHistory('Void transaction failed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                }
            }).catch(err => console.error(err))
    }

    const refundTransaction = async () => {
        dispatch(appendLogHistory('Refund transaction initiated'))
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber,
            amount: amount
        }
        await _refundTransaction(formDataSource)
            .then(data => {
                if (data.Result === 0) {
                    dispatch(appendLogHistory('Void transaction completed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                } else {
                    dispatch(appendLogHistory('Void transaction failed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                }
            }).catch(err => console.error(err))
    }

    const reversalTransaction = async () => {
        dispatch(appendLogHistory('Reversal transaction initiated'))
        const formDataSource = {
            merchant: merchant,
            secretKey: secretKey,
            referenceNumber: referenceNumber,
            amount: amount
        }
        await _reversalTransaction(formDataSource)
            .then(data => {
                if (data.Result === 0) {
                    dispatch(appendLogHistory('Void transaction completed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                } else {
                    dispatch(appendLogHistory('Void transaction failed'))
                    dispatch(appendLogHistory(JSON.stringify(data)))
                }
            }).catch(err => console.error(err))
    }

    return (
        <div className='button-card'>
            <button
                type="button"
                className="button button-primary mb-big mr-medium"
                onClick={() => voidTransaction()}
            >
                Void Trasaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big mr-medium"
                onClick={() => forceTransaction()}
            >
                Force Transaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big mr-medium"
                onClick={() => refundTransaction()}
            >
                Refund Transaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big mr-medium"
                onClick={() => reversalTransaction()}
            >
                Reversal Transaction
            </button>
        </div>
    )
}
