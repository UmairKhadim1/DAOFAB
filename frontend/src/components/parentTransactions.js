import { viewAllParentTranscations } from "../Axios/apiFunctions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

function Table1() {
  //initializing states
  const [parentTranscations, setparentTranscations] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [totalRows, setTotalRows] = useState(0);

  //useNavigate to navigate to child transactions page
  const navigate = useNavigate();

  //function to get data of parent transactions
  function getParentTransactionsData() {
    viewAllParentTranscations(page)
      .then((res) => {
        if (res.data.success) {
          let value = res.data.rows;
          console.log(res.data);
          //setting the parent transactions data
          setparentTranscations(value);
          setTotalRows(res.data.rowsLength);
        } else {
          console.log("Some Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //useEffect to get parent transactions with paginations whenever page changes
  useEffect(() => {
    getParentTransactionsData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //Paginator to change the page numbers
  const paginator = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        Prev
      </button>
      <span>
        {page} of {Math.ceil(totalRows / rowsPerPage)}
      </span>
      <button
        disabled={page === Math.ceil(totalRows / rowsPerPage)}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Parent Transactions</h2>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Total Paid Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parentTranscations.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.parentId}</TableCell>
                <TableCell>{row.sender}</TableCell>
                <TableCell>{row.receiver}</TableCell>
                <TableCell>{row.totalAmount}</TableCell>
                <TableCell
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Row Data is ", row);
                    navigate("/childtransactions", {
                      state: { param1: row.parentId },
                    });
                  }}
                >
                  {row.totalPaidAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {paginator}
      </TableContainer>
    </>
  );
}

export default Table1;
