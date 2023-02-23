import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setConfigurationFormData } from './reducers/default-values-form/defaultValuesFormSlice'

import { CreateNewMerchantModal } from './CreateNewMerchantModal'

export const ConfigurationFormData = () => {
    const dispatch = useDispatch()
    
    const [ merchant, setMerchant ] = useState('')
    const [ secretKey, setSecretKey ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isOpenMerchant, setIsOpenMerchant ] = useState(false)
    // const [ isOpenSecretKey, setIsOpenSecretKey ] = useState(false)

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setMerchant(defaultValues.merchant)
        setSecretKey(defaultValues.secretKey)
        setEmail(defaultValues.email)
        const configurationData = {
            merchant: defaultValues.merchant,
            secretKey: defaultValues.secretKey,
            email: defaultValues.email
        }
        dispatch(setConfigurationFormData(configurationData))
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.merchant = merchant
        defaultValues.secretKey = secretKey
        defaultValues.email = email
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        const configurationData = {
            merchant: defaultValues.merchant,
            secretKey: defaultValues.secretKey,
            email: defaultValues.email
        }
        dispatch(setConfigurationFormData(configurationData))
    }

    return (
        <div className='configuration-form-data'>

            {/* Modals */}
            {isOpenMerchant &&
                <CreateNewMerchantModal setIsOpenMerchant={setIsOpenMerchant} />
            }
            <h2 className='title mb-big'>Configuration Data</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Merchant:</label>
                    <input type="text" name="" id="" className='input' value={merchant} onChange={e => setMerchant(e.target.value)} />
                    <button className="button button-primary" 
                        onClick={() => setIsOpenMerchant(true)}>
                        +
                    </button>
                </div>
                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Secret Key:</label>
                    <input type="text" name="" id="" className='input' value={secretKey} onChange={e => setSecretKey(e.target.value)} />
                    <button className="button button-primary">+</button>
                </div>
                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Email:</label>
                    <input type="text" name="" id="" className='input' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <button className='button button-primary'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
