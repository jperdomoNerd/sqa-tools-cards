import { useSelector } from 'react-redux'

export const DefaultValuesForm = () => {
    const { merchant, cardNumber } = useSelector(state => state.defaultValuesForm)

    return (
        <div className="DefaultValuesForm">
            <h2>Default Values</h2>
            <b>{merchant}</b>
            <p>#############</p>
            <b>{ cardNumber }</b>
        </div>
    )
}
