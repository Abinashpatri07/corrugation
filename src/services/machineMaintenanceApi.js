// src/services/machineMaintenanceApi.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:3000/api/v1';


// =====================================================
// GET MACHINE MAINTENANCE
// =====================================================

export const getMachineMaintenance = async (machineId) => {

  if (!machineId) {
    throw new Error('Machine ID is required');
  }

  const response = await fetch(
    `${API_BASE_URL}/machines/${encodeURIComponent(machineId)}/maintenance`
  );

  let result = null;

  try {
    result = await response.json();
  } catch {
    // Backend did not return JSON
  }

  if (!response.ok) {

    throw new Error(
      result?.message ||
      result?.error ||
      `Failed to fetch machine maintenance (${response.status})`
    );

  }

  if (result?.success === false) {

    throw new Error(
      result.message ||
      'Failed to fetch machine maintenance'
    );

  }

  return result;

};


export default getMachineMaintenance;