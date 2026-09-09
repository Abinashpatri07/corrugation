const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000/api/v1";


// =====================================================
// COMMON API HANDLER
// =====================================================

async function handleResponse(response, defaultMessage) {

    const result = await response.json();

    if (!response.ok) {

        throw new Error(
            result.message || defaultMessage
        );
    }

    return result;
}


// =====================================================
// GET CUSTOMER DETAILS
// =====================================================

export async function getCustomerDetails(customerId) {

    const response = await fetch(
        `${API_BASE_URL}/customers/${customerId}`
    );

    return handleResponse(
        response,
        "Failed to fetch customer details"
    );
}


// =====================================================
// GET CUSTOMER COMMERCIAL TERMS
// =====================================================

export async function getCustomerCommercialTerms(customerId) {

    const response = await fetch(
        `${API_BASE_URL}/customers/${customerId}/invoice`
    );

    return handleResponse(
        response,
        "Failed to fetch customer commercial terms"
    );
}


// =====================================================
// GET CUSTOMER BOX SPECIFICATIONS
// =====================================================

export async function getCustomerBoxSpecifications(customerId) {

    const response = await fetch(
        `${API_BASE_URL}/customers/${customerId}/box-specifications`
    );

    return handleResponse(
        response,
        "Failed to fetch box specifications"
    );
}


// =====================================================
// GET CUSTOMER ORDER HISTORY
// =====================================================

export async function getCustomerOrderHistory(
    customerId,
    params = {}
) {

    const searchParams =
        new URLSearchParams();

    if (params.page) {
        searchParams.append(
            'page',
            params.page
        );
    }

    if (params.limit) {
        searchParams.append(
            'limit',
            params.limit
        );
    }

    if (params.search) {
        searchParams.append(
            'search',
            params.search
        );
    }

    if (params.startDate) {
        searchParams.append(
            'startDate',
            params.startDate
        );
    }

    if (params.endDate) {
        searchParams.append(
            'endDate',
            params.endDate
        );
    }

    const queryString =
        searchParams.toString();

    const url =
        `${API_BASE_URL}/customers/${customerId}/order-history` +
        (
            queryString
                ? `?${queryString}`
                : ''
        );

    const response =
        await fetch(url);

    return handleResponse(
        response,
        "Failed to fetch order history"
    );
}