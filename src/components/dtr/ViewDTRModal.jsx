import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import api from "../../assets/api";

function ViewDTRModal({ payrollId }) {
  const [open, setOpen] = useState(false);
  const [payroll, setPayroll] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open && payrollId) {
      api
        .get(`/api/payrolls/${payrollId}/`)
        .then((res) => {
          setPayroll(res.data);
        })
        .catch((err) => {
          console.error("Error fetching payroll:", err);
        });
    }
  }, [open, payrollId]);

  return (
    <div>
      <p className="" onClick={handleOpen}>
        View Payroll
      </p>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Payroll Details
          </Typography>

          {payroll ? (
            <Box>
              {/* <Typography>
                <b>ID:</b> {payroll.id}
              </Typography> */}

              <Typography>
                <b>Salary:</b> ₱ {Number(payroll.fixed_rate).toLocaleString()}
              </Typography>

              <Typography>
                <b>Date Released:</b>{" "}
                {new Date(payroll.date_release).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          ) : (
            <Typography>Loading payroll...</Typography>
          )}

          <Box mt={2} textAlign="right">
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewDTRModal;
