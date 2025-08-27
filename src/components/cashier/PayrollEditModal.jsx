import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import api from "../../assets/api";

function PayrollEditModal({ open, handleClose, payroll, refresh }) {
  const [formData, setFormData] = useState({
    status: "",
    date_release: "",
  });

  useEffect(() => {
    if (payroll) {
      setFormData({
        status: payroll.status || "",
        date_release: payroll.date_release || "",
      });
    }
  }, [payroll]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.patch(
        `/api/payroll/${payroll.id}/update-status-release/`,
        formData
      );
      refresh(); // refetch payrolls from parent
      handleClose();
    } catch (error) {
      console.error("Error updating payroll:", error);
    }
    console.log(formData);
  };

  return (
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
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Payroll
        </Typography>

        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Released">Released</MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="date"
          label="Release Date"
          name="date_release"
          value={formData.date_release}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PayrollEditModal;
