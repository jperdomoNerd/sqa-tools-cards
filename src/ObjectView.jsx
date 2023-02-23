// Redux
export const ObjectView = ({ tokenList, showTokenList, showSubmitButton, submitAction }) => {
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
            {showSubmitButton && 
                <button onClick={submitAction} className='button button-primary'>
                    Submit
                </button>
            }
        </div>
    )
}
