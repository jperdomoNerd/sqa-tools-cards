import { ConfigurationFormData } from './ConfigurationFormData'
import { LocationFormData } from './LocationFormData'
import { TransactionFormData } from './TransactionFormData'

export const FormsModal = ({ setIsOpen }) => {
    return (
        <div className='forms-modal'>
            <div className='forms-container'>

                <div className='btnClose'>
                    <button className='button button-danger' onClick={() => setIsOpen(false)}>
                        Close
                    </button>
                </div>
                <TransactionFormData />
                <LocationFormData />
            </div>
        </div>
    )
}
