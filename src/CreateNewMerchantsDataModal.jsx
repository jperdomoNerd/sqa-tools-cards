import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addMerchantObj, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"

export const CreateNewMerchantsDataModal = ({ setIsOpenAddMerchant }) => {
    const { toast } = useSelector(state => state.defaultValuesForm)

    const [merchant, setMerchant] = useState('')
    const [merchantCode, setmerchantCode] = useState('')
    const [secretKey, setSecretKey] = useState('')


    const dispatch = useDispatch()

    const addCurrentMerchantSubmit = e => {
        e.preventDefault()
        let merchandCodeObj = {
            merchant: merchant,
            merchantCode: merchantCode,
            secretKey: secretKey
        }

        dispatch(addMerchantObj(merchandCodeObj))
        dispatch(setToast({
            title: 'Merchant added succefully!',
            message: 'You can use the new merchant in the next request'
        }))

        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.mechantsData.push(merchandCodeObj)
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))

        setIsOpenAddMerchant(false)
    }

    return <>
        {toast.isShow &&
            <SuccessToast />
        }
        <div className='forms-modal'>
            <div className="forms-container">
                <form onSubmit={addCurrentMerchantSubmit}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Merchant:</label>
                        <input type="text" name="" id="" className='input' value={merchant} onChange={e => setMerchant(e.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Mechant Code:</label>
                        <input type="text" name="" id="" className='input' value={merchantCode} onChange={e => setmerchantCode(e.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" name="" id="" className='input' value={secretKey} onChange={e => setSecretKey(e.target.value)} />
                    </div>
                    <div>
                        <button className='button button-primary'>
                            Save
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenAddMerchant(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}
