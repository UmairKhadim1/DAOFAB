import { viewAllChildTranscations } from "../Axios/apiFunctions";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

// import MUIDataTable from "mui-datatables";

function Table2() {
  const [childTranscations, setChildTranscations] = useState([]);

  const location = useLocation();

  function getChildTransactionsData(parentId) {
    viewAllChildTranscations(parentId)
      .then((res) => {
        if (res.data.success) {
          let value = res.data.result;
          console.log(res.data);
          setChildTranscations(value);
        } else {
          console.log("Some Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const { param1 } = location.state || {};

    console.log("location param", param1);

    getChildTransactionsData(param1);
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Child Transactions</h2>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Paid Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {childTranscations ? (
              childTranscations.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.sender}</TableCell>
                  <TableCell>{row.receiver}</TableCell>
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell>{row.paidAmount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Table2;
