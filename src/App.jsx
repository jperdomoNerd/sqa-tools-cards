// Components
import { ButtonActions } from './ButtonActions'
import { FormsModal } from './FormsModal'
import { ObjectView } from './ObjectView'

// Libs
import {
  siteVerify
} from './endpoints/endpoints'
import { _createSimpleWebPay, _submitAction } from './lib/simpleWebpay'

// Hooks
import { useEffect, useState } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { cardAddedFailed, cardAddedSuccesfully, processIsFailed, submitIsComplete } from './reducers/control-swp-buttons/controlSWPButtonsSlice'
import { appendLogHistory, emptyLogHistory, setCurrentTokenId, setResponseJson, setVerifyingPost } from './reducers/default-values-form/defaultValuesFormSlice'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.css'

export const App = () => {
  const dispatch = useDispatch()
  const { secretKey, merchant, email, zipCode, isCrypto, environment } = useSelector(state => state.defaultValuesForm)

  const [isOpen, setIsOpen] = useState(true)
  const [showSubmitButton, setShowSubmitButton] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [])

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
    _createSimpleWebPay(environment, _verifyingPost, isCrypto, zipCode)
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

  const submitAction = () => {
    _submitAction()
  }

  return (
    <div className="app">
      <div>
        {isOpen &&
          <FormsModal setIsOpen={setIsOpen} />
        }
        <ButtonActions
          createSimpleWebPay={createSimpleWebPay}
        />
        <button type='button' className='open-button button button-primary'
          onClick={() => setIsOpen(true)}>
          Data
        </button>
      </div>

      <ObjectView
        showSubmitButton={showSubmitButton}
        submitAction={submitAction}
      />
    </div>
  )
}