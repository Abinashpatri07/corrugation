const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3000/api/v1";

const BASE_URL =
  `${API_BASE_URL}/manufacturing-orders`;

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message ||
      `Request failed with status ${response.status}`
    );
  }

  return result;
};

// Fetch the list shown in the left sidebar.
export const getManufacturingOrders = async ({
  search = "",
  status = "",
  limit = 100,
  offset = 0,
} = {}) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (status) params.set("status", status);

  params.set("limit", String(limit));
  params.set("offset", String(offset));

  const result = await request(
    `${BASE_URL}?${params.toString()}`
  );

  return result.data || [];
};

// Fetch the details page for one manufacturing order.
// Accepts a numeric database ID or an MO number.
export const getManufacturingOrderById = async (id) => {
  if (!id) {
    throw new Error("Manufacturing order ID is required.");
  }

  const result = await request(
    `${BASE_URL}/${encodeURIComponent(id)}`
  );

  return result.data;
};

// Create a new manufacturing order.
export const createManufacturingOrder = async (payload) => {
  const result = await request(BASE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result.data;
};

// Update an existing manufacturing order.
export const updateManufacturingOrder = async (id, payload) => {
  const result = await request(
    `${BASE_URL}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );

  return result.data;
};

// Update the manufacturing order status.
export const updateManufacturingOrderStatus = async (
  id,
  status,
  modified_by = null
) => {
  const result = await request(
    `${BASE_URL}/${encodeURIComponent(id)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status, modified_by }),
    }
  );

  return result.data;
};

export default {
  getManufacturingOrders,
  getManufacturingOrderById,
  createManufacturingOrder,
  updateManufacturingOrder,
  updateManufacturingOrderStatus,
};