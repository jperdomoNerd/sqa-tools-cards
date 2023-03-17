import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SWPButtons } from './SWPButtons'
import { Card } from 'react-bootstrap'

export const ObjectView = ({ tokenList, showTokenList, showSubmitButton, submitAction }) => {
    const { submitNotIsComplete } = useSelector(state => state.controlSWPButtons)
    const { logHistory } = useSelector(state => state.defaultValuesForm)
    const [logList, setLogList] = useState('')

    useEffect(() => {
      let logHistorySplit = logHistory.split('|')
      logHistorySplit = logHistorySplit.map(log => <p>{log}</p>)
      setLogList(logHistorySplit.map((log, key) => <p key={key}>{log}</p>))
    }, [logHistory])

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
                <button onClick={submitAction} className='button button-primary button-submit'>
                    Submit
                </button>
            }
            <SWPButtons />
            <Card >
                <Card.Body>
                    <Card.Title>Log hitory</Card.Title>
                    <ul>
                        {logList}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    )
}
