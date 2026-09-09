const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:3000/api/v1';

export const getCustomers = async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
    sortBy = 'createdAt',
    sortOrder = 'desc'
} = {}) => {

    const params = new URLSearchParams();

    // Pagination
    params.append('page', String(page));
    params.append('limit', String(limit));

    // Search - only send when entered
    if (search.trim()) {
        params.append('search', search.trim());
    }

    // Status - only send when selected
    if (status) {
        params.append('status', status);
    }

    // Sorting
    params.append('sortBy', sortBy);
    params.append('sortOrder', sortOrder);

    const response = await fetch(
        `${API_BASE_URL}/customers?${params.toString()}`,
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
            result.message || 'Failed to fetch customers'
        );
    }

    return result;
};