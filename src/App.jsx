// Components
import { FormsModal } from './FormsModal'
import { ButtonActions } from './ButtonActions'
import { ObjectView } from './ObjectView'

// Libs
import { _createSimpleWebPay, _submitAction } from './lib/simpleWebpay'
import {
  siteVerify, _getToken, _deleteToken, _useToken,
  _convertCrypto, _useCrypto, _voidTrasaction, _forceTransaction,
  _refundTransaction, _reversalTransaction
}
  from './endpoints/endpoints'

// Hooks
import { useState, useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTokenId, setResponseJson, setVerifyingPost, appendLogHistory, emptyLogHistory } from './reducers/default-values-form/defaultValuesFormSlice'
import { cardAddedSuccesfully, submitIsComplete, cardAddedFinally, cardAddedFailed, processIsFailed } from './reducers/control-swp-buttons/controlSWPButtonsSlice'

// Styles
import './assets/styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const App = () => {
  const dispatch = useDispatch()
  const { secretKey, merchant, email, tokenId, amount, invoiceNumber, type, city, state, address, zipCode, cryptoTokenId, referenceNumber, isCrypto } = useSelector(state => state.defaultValuesForm)

  const [isOpen, setIsOpen] = useState(true)
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [showTokenList, setShowTokenList] = useState(false)
  const [tokenList, setTokenList] = useState([])

  useEffect(() => {
    setIsOpen(false)
  }, [])

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

  const createSimpleWebPay = async () => {
    dispatch(emptyLogHistory())
    dispatch(appendLogHistory('SimpleWebPay creation started'))
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append('secretKey', secretKey)
    postSiteVerifyFormData.append('merchant', merchant)
    postSiteVerifyFormData.append('email', email)
    const _verifyingPost = await siteVerify(postSiteVerifyFormData)
    dispatch(appendLogHistory('VerifyingPost is ' + _verifyingPost))
    dispatch(setVerifyingPost(_verifyingPost))
    _createSimpleWebPay(_verifyingPost, isCrypto, zipCode)
      .then(response => {
        if (response.result) {
          dispatch(appendLogHistory('Card added successfully'))
          dispatch(appendLogHistory(response.responseData))
          dispatch(submitIsComplete())
          dispatch(cardAddedSuccesfully())
          dispatch(processIsFailed())
          dispatch(setResponseJson(''))
          dispatch(setCurrentTokenId(response.token))
        }
      }).catch(error => {
        dispatch(appendLogHistory('Card adition failed'))
        dispatch(appendLogHistory(error.responseData))
        dispatch(cardAddedFailed())
        console.log(error.message)
      })
    setTimeout(() => {
      dispatch(appendLogHistory('SimpleWebPay creation completed'))
      setShowSubmitButton(true)
    }, 2000)
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

  const submitAction = () => {
    _submitAction()
  }

  return (
    <div className="app">
      {isOpen &&
        <FormsModal setIsOpen={setIsOpen} />
      }
      <button type='button' className='open-button button button-primary'
        onClick={() => setIsOpen(true)}>
        Open
      </button>
      <ButtonActions
        createSimpleWebPay={createSimpleWebPay}
      />
      <ObjectView
        tokenList={tokenList}
        showTokenList={showTokenList}
        showSubmitButton={showSubmitButton}
        submitAction={submitAction}
      />
    </div>
  )
}