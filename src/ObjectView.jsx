import { useSelector } from 'react-redux'
import { SWPButtons } from './SWPButtons'

export const ObjectView = ({ tokenList, showTokenList, showSubmitButton, submitAction }) => {
    const { submitNotIsComplete } = useSelector(state => state.controlSWPButtons)
    const { responseJson } = useSelector(state => state.defaultValuesForm)

    return (
        <div className="object-view">
            {showTokenList && 
                <table className="table">
                    <thead>
                        <tr>
                            <th>TokenId</th>
                            <th>Card Number</th>
                            <th>Card Type</th>
                            <th>Card Expiration Date</th>
                            <th>Name On Card</th>
                        </tr>
                    </thead>
                    <tbody>
                        { tokenList }
                    </tbody>
                </table>
            }
            <div id='NewCenposPlugin'></div>
            {submitNotIsComplete && showSubmitButton && 
                <button onClick={submitAction} className='button button-primary'>
                    Submit
                </button>
            }
            <SWPButtons />
            <div className='response-json'>
                { responseJson.toString() }
            </div>
        </div>
    )
}
