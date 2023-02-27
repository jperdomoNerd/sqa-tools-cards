import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setConfigurationFormData, setCurrentMerchant } from './reducers/default-values-form/defaultValuesFormSlice'

// Table
import { TableMerchantModal } from './TableMerchantModal'
import { TableSecretKeyModal } from './TableSecretKeyModal'

export const ConfigurationFormData = () => {
    const dispatch = useDispatch()
    const { merchants } = useSelector(state => state.defaultValuesForm)
    const [merchant, setMerchant] = useState('')
    const { secretKeys } = useSelector(state => state.defaultValuesForm)
    const [secretKey, setSecretKey] = useState('')
    const [email, setEmail] = useState('')
    const [isOpenMerchant, setIsOpenMerchant] = useState(false)
    const [isOpenSecreyKey, setIsOpenSecretKey] = useState(false)

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setMerchant(defaultValues.merchant)
        setSecretKey(defaultValues.secretKey)
        setEmail(defaultValues.email)
        const configurationData = {
            merchant: defaultValues.merchant,
            secretKey: defaultValues.secretKey,
            email: defaultValues.email,
            merchants: defaultValues.merchants,
            secretKeys: defaultValues.secretKeys
        }
        dispatch(setConfigurationFormData(configurationData))
    }, [])

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.merchant = merchant
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        dispatch(setCurrentMerchant(merchant))
    }, [merchant])

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
                <TableMerchantModal setIsOpenMerchant={setIsOpenMerchant} />
            }
            {isOpenSecreyKey &&
                <TableSecretKeyModal setIsOpenSecretKey={setIsOpenSecretKey} />
            }
            <h2 className='title mb-big'>Configuration Data</h2>
            <form onSubmit={handleSubmit}>
                <div className='taskForm-wrapper'>
                    <label htmlFor="" className='label mb-small'>Merchant:</label>
                    <select className='input custom-select mr-sm-4' value={merchant} onChange={e => setMerchant(e.target.value)}>
                        {merchants.map((merchant, index) => (
                            <option key={index} value={merchant}>{merchant}</option>
                        ))}
                    </select>

                    <button type="button" className="button button-primary"
                        onClick={() => setIsOpenMerchant(true)}>
                        Config
                    </button>
                </div>

                {/* SecretKey */}
                <div className='taskForm-wrapper'>
                    <label htmlFor="" className='label mb-small'>Secret Key:</label>
                    <select className='input custom-select mr-sm-4' value={secretKey} onChange={e => setSecretKey(e.target.value)}>
                        {secretKeys.map((secretKey, index) => (
                            <option key={index} value={secretKey}>{secretKey}</option>
                        ))}
                    </select>

                    <button type="button" className="button button-primary"
                        onClick={() => setIsOpenSecretKey(true)}>
                        Config
                    </button>
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
