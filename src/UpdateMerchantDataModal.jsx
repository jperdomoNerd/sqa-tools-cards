import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateMerchansData, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"

export const UpdateMerchantDataModal = ({ dataMerchants, setIsOpenUpdateMerchantsData }) => {

    const { toast } = useSelector(state => state.defaultValuesForm)
    const [merchant, setMerchant] = useState('')
    const [merchantCode, setMerchantCode] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        setMerchant(dataMerchants?.merchant)
        setMerchantCode(dataMerchants?.merchantCode)
        setSecretKey(dataMerchants?.secretKey)
    }, []);


    const updateMerchantsDatas = e => {
        debugger
        e.preventDefault()
        let merchandCodeObj = {
            merchant: merchant,
            merchantCode: merchantCode,
            secretKey: secretKey
        }

        dispatch(updateMerchansData(merchandCodeObj))
        dispatch(setToast({
            title: 'Merchant updated succefully!',
            message: 'The merchant was successfully updated'
        }))

        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))

        // if (setMerchant(dataMerchants?.merchantCode)) {
            defaultValues.mechantsData = defaultValues.mechantsData.map(
                merchantsData_ => merchantsData_ !== merchandCodeObj
        )
        // }

        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))

        setIsOpenUpdateMerchantsData(false)
    }

    return <>

        {toast.isShow &&
            <SuccessToast />
        }

        <div className='forms-modal'>
            <div className="forms-container">
                <form onSubmit={updateMerchantsDatas}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Merchant:</label>
                        <input type="text" className='input' value={merchant}
                            onChange={e => setMerchant(e.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Mechant Code:</label>
                        <input type="text" className='input' value={merchantCode}
                            onChange={e => setMerchantCode(e.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" className='input' value={secretKey}
                            onChange={e => setSecretKey(e.target.value)} />
                    </div>
                    <div>
                        <button className='button button-primary'>
                            Save
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenUpdateMerchantsData(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}
