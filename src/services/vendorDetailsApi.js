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
// GET VENDOR DETAILS
// =====================================================

export async function getVendorDetails(vendorId) {

    const response = await fetch(
        `${API_BASE_URL}/vendors/${vendorId}`
    );

    return handleResponse(
        response,
        "Failed to fetch vendor details"
    );
}


// =====================================================
// GET VENDOR COMMERCIAL TERMS
// =====================================================

export async function getVendorCommercialTerms(vendorId) {

    const response = await fetch(
        `${API_BASE_URL}/vendors/${vendorId}/commercial-terms`
    );

    return handleResponse(
        response,
        "Failed to fetch vendor commercial terms"
    );
}


// =====================================================
// GET VENDOR REEL SPECIFICATIONS
// =====================================================

export async function getVendorReelSpecifications(vendorId) {

    const response = await fetch(
        `${API_BASE_URL}/vendors/${vendorId}/reel-specifications`
    );

    return handleResponse(
        response,
        "Failed to fetch reel specifications"
    );
}


// =====================================================
// GET VENDOR ORDER HISTORY
// =====================================================

export async function getVendorOrderHistory(
    vendorId,
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
        `${API_BASE_URL}/vendors/${vendorId}/order-history` +
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
