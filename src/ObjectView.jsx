import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { _getToken } from './endpoints/endpoints'
import { SWPButtons } from './SWPButtons'

export const ObjectView = ({ showSubmitButton, submitAction }) => {
    const { submitNotIsComplete } = useSelector(state => state.controlSWPButtons)
    const { logHistory, secretKey, merchant, email } = useSelector(state => state.defaultValuesForm)
    const [logList, setLogList] = useState('')
    const [showTokenList, setShowTokenList] = useState(false)
    const [tokenList, setTokenList] = useState([])

    useEffect(() => {
        let logHistorySplit = logHistory.split('|')
        setLogList(logHistorySplit.map((log, key) => <p key={key}>{log}</p>))
    }, [logHistory])

    const getToken = async () => {
        const formDataSource = {
            secretKey: secretKey,
            merchant: merchant,
            email: email
        }
        await _getToken(formDataSource)
            .then(tokens => {
                buildTokenList(tokens)
                setShowTokenList(true)
            }).catch(err => console.error(err))
    }

    const buildTokenList = tokens => {
        const _tokenList = tokens.map(token => <tr key={token.TokenId}>
            <td>{token.TokenId}</td>
            <td>{token.CardNumber}</td>
            <td>{token.CardType}</td>
            <td>{token.CardExpirationDate}</td>
            <td>{token.NameOnCard}</td>
        </tr>)
        setTokenList(_tokenList)
    }

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
                        {tokenList}
                    </tbody>
                </table>
            }
            <div id='NewCenposPlugin' className='mb-big'></div>
            {submitNotIsComplete && showSubmitButton &&
                <button
                    onClick={submitAction}
                    className='button button-primary button-submit mb-big mt-big mr-medium'
                >
                    Submit
                </button>
            }
            <button
                onClick={getToken}
                className='button button-primary button-submit mb-big mt-big'
            >
                Get Token
            </button>
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
