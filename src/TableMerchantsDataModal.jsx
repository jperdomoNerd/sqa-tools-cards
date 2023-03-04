import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMerchantsData, setToast } from "./reducers/default-values-form/defaultValuesFormSlice";
import { SuccessToast } from "./SuccessToast";

// Merchant
import { CreateNewMerchantsDataModal } from "./CreateNewMerchantsDataModal";
import { UpdateMerchantDataModal } from "./UpdateMerchantDataModal";

// Pagination
import { PaginationTable } from "./PaginationTable";

// Bootstrap
import { Table } from "react-bootstrap";


export const TableMerchantsDataModal = ({ setIsOpenMerchant }) => {

  const { toast } = useSelector((state) => state.defaultValuesForm);
  const { mechantsData } = useSelector((state) => state.defaultValuesForm);
  const dispatch = useDispatch();

  // Open modals
  const [isOpenAddMechant, setIsOpenAddMerchant] = useState(false);
  const [isOpenUpdateMerchantsData, setIsOpenUpdateMerchantsData] = useState(false);

  const deleteMerchantSubmit = (_merchantsData) => {
    dispatch(deleteMerchantsData(_merchantsData));
    dispatch(
      setToast({
        title: "Merchants Data delete succefully!",
        message: "You can use the merchants data id in the next request",
      })
    );

    const defaultValues = JSON.parse(
      window.localStorage.getItem("defaultValues")
    );

    defaultValues.mechantsData = defaultValues.mechantsData.filter(
      (merchantsData_) => merchantsData_ != _merchantsData
    );

    window.localStorage.setItem("defaultValues", JSON.stringify(defaultValues));
  };

  // Pagination
  const [page, setPage] = useState(1);
  const [merchantCodeLimits, setMerchantCodeLimits] = useState(1);

  useEffect(() => {
    handleChangePage(page);
  }, []);

  const handleChangePage = (page) => {
    setPage(page);
    const getData = (_data, _page, _limit) => {
      const startIn = _limit * (_page - 1);
      return _data.slice(startIn, startIn + _limit);
    };
    setMerchantCodeLimits(getData(mechantsData, page, 5));
  };

  // Update
  const [dataMerchants, setDataMerchants] = useState({})

  const updateMerchantsData = (_merchantsDatas) => {

    setDataMerchants(_merchantsDatas);

    <UpdateMerchantDataModal TableMerchantsDataModal={TableMerchantsDataModal} dataMerchants={dataMerchants} />
    setIsOpenUpdateMerchantsData(true)
    debugger
  };

  return (
    <>
      {toast.isShow && <SuccessToast />}
      <div className="forms-modal">
        {isOpenAddMechant && (
          <CreateNewMerchantsDataModal
            setIsOpenAddMerchant={setIsOpenAddMerchant}
          />
        )}
        {isOpenUpdateMerchantsData && (
          <UpdateMerchantDataModal
            setIsOpenUpdateMerchantsData={setIsOpenUpdateMerchantsData}
          />
        )}

        <div className="forms-container">
          <div className="forms">
            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Merchant</th>
                  <th>Merchant Code</th>
                  <th>Secret Key</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {merchantCodeLimits.length > 0 &&
                  merchantCodeLimits.map((_merchantsDatas, key) => (
                    <tr key={key}>
                      <td>{(page - 1) * 5 + (key + 1)}</td>
                      <td>{_merchantsDatas.merchant}</td>
                      <td>{_merchantsDatas.merchantCode}</td>
                      <td>{_merchantsDatas.secretKey}</td>
                      <td>
                        <button
                          onClick={() => deleteMerchantSubmit(_merchantsDatas.merchantCode)}
                          className="btn btn-danger btn-sm"
                        >
                          Eliminar
                        </button>

                        <button
                          onClick={() => updateMerchantsData(_merchantsDatas)}
                          className="btn btn-danger btn-sm"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            {!isOpenAddMechant && !isOpenUpdateMerchantsData && (
              <div className="container d-flex justify-content-center">
                {
                  <PaginationTable
                    total={Math.ceil(mechantsData.length / 5)}
                    current={page}
                    onChangePage={handleChangePage}
                  ></PaginationTable>
                }
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              <button
                className="button button-primary"
                onClick={() => setIsOpenAddMerchant(true)}
              >
                Add
              </button>
              <button
                className="button button-danger"
                onClick={() => setIsOpenMerchant(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
