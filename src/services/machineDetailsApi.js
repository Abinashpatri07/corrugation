// =============================================================
// src/services/machineDetailsApi.js
// =============================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:3000/api/v1';


// =============================================================
// Common response parser
// =============================================================

const parseResponse = async (response) => {

  let result = null;

  try {
    result = await response.json();
  } catch {
    // Backend returned non JSON response
  }

  if (!response.ok) {

    throw new Error(
      result?.message ||
      result?.error ||
      `Request failed (${response.status})`
    );

  }

  if (result?.success === false) {

    throw new Error(
      result?.message ||
      'Request failed'
    );

  }

  return result;

};


// =============================================================
// GET MACHINE DETAILS
// GET /api/v1/machines/:id
// =============================================================

export const getMachineDetails = async (
  machineId
) => {

  if (!machineId) {

    throw new Error(
      'Machine ID is required'
    );

  }

  const response = await fetch(

    `${API_BASE_URL}/machines/${encodeURIComponent(
      machineId
    )}`

  );

  return parseResponse(response);

};


// =============================================================
// GET ALL MACHINES
// GET /api/v1/machines
// =============================================================

export const getMachineList = async () => {

  const response = await fetch(
    `${API_BASE_URL}/machines`
  );

  return parseResponse(response);

};


// =============================================================
// DEFAULT EXPORT
// =============================================================

export default getMachineDetails;