export const ButtonActions = ({ getToken, deleteToken, useToken, convertCrypto, 
                            useCrypto, createSimpleWebPay, voidTransaction, forceTransaction,
                            refundTransaction, reversalTransaction }) => {
    return (
        <div className='button-actions'>
            {/* <button 
                onClick={getToken}
                type='button' 
                className='button button-primary mb-big'
            >
                Get Token
            </button> */}
            <button 
                onClick={useToken}
                type='button' 
                className='button button-primary mb-big'
            >
                Use Token
            </button>
            <button
                onClick={useCrypto} 
                type='button' 
                className='button button-primary mb-big'
            >
                Use Crypto Token
            </button>
            {/* <button 
                onClick={deleteToken}
                type='button' 
                className='button button-primary mb-big'
            >
                Delete Token
            </button> */}
            <button 
                onClick={convertCrypto}
                type='button' 
                className='button button-primary mb-big'
            >
                Convert Crypto
            </button>
            <button 
                onClick={createSimpleWebPay}
                type='button' 
                className='button button-primary mb-big'
            >
                Create SimpleWebPay
            </button>
            <button
                onClick={voidTransaction}
                type="button"
                className="button button-primary mb-big"
            >
                Void Trasaction
            </button>
            <button
                onClick={forceTransaction}
                type="button" 
                className="button button-primary mb-big"
            >
                Force Transaction
            </button>
            <button
                onClick={refundTransaction}
                type="button"
                className="button button-primary mb-big"
            >
                Refund Transaction
            </button>
            <button
                onClick={reversalTransaction}
                type="button"
                className="button button-primary mb-big"
            >
                Reversal Transaction
            </button>
        </div>
    )
}
