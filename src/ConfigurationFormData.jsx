import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setConfigurationFormData, setCurrentMerchant } from './reducers/default-values-form/defaultValuesFormSlice'
import { AiFillSetting } from "react-icons/ai";

// Table
import { TableMerchantsDataModal } from './TableMerchantsDataModal';

export const ConfigurationFormData = () => {
    const dispatch = useDispatch()
    // const { merchants } = useSelector(state => state.defaultValuesForm)
    const { mechantsData } = useSelector(state => state.defaultValuesForm)
    const [merchantCode, setMerchantCode] = useState('')
    const [merchante, setMerchant] = useState('')
    const [secretKeys, setSecretKey] = useState('')
    const [localMerchant, setLocalMerchant] = useState('')

    const [email, setEmail] = useState('')
    const [isOpenMerchant, setIsOpenMerchant] = useState(false)

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setLocalMerchant(defaultValues?.merchant)
        setEmail(defaultValues?.email)
        setMerchant(defaultValues?.mechantsData.merchant)
        const configurationData = {
            merchant: defaultValues?.merchant,
            email: defaultValues?.email,
            merchants: defaultValues?.merchants,
            mechantsData: defaultValues?.mechantsData,
        }
        dispatch(setConfigurationFormData(configurationData))
        dispatch(setCurrentMerchant(configurationData.merchant))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.merchant = localMerchant
        defaultValues.email = email
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        const configurationData = {
            merchant: defaultValues.merchant,
            email: defaultValues.email
        }
        dispatch(setConfigurationFormData(configurationData))
        dispatch(setCurrentMerchant(localMerchant))
    }

    const changeMerchant = (e) => {
        debugger
        e.preventDefault()

        const secretKeyChange = mechantsData.filter(merchantData =>
            merchantData.merchant === e.target.value)

        setSecretKey(secretKeyChange[0].secretKey)
        setMerchantCode(secretKeyChange[0].merchantCode)
    }

    useEffect(() => {
        setSecretKey(mechantsData[0].secretKey)
        setMerchantCode(mechantsData[0].merchantCode)
    }, [merchante])

    return (
        <div className='configuration-form-data'>

            {/* Modals */}
            {isOpenMerchant &&
                <TableMerchantsDataModal setIsOpenMerchant={setIsOpenMerchant} />
            }
            <h2 style={{ textAlign: 'center' }} className='title mb-big'>Configuration Data</h2>
            <form onSubmit={handleSubmit}>

                {/* Merchant */}
                <div className='taskForm-wrapper'>
                    <label htmlFor="" className='label mb-small'>Merchant:</label>

                    <select style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                        className='input custom-select mr-sm-4'
                        onChange={changeMerchant}
                        value={merchante}>
                        {mechantsData.map((merchant, index) => (
                            <option key={index} value={merchante} >
                                {merchant.merchant}
                            </option>
                        ))}
                    </select>

                    <button type="button" className="button button-primary"
                        onClick={() => setIsOpenMerchant(true)}>
                        <AiFillSetting />
                    </button>
                </div>

                {/* Merchant Code */}
                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Merchant Code:</label>
                    <input type="text" className='input' value={merchantCode}
                        onChange={e => setMerchantCode(e.target.value)} disabled />
                </div>

                {/* SecretKey */}


                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Secret Key:</label>
                    <input type="text" className='input' value={secretKeys}
                        onChange={e => setSecretKey(e.target.value)} disabled />
                </div>

                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Email:</label>
                    <input type="text" className='input' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <button className='button button-primary mx-auto d-block'>
                    Save
                </button>
            </form>
        </div>
    )
}
