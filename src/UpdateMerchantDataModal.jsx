import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setConfigurationFormData } from './reducers/default-values-form/defaultValuesFormSlice'
import { SuccessToast } from "./SuccessToast"

export const UpdateMerchantDataModal = ({ setIsOpenUpdateMerchantsData, _merchantsData_ }) => {

    const dispatch = useDispatch()
    const { toast } = useSelector(state => state.defaultValuesForm)

    const [merchant, setMerchant] = useState('')

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setMerchant(defaultValues.mechantsData)
        const configurationData = {
            mechantsData: defaultValues.mechantsData,
        }
        dispatch(setConfigurationFormData(configurationData))
    }, [])


    const handleUpdateMerchantsData = e => {
        e.preventDefault()
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.mechantsData = merchantsDatas
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        const configurationData = {
            mechantsData: defaultValues.mechantsData,
        }
        dispatch(setConfigurationFormData(configurationData))
    }


    return <>
        {toast.isShow &&
            <SuccessToast />
        }
        <div className='forms-modal'>
            <div className="forms-container">
                <form onSubmit={handleUpdateMerchantsData}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Merchant:</label>
                        <input type="text" className='input' defaultValue={title} onChange={event => setTask(event.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Mechant Code:</label>
                        <input type="text" className='input' defaultValue={title} onChange={event => setTask(event.target.value)} />
                    </div>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" className='input' defaultValue={title} onChange={event => setTask(event.target.value)} />
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
