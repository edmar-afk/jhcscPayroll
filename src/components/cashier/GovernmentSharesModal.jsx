import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import api from "../../assets/api";

function GovernmentSharesModal({ payrollId, refresh }) {
  const [open, setOpen] = useState(false);
  const [shares, setShares] = useState({ sss: "", gsis: "" });
  const [isExisting, setIsExisting] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    try {
      const res = await api.get(`/api/payroll/${payrollId}/government-shares/`);
      if (res.data) {
        setShares({
          sss: Number(res.data.sss).toLocaleString(),
          gsis: Number(res.data.gsis).toLocaleString(),
        });
        setIsExisting(true);
      }
    } catch {
      setShares({ sss: "", gsis: "" });
      setIsExisting(false);
    }
  };

  const handleClose = () => setOpen(false);

  const formatNumber = (value) => {
    const numeric = value.replace(/[^0-9]/g, "");
    return numeric ? Number(numeric).toLocaleString() : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShares({ ...shares, [name]: formatNumber(value) });
  };

  const handleSubmit = async () => {
    const payload = {
      sss: shares.sss.replace(/,/g, ""),
      gsis: shares.gsis.replace(/,/g, ""),
    };
    try {
      if (isExisting) {
        await api.put(`/api/payroll/${payrollId}/government-shares/`, payload);
        alert("Government shares updated successfully.");
      } else {
        await api.post(`/api/payroll/${payrollId}/government-shares/`, payload);
        alert("Government shares created successfully.");
      }

      if (refresh) await refresh(); // 👈 refresh payroll data
      setOpen(false);
    } catch {
      alert("Error saving government shares.");
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Government Shares
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Government Shares
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="SSS"
              name="sss"
              value={shares.sss}
              onChange={handleChange}
              fullWidth
              inputProps={{ inputMode: "numeric" }}
            />
            <TextField
              label="GSIS"
              name="gsis"
              value={shares.gsis}
              onChange={handleChange}
              fullWidth
              inputProps={{ inputMode: "numeric" }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                {isExisting ? "Update" : "Create"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default GovernmentSharesModal;
