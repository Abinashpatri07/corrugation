const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const getAllBills = async () => {
    const response = await fetch(
        `${API_BASE_URL}/purchase/bills`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || 'Failed to fetch bills'
        );
    }

    return result;
};
