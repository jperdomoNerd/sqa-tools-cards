import { useSelector } from "react-redux"

import { TokenManagementButtons } from './TokenManagementButtons'
import { TransactionManagementButtons } from './TransactionManagementButtons'

export const SWPButtons = () => {
    const { cardIsAddedSuccessfully, isProccessSuccessully } = useSelector(state => state.controlSWPButtons)
    
    return (
        <>
            {cardIsAddedSuccessfully &&
                <TokenManagementButtons />
            }
            {isProccessSuccessully && 
                <TransactionManagementButtons />
            }
        </>
    )
}
