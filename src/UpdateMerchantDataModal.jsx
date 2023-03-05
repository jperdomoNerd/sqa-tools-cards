import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { SuccessToast } from "./SuccessToast"

export const UpdateMerchantDataModal = ({ dataMerchants }) => {

    const { toast } = useSelector(state => state.defaultValuesForm)
    const [merchant, setMerchant] = useState('')
    const [merchantCode, setMerchantCode] = useState('')
    const [secretKey, setSecretKey] = useState('')

    const handleOnChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let merchandCodeObj = {
            merchant: merchant,
            merchantCode: merchantCode,
            secretKey: secretKey
        }
       }

    useEffect(() => {
        console.log(true)
        setMerchant(dataMerchants?.merchant)
        setMerchantCode(dataMerchants?.merchantCode)
        setSecretKey(dataMerchants?.secretKey)
        console.log(true)
    }, []);

    return <>

        {toast.isShow &&
            <SuccessToast />
        }

        <div className='forms-modal'>
            <div className="forms-container">
                <form>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Merchant:</label>
                        <input type="text" className='input' value={merchant}
                            onChange={(e) => handleOnChange('merchant', e.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Mechant Code:</label>
                        <input type="text" className='input' value={merchantCode}
                            onChange={(e) => handleOnChange('merchantCode', e.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" className='input' value={secretKey}
                            onChange={(e) => handleOnChange('secretKey', e.target.value)} />
                    </div>
                    <div>
                        <button className='button button-primary'>
                            Save
                        </button>
                        <button className='button button-danger'>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}
