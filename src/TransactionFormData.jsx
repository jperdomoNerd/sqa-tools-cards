import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTransactionFormData, setCurrentTokenId } from './reducers/default-values-form/defaultValuesFormSlice'
import { AiFillSetting } from "react-icons/ai"
// Table
import { TableTokenId } from './TableTokenId'
// Bootstrap
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

export const TransactionFormData = () => {
    const dispatch = useDispatch()

    const [tokenId, setTokenId] = useState('')
    const { tokensId } = useSelector(state => state.defaultValuesForm)
    const [cryptoTokenId, setCryptoTokenId] = useState('')
    const [amount, setAmount] = useState(0.0)
    const [invoiceNumber, setInvoiceNumber] = useState(0)
    const [type, setType] = useState('')
    const [referenceNumber, setReferenceNumber] = useState(0)
    const [isCrypto, setIsCrypto] = useState(false)
    const [isOpenTableTokenId, setIsOpenTableTokenId] = useState(false)

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setTokenId(defaultValues.tokenId)
        setCryptoTokenId(defaultValues.cryptoTokenId)
        setAmount(defaultValues.amount)
        setInvoiceNumber(defaultValues.invoiceNumber)
        setType(defaultValues.type)
        setReferenceNumber(defaultValues.referenceNumber)
        setIsCrypto(defaultValues.isCrypto)
        const transactionData = {
            tokenId: defaultValues.tokenId,
            tokensId: defaultValues.tokensId,
            cryptoTokenId: defaultValues.cryptoTokenId,
            amount: defaultValues.amount,
            invoiceNumber: defaultValues.invoiceNumber,
            type: defaultValues.type,
            referenceNumber: defaultValues.referenceNumber,
            isCrypto: defaultValues.isCrypto
        }
        dispatch(setTransactionFormData(transactionData))
        dispatch(setCurrentTokenId(transactionData.tokenId))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.tokenId = tokenId
        defaultValues.cryptoTokenId = cryptoTokenId
        defaultValues.amount = amount
        defaultValues.invoiceNumber = invoiceNumber
        defaultValues.type = type
        defaultValues.referenceNumber = referenceNumber
        defaultValues.isCrypto = isCrypto
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        const transactionData = {
            tokenId: defaultValues.tokenId,
            cryptoTokenId: defaultValues.cryptoTokenId,
            amount: defaultValues.amount,
            invoiceNumber: defaultValues.invoiceNumber,
            type: defaultValues.type,
            referenceNumber: defaultValues.referenceNumber,
            isCrypto: defaultValues.isCrypto
        }
        dispatch(setTransactionFormData(transactionData))
        dispatch(setCurrentTokenId(tokenId))
    }

    return (
        <div className='transaction-form-data'>

            {isOpenTableTokenId &&
                <TableTokenId setIsOpenTableTokenId={setIsOpenTableTokenId} />
            }
            <h2 style={{ textAlign: 'center' }} className='title mb-big'>Transaction Data</h2>

            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Token Id</label>

                            <select style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                                className='input custom-select mr-sm-4'
                                value={tokenId} onChange={e => setTokenId(e.target.value)}>
                                {tokensId.map((tokenId, index) => (
                                    <option key={index} value={tokenId}>{tokenId}</option>
                                ))}
                            </select>

                            <button type="button" className="button button-primary"
                                onClick={() => setIsOpenTableTokenId(true)}>
                                <AiFillSetting />
                            </button>

                            {/* <input type="text" className='input' value={tokenId} onChange={e => setTokenId(e.target.value)} /> */}
                        </div>
                    </Col>

                    <Col>
                        <div className="mb-medium">
                            <label htmlFor="" className="label mb-small">Crypto Token Id</label>
                            <textarea cols="20" rows="10" className='input textarea' value={cryptoTokenId} onChange={e => setCryptoTokenId(e.target.value)} />
                        </div>
                    </Col>

                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Amount</label>
                            <input type="text" className='input' value={amount} onChange={e => setAmount(e.target.value)} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Invoice Number</label>
                            <input type="text" className='input' value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
                        </div>
                    </Col>

                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Type</label>
                            <input type="text" className='input' value={type} onChange={e => setType(e.target.value)} />
                        </div>
                    </Col>

                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Reference Number</label>
                            <input type="text" className='input' value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Is Crypto</label>
                            <select style={{ width: '210px', whiteSpace: 'pre' }} className='input custom-select mr-sm-4' value={isCrypto} onChange={e => setIsCrypto(e.target.value)}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </Col>
                </Row>

                <button className='button button-primary mx-auto d-block'>
                    Save
                </button>

            </form>
        </div>
    )
}
