export const TransactionManagementButtons = () => {
    return (
        <div>
            <button
                type="button"
                className="button button-primary mb-big"
            >
                Void Trasaction
            </button>
            <button
                type="button" 
                className="button button-primary mb-big"
            >
                Force Transaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big"
            >
                Refund Transaction
            </button>
            <button
                type="button"
                className="button button-primary mb-big"
            >
                Reversal Transaction
            </button>
        </div>
    )
}
