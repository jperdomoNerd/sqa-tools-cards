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
import { setCurrentTokenId, setResponseJson, setVerifyingPost } from './reducers/default-values-form/defaultValuesFormSlice'
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

  const deleteToken = async () => {
    const formDataSource = {
      secretKey: secretKey,
      merchant: merchant,
      tokenId: tokenId
    }
    await _deleteToken(formDataSource)
      .then(() => {
        getToken()
      }).catch(err => console.error(err))
  }

  const useToken = async () => {
    const formDataSource = {
      amount: amount,
      invoiceNumber: invoiceNumber,
      type: type,
      email: email,
      merchant: merchant,
      secretKey: secretKey,
      tokenId: tokenId
    }
    await _useToken(formDataSource)
      .then(data => {
        console.log(data)
        dispatch(cardAddedFinally())
      }).catch(err => console.error(err))
  }

  const convertCrypto = async () => {
    const formDataSource = {
      city: city,
      state: state,
      address: address,
      zipCode: zipCode,
      email: email,
      merchant: merchant,
      secretKey: secretKey,
      cryptoTokenId: cryptoTokenId
    }
    await _convertCrypto(formDataSource)
      .then(data => {
        console.log(data)
      }).catch(err => console.error(err))
  }

  const useCrypto = async () => {
    const formDataSource = {
      amount: amount,
      invoiceNumber: invoiceNumber,
      city: city,
      state: state,
      address: address,
      zipCode: zipCode,
      type: type,
      email: email,
      merchant: merchant,
      secretKey: secretKey,
      cryptoTokenId: cryptoTokenId
    }
    await _useCrypto(formDataSource)
      .then(data => {
        console.log(data)
      }).catch(err => console.error(err))
  }

  const createSimpleWebPay = async () => {
    const postSiteVerifyFormData = new FormData()
    postSiteVerifyFormData.append('secretKey', secretKey)
    postSiteVerifyFormData.append('merchant', merchant)
    postSiteVerifyFormData.append('email', email)
    const _verifyingPost = await siteVerify(postSiteVerifyFormData)
    dispatch(setVerifyingPost(_verifyingPost))
    _createSimpleWebPay(_verifyingPost, isCrypto)
      .then(response => {
        if (response.result) {
          dispatch(submitIsComplete())
          dispatch(cardAddedSuccesfully())
          dispatch(processIsFailed())
          dispatch(setResponseJson(''))
          dispatch(setCurrentTokenId(response.token))
        }
      }).catch(error => {
        dispatch(cardAddedFailed())
        console.log(error.message)
      })
    setTimeout(() => {
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

  const voidTransaction = async () => {
    const formDataSource = {
      merchant: merchant,
      secretKey: secretKey,
      referenceNumber: referenceNumber
    }
    await _voidTrasaction(formDataSource)
      .then(data => {
        console.log(data)
      }).catch(err => console.error(err))
  }

  const forceTransaction = async () => {
    const formDataSource = {
      merchant: merchant,
      secretKey: secretKey,
      referenceNumber: referenceNumber,
      amount: amount
    }
    await _forceTransaction(formDataSource)
      .then(data => {
        console.log(data)
      }).catch(err => console.error(err))
  }

  const refundTransaction = async () => {
    const formDataSource = {
      merchant: merchant,
      secretKey: secretKey,
      referenceNumber: referenceNumber,
      amount: amount
    }
    await _refundTransaction(formDataSource)
      .then(data => {
        console.log(data)
      }).catch(err => console.error(err))
  }

  const reversalTransaction = async () => {
    const formDataSource = {
      merchant: merchant,
      secretKey: secretKey,
      referenceNumber: referenceNumber,
      amount: amount
    }
    await _reversalTransaction(formDataSource)
      .then(data => {
        console.log(data)
      }).catch(err => console.error(err))
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
        getToken={getToken}
        createSimpleWebPay={createSimpleWebPay}
        voidTransaction={voidTransaction}
        forceTransaction={forceTransaction}
        refundTransaction={refundTransaction}
        reversalTransaction={reversalTransaction}
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