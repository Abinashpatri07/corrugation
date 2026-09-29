const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:3000/api/v1';

export const getInventoryItemDetails = async (id) => {
    const response = await fetch(`${API_BASE_URL}/inventory/items/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch inventory item details');
    }

    return result;
};
