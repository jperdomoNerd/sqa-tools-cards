import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setConfigurationFormData } from './reducers/default-values-form/defaultValuesFormSlice'

import { CreateNewMerchantModal } from './CreateNewMerchantModal'
import { CreateNewSecretKeyModal } from './CreateNewSecretKeyModal'

export const ConfigurationFormData = () => {
    const dispatch = useDispatch()

    const [merchant, setMerchant] = useState('')
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
                <CreateNewMerchantModal setIsOpenMerchant={setIsOpenMerchant} MechantId={merchant} />
            }
            {isOpenSecreyKey &&
                <CreateNewSecretKeyModal setIsOpenSecretKey={setIsOpenSecretKey} SecretKeyId={secretKey} />
            }
            <h2 className='title mb-big'>Configuration Data</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Merchant:</label>
                    <select style={{ width: '210px', whiteSpace: 'pre' }} className='input custom-select mr-sm-4' value={merchant} onChange={e => setMerchant(e.target.value)}>
                        <option value="dfdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsfsfsfsfsfsfsfsfsfdsfsf">dfdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsfsfsfsfsfsfsfsfsfdsfsf</option>
                        <option value="ggggggggggggg">Fadfdsfmdsfodsmfodsmfsdfsfsflse</option>
                        <option value="threddddddddddddde">ddsdsdseewqrewrewrewrewrewrewrwr</option>
                    </select>

                    <button className="button button-primary"
                        onClick={() => setIsOpenMerchant(true)}>
                        +
                    </button>
                </div>
                <div className='mb-medium'>
                    <label htmlFor="" className='label mb-small'>Secret Key:</label>
                    <select style={{ width: '210px', whiteSpace: 'pre' }} className='input custom-select mr-sm-4' value={secretKey} onChange={e => setSecretKey(e.target.value)}>
                        <option value="rrrrrrrrrrrrrr">dfdsfsfsfdsfdsfsfffffffffffffffffffffffsfsfdsfsf</option>
                        <option value="tttttttttt">Fadfdsfmdsfodsmfodsmfsdfsfsflse</option>
                        <option value="wwwwwwwwww">ddsdsdseewqrewrewrewrewrewrewrwr</option>
                    </select>
                    <button className="button button-primary"
                        onClick={() => setIsOpenSecretKey(true)}>
                        +
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
