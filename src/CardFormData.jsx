import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCardFormData } from './reducers/default-values-form/defaultValuesFormSlice'

export const CardFormData = () => {
    const dispatch = useDispatch()

    const [ cardNumber, setCardNumber ] = useState('')
    const [ cardHolderName, setCardHolderName ]  = useState('')
    const [ expirationDateMonth, setExpirationDateMonth ] = useState(0)
    const [ expirationDateYear, setExpirationDateYear ] = useState(0)

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setCardNumber(defaultValues.cardNumber)
        setCardHolderName(defaultValues.cardHolderName)
        setExpirationDateMonth(defaultValues.expirationDateMonth)
        setExpirationDateYear(defaultValues.expirationDateYear)
        const configurationData = {
            cardNumber: defaultValues.cardNumber,
            expirationDateMonth: defaultValues.expirationDateMoth,
            expirationDateYear: defaultValues.expirationDateYear,
            cardHolderName: defaultValues.cardHolderName
        }
        dispatch(setCardFormData(configurationData))
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.cardNumber = cardNumber
        defaultValues.expirationDateMonth = expirationDateMonth
        defaultValues.expirationDateYear = expirationDateYear
        defaultValues.cardHolderName = cardHolderName
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        const cardData = {
            cardNumber: defaultValues.cardNumber,
            expirationDateMonth: defaultValues.expirationDateMoth,
            expirationDateYear: defaultValues.expirationDateYear,
            cardHolderName: defaultValues.cardHolderName
        }
        dispatch(setCardFormData(cardData))
    }
    
    return (
        <div className='card-form-data'>
            <h2 style={{textAlign: 'center'}} className='title mb-big'>Card Data</h2>
            <form onSubmit={handleSubmit} className='form-card-container'>

                <div className="card-container mb-big">
                    <div className='card-number mb-medium'>
                        <input type="number" className='card-number__input' value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                    </div>
                    <div className='card-chip-img'>
                        <img src="./src/assets/images/card-chip-img.png" alt="" />
                    </div>
                    <div className='card-holder-name'>
                        <input type="text" className='card-holder-name__input' value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} />
                    </div>
                    <div className='date'>
                        <input type="text" className='expiration-month__input' value={expirationDateMonth} onChange={e => setExpirationDateMonth(e.target.value)} />
                        <input type="text" className='slash__input' value='/' readOnly={true} />
                        <input type="text" className='expiration-year__input' value={expirationDateYear} onChange={e => setExpirationDateYear(e.target.value)} />
                    </div>
                </div>

                <div className='button-save'>
                    <button  className='button button-primary mx-auto d-block'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
