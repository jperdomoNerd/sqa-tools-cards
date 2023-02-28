import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setConfigurationFormData, setCurrentMerchant, setCurrentSecretKey } from './reducers/default-values-form/defaultValuesFormSlice'
import { AiFillSetting } from "react-icons/ai";
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

        defaultValues.secretKey = secretKey
        dispatch(setCurrentSecretKey(secretKey))
    }, [merchant, secretKey])

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
            <h2 style={{ textAlign: 'center' }} className='title mb-big'>Configuration Data</h2>
            <form onSubmit={handleSubmit}>
                <div className='taskForm-wrapper'>
                    <label htmlFor="" className='label mb-small'>Merchant:</label>
                    <select style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} className='input custom-select mr-sm-4' value={merchant} onChange={e => setMerchant(e.target.value)}>
                        {merchants.map((merchant, index) => (
                            <option key={index} value={merchant}>{merchant}</option>
                        ))}
                    </select>

                    <button type="button" className="button button-primary"
                        onClick={() => setIsOpenMerchant(true)}>
                        <AiFillSetting />
                    </button>
                </div>

                {/* SecretKey */}
                <div className='taskForm-wrapper'>
                    <label htmlFor="" className='label mb-small'>Secret Key:</label>
                    <select style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} className='input custom-select mr-sm-4' value={secretKey} onChange={e => setSecretKey(e.target.value)}>
                        {secretKeys.map((secretKey, index) => (
                            <option key={index} value={secretKey}>{secretKey}</option>
                        ))}
                    </select>

                    <button type="button" className="button button-primary"
                        onClick={() => setIsOpenSecretKey(true)}>
                        <AiFillSetting />
                    </button>
                </div>
                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Email:</label>
                    <input type="text" name="" id="" className='input' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <button className='button button-primary mx-auto d-block'>
                    Save
                </button>
            </form>
        </div>
    )
}
