import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setConfigurationFormData } from './reducers/default-values-form/defaultValuesFormSlice'
import { AiFillSetting } from "react-icons/ai";

// Table
import { TableMerchantsDataModal } from './TableMerchantsDataModal';

// Bootstrap
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

export const ButtonActions = ({ createSimpleWebPay }) => {

    const dispatch = useDispatch()
    const { mechantsData } = useSelector(state => state.defaultValuesForm)
    const [merchantCode, setMerchantCode] = useState('')
    const [merchante, setMerchant] = useState('')
    const [secretKeys, setSecretKey] = useState('')

    const [email, setEmail] = useState('')
    const [isOpenMerchant, setIsOpenMerchant] = useState(false)

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setEmail(defaultValues?.email)
        setMerchant(defaultValues?.merchant)
        setSecretKey(defaultValues?.secretKey)
        setMerchantCode(defaultValues?.merchantCode)
        const configurationData = {
            email: defaultValues?.email,
            mechantsData: defaultValues?.mechantsData,
            secretKey: defaultValues?.secretKey,
            merchant: defaultValues?.merchant,
            merchantCode: defaultValues?.merchantCode
        }
        dispatch(setConfigurationFormData(configurationData))
    }, [merchantCode])

    const changeMerchantCode = (e) => {
        setMerchantCode(e.target.value)
        
        const _merchantsData = mechantsData.filter(merchantData =>
            merchantData.merchantCode === e.target.value)

        setSecretKey(_merchantsData.secretKey)
        setMerchant(_merchantsData.merchant)
        setMerchantCode(_merchantsData.merchantCode)
    }

    useEffect(() => {
        setSecretKey(mechantsData.secretKey)
        setMerchant(mechantsData.merchant)
        setMerchantCode(mechantsData.merchantCode)
    }, [merchantCode])

    return (
        <div className='button-actions'>

            {isOpenMerchant &&
                <TableMerchantsDataModal setIsOpenMerchant={setIsOpenMerchant} />
            }

            <button
                onClick={createSimpleWebPay}
                type='button'
                className='button button-primary mb-big'
            >
                Create SimpleWebPay
            </button>
            <Row>
                <Col>
                    <form>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Merchant Code:</label>
                            {/* <input type="text" className='input' value={merchantCode}
                                onChange={e => setMerchantCode(e.target.value)} disabled /> */}
                            <select style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                                className='input custom-select mr-sm-4'
                                onChange={changeMerchantCode}
                                value={merchantCode}>
                                {mechantsData.map((_merchantCode, index) => (
                                    <option key={index} value={_merchantCode.merchantCode} >
                                        {_merchantCode.merchantCode}
                                    </option>
                                ))}
                            </select>

                            <button type="button" className="button button-primary"
                                onClick={() => setIsOpenMerchant(true)}>
                                <AiFillSetting />
                            </button>
                        </div>
                    </form>
                    {/* Merchant Code */}
                </Col>
            </Row>
        </div>
    )
}
