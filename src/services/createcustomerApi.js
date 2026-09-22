const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const createCustomer = async (customerData) => {

    const response = await fetch(
        `${API_BASE_URL}/customers`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
            const errorMessages = result.errors.map(err => err.msg).join(', ');
            throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw new Error(
            result.message || 'Failed to create customer'
        );
    }

    return result;
};