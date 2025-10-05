import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import api from "../../assets/api";

function ViewDTRModal({ payrollId }) {
  const [open, setOpen] = useState(false);
  const [payroll, setPayroll] = useState(null);
  const [shares, setShares] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open && payrollId) {
      const fetchData = async () => {
        try {
          const [payrollRes, sharesRes] = await Promise.all([
            api.get(`/api/payrolls/${payrollId}/`),
            api.get(`/api/payroll/${payrollId}/government-shares/`),
          ]);
          setPayroll(payrollRes.data);
          setShares(sharesRes.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [open, payrollId]);

  const totalDeductions =
    shares && (Number(shares.sss) || 0) + (Number(shares.gsis) || 0);

  const netPay =
    payroll && totalDeductions
      ? Number(payroll.fixed_rate) - totalDeductions
      : payroll
      ? Number(payroll.fixed_rate)
      : 0;

  return (
    <div>
      <p className="cursor-pointer text-blue-500" onClick={handleOpen}>
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
              <p>
                <b>Salary:</b> ₱ {Number(payroll.fixed_rate).toLocaleString()}
              </p>
              <p>
                <b>Date Released:</b>{" "}
                {new Date(payroll.date_release).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <div className="mt-4">
                <p className="font-bold text-blue-600">
                  Government Shares Deductions
                </p>
                {shares ? (
                  <div>
                    <p>
                      <b>SSS:</b> ₱ {Number(shares.sss).toLocaleString()}
                    </p>
                    <p>
                      <b>GSIS:</b> ₱ {Number(shares.gsis).toLocaleString()}
                    </p>
                    <p className="mt-2">
                      <b>Total Deductions:</b> ₱{" "}
                      {totalDeductions.toLocaleString()}
                    </p>
                    <p>
                      <b>Total :</b> ₱ {netPay.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <Typography color="text.secondary">
                    No government shares been set.
                  </Typography>
                )}
              </div>
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
