import React, { useState, useEffect } from "react";
import { Modal, Box, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import api from "../../assets/api";
import { getUserInfoFromToken } from "../../utils/auth";

function DtrStatusModal({ payrollId, staffName }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [payrollStatus, setPayrollStatus] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [waitMessage, setWaitMessage] = useState("");
  const token = localStorage.getItem("userInfo");
  const userInfo = getUserInfoFromToken(token);

  const handleOpen = async () => {
    setOpen(true);
    try {
      const res = await api.get(`/api/payroll/${payrollId}/status/`);
      setPayrollStatus(res.data);
      checkEditPermission(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        const defaultStatus = {
          hr_status: "Pending",
          budget_status: "Pending",
          president_status: "Pending",
        };
        setPayrollStatus(defaultStatus);
        checkEditPermission(defaultStatus);
      } else {
        console.error(err);
        Swal.fire("Error", "Failed to fetch payroll status.", "error");
      }
    }
  };

  const checkEditPermission = (data) => {
    const office = userInfo?.first_name;
    if (office === "HR Office") {
      setCanEdit(true);
      setWaitMessage("");
    } else if (office === "Budget Office") {
      if (data.hr_status === "Accepted") {
        setCanEdit(true);
        setWaitMessage("");
      } else {
        setCanEdit(false);
        setWaitMessage("Wait for HR to Approve the payroll.");
      }
    } else if (office === "Office of the President") {
      if (data.hr_status === "Accepted" && data.budget_status === "Accepted") {
        setCanEdit(true);
        setWaitMessage("");
      } else if (data.hr_status !== "Accepted") {
        setCanEdit(false);
        setWaitMessage("Wait for HR to Approve the payroll.");
      } else {
        setCanEdit(false);
        setWaitMessage("Wait for Budget Office to Approve the payroll.");
      }
    } else if (office === "Cashier") {
      if (
        data.hr_status === "Accepted" &&
        data.budget_status === "Accepted" &&
        data.president_status === "Accepted"
      ) {
        setCanEdit(true);
        setWaitMessage("");
      } else if (data.hr_status !== "Accepted") {
        setCanEdit(false);
        setWaitMessage("Wait for HR to Approve the payroll.");
      } else if (data.budget_status !== "Accepted") {
        setCanEdit(false);
        setWaitMessage("Wait for Budget Office to Approve the payroll.");
      } else {
        setCanEdit(false);
        setWaitMessage(
          "Wait for Office of the President to Approve the payroll."
        );
      }
    } else {
      setCanEdit(false);
      setWaitMessage("");
    }
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!status) {
      setOpen(false);
      Swal.fire("Error", "Please select a status.", "error");
      return;
    }

    let endpoint = "";
    if (userInfo?.first_name === "HR Office")
      endpoint = `/api/payroll/${payrollId}/update/hr/`;
    else if (userInfo?.first_name === "Budget Office")
      endpoint = `/api/payroll/${payrollId}/update/budget/`;
    else if (userInfo?.first_name === "Office of the President")
      endpoint = `/api/payroll/${payrollId}/update/president/`;
    else if (userInfo?.first_name === "Cashier")
      endpoint = `/api/payroll/${payrollId}/update/cashier/`;
    else {
      setOpen(false);
      Swal.fire(
        "Error",
        "You are not authorized to update this payroll.",
        "error"
      );
      return;
    }

    try {
      const payload = {
        [`${userInfo.first_name.split(" ")[0].toLowerCase()}_status`]: status,
        [`${userInfo.first_name.split(" ")[0].toLowerCase()}_reason`]: reason,
      };

      await api.put(endpoint, payload);

      // 📨 Send SMS after successful update
      // await api.post(`/api/send-payroll-sms/${payrollId}/`);

      setOpen(false);
      setStatus("");
      setReason("");
      Swal.fire(
        "Success",
        "Status updated and SMS sent successfully!",
        "success"
      );
    } catch (error) {
      setOpen(false);
      Swal.fire("Error", "Failed to update status or send SMS.", "error");
      console.error(error);
    }
  };

  const renderStatus = () => {
    if (!payrollStatus) return null;

    const role = userInfo?.first_name;
    const statusMap = {
      "HR Office": {
        label: "HR Status",
        value: payrollStatus.hr_status,
        reason: payrollStatus.hr_reason,
      },
      "Budget Office": {
        label: "Budget Status",
        value: payrollStatus.budget_status,
        reason: payrollStatus.budget_reason,
      },
      "Office of the President": {
        label: "President Status",
        value: payrollStatus.president_status,
        reason: payrollStatus.president_reason,
      },
      Cashier: {
        label: "Cashier Status",
        value: payrollStatus.cashier_status,
        reason: payrollStatus.cashier_reason,
      },
    };

    const current = statusMap[role];
    if (!current) return null;

    return (
      <>
        <p className="text-sm text-gray-600">
          Current {current.label}:{" "}
          <span className="font-medium text-blue-600 cursor-pointer underline decoration-dotted">
            {current.value || "Pending"}
          </span>
        </p>{" "}
        <p className="text-xs text-gray-500 italic">
          Details: "{current.reason || "No details provided"}"
        </p>
      </>
    );
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-blue-600 text-[13px] cursor-pointer hover:scale-110 duration-300"
      >
        DTR Status
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 w-[350px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Update DTR Status for
          </h2>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {" "}
            {staffName}
          </h2>
          <p className="text-sm mb-2 text-gray-500 flex flex-row items-center justify-between">
            From {userInfo.first_name}
          </p>

          {renderStatus()}

          {(() => {
            const role = userInfo?.first_name;
            const data = payrollStatus;

            if (
              role === "Budget Office" &&
              (!data || data.hr_status !== "Approved")
            ) {
              return (
                <p className="text-red-600 text-sm text-center">
                  Wait for HR to Approve the payroll
                </p>
              );
            }
            if (
              role === "Office of the President" &&
              (!data || data.budget_status !== "Accepted")
            ) {
              return (
                <p className="text-red-600 text-sm text-center">
                  Wait for Budget Office to Approve the payroll
                </p>
              );
            }
            if (
              role === "Cashier" &&
              (!data || data.president_status !== "Approved")
            ) {
              return (
                <p className="text-red-600 text-sm text-center">
                  Wait for Office of the President to Approve the payroll
                </p>
              );
            }
            return null;
          })()}

          <div className="flex flex-col gap-3 mt-2">
            {(() => {
              const role = userInfo?.first_name;
              const data = payrollStatus;
              let editable = false;

              if (role === "HR Office") editable = true;
              if (role === "Budget Office" && data?.hr_status === "Approved")
                editable = true;
              if (
                role === "Office of the President" &&
                data?.budget_status === "Approved"
              )
                editable = true;
              if (role === "Cashier" && data?.president_status === "Approved")
                editable = true;

              if (!editable) {
                return (
                  <div className="mt-4 flex justify-end">
                    <button
                      className="px-4 py-2 text-sm rounded bg-red-500 text-white cursor-not-allowed"
                      disabled
                    >
                      Submit
                    </button>
                  </div>
                );
              }

              return (
                <>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  {status && (
                    <textarea
                      placeholder={`Input details why you ${status} this Payroll`}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 resize-none h-20"
                    />
                  )}

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    By clicking Submit, the employees will notify via sms
                    notification about their payroll status.
                  </p>
                </>
              );
            })()}
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default DtrStatusModal;
