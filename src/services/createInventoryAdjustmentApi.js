const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const createInventoryAdjustment = async (payload) => {
    const response = await fetch(
        `${API_BASE_URL}/inventory/control`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
            const errorMessages = result.errors.map(err => err.msg).join(', ');
            throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw new Error(
            result.message || 'Failed to create inventory adjustment'
        );
    }

    return result;
};
