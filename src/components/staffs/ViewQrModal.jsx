import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import api from "../../assets/api";

function ViewQrModal({ payrollId }) {
  const [open, setOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState(null);

  const handleOpen = async () => {
    setOpen(true);
    try {
      const response = await api.get(`/api/qr/${payrollId}/`, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      setQrUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setQrUrl(null);
  };

  const handleDownload = () => {
    if (qrUrl) {
      const link = document.createElement("a");
      link.href = qrUrl;
      link.download = `qr_${payrollId}.png`;
      link.click();
    }
  };

  return (
    <div>
      <p onClick={handleOpen}>
        View QR Code
      </p>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            width: 300,
          }}
        >
          <Typography variant="h6" mb={2}>
            QR Code
          </Typography>

          {qrUrl ? (
            <img
              src={qrUrl}
              alt="QR Code"
              style={{ width: "100%", marginBottom: "16px" }}
            />
          ) : (
            <Typography>Loading...</Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            sx={{ mr: 1 }}
            disabled={!qrUrl}
          >
            Download
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewQrModal;
