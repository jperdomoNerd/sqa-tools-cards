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
        setMerchant(defaultValues?.mechantsData.merchant)
        setSecretKey(defaultValues?.mechantsData.secretKey)
        setMerchantCode(defaultValues?.mechantsData.merchantCode)
        const configurationData = {
            email: defaultValues?.email,
            mechantsData: defaultValues?.mechantsData,
            secretKey: defaultValues?.secretKey
        }
        dispatch(setConfigurationFormData(configurationData))
    }, [])

    const changeMerchantCode = (e) => {
        debugger
        e.preventDefault()

        const secretKeyChange = mechantsData.filter(merchantData =>
            merchantData.merchantCode === e.target.value)

        setSecretKey(secretKeyChange[0].secretKey)
        setMerchant(secretKeyChange[0].merchant)
    }

    useEffect(() => {
        setSecretKey(mechantsData[0].secretKey)
        setMerchant(mechantsData[0].merchant)
    }, [merchante])

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
                {/* <Col> */}
                    {/* Merchant */}
                    {/* <div className='taskForm-wrapper'> */}
                        {/* <label htmlFor="" className='label mb-small'>Merchant:</label> */}

                        {/* <select style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                            className='input custom-select mr-sm-4'
                            onChange={changeMerchant}
                            value={merchante}>
                            {mechantsData.map((merchant, index) => (
                                <option key={index} value={merchante} >
                                    {merchant.merchant}
                                </option>
                            ))}
                        </select> */}
                    {/* </div> */}

                {/* </Col> */}

                <Col>

                    {/* Merchant Code */}
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Merchant Code:</label>
                        {/* <input type="text" className='input' value={merchantCode}
                            onChange={e => setMerchantCode(e.target.value)} disabled /> */}
                        <select style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                            className='input custom-select mr-sm-4'
                            onChange={changeMerchantCode}
                            value={merchantCode}>
                            {mechantsData.map((merchantCode, index) => (
                                <option key={index} value={merchantCode} >
                                    {merchantCode.merchantCode}
                                </option>
                            ))}
                        </select>

                        <button type="button" className="button button-primary"
                            onClick={() => setIsOpenMerchant(true)}>
                            <AiFillSetting />
                        </button>
                    </div>

                </Col>

            </Row>

            <Row>

                {/* <Col> */}

                {/* SecretKey */}
                {/* <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" className='input' value={secretKeys}
                            onChange={e => setSecretKey(e.target.value)} disabled />
                    </div> */}

                {/* </Col> */}

                {/* <Col>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Email:</label>
                        <input type="text" className='input' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </Col> */}

            </Row>






        </div>
    )
}
