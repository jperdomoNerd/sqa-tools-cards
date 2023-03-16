import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLocationFormData } from './reducers/default-values-form/defaultValuesFormSlice'

// Bootstrap
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

export const LocationFormData = () => {
    const dispatch = useDispatch()

    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')

    useEffect(() => {
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        setCity(defaultValues.city)
        setState(defaultValues.state)
        setAddress(defaultValues.address)
        setZipCode(defaultValues.zipCode)
        const locationData = {
            city: defaultValues.city,
            state: defaultValues.state,
            address: defaultValues.address,
            zipCode: defaultValues.zipCode
        }
        dispatch(setLocationFormData(locationData))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.city = city
        defaultValues.state = state
        defaultValues.address = address
        defaultValues.zipCode = zipCode
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        const locationData = {
            city: defaultValues.city,
            state: defaultValues.state,
            address: defaultValues.address,
            zipCode: defaultValues.zipCode
        }
        dispatch(setLocationFormData(locationData))
    }

    return (
        <div className='location-form-data'>
            <h2 style={{ textAlign: 'center' }} className='title mb-big'>Location Data</h2>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>City</label>
                            <input type="text" name="" id=""
                                className='input'
                                value={city}
                                onChange={e => setCity(e.target.value)} />
                        </div>
                    </Col>

                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>State</label>
                            <input type="text" name="" id=""
                                className='input'
                                value={state}
                                onChange={e => setState(e.target.value)} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Address</label>
                            <input type="text" name="" id=""
                                className='input'
                                value={address}
                                onChange={e => setAddress(e.target.value)} />
                        </div>
                    </Col>


                    <Col>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>ZipCode</label>
                            <input type="text" name="" id=""
                                className='input'
                                value={zipCode}
                                onChange={e => setZipCode(e.target.value)} />
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
