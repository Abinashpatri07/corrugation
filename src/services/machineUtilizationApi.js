// =====================================================
// MACHINE UTILIZATION API
// =====================================================

const API_BASE_URL =
    'http://localhost:3000/api/v1/machines';


// =====================================================
// GET MACHINE UTILIZATION
// =====================================================

export const getMachineUtilization = async (
    machineId,
    range = 'last_week'
) => {

    const response =
        await fetch(
            `${API_BASE_URL}/${machineId}/utilization?range=${range}`
        );


    if (!response.ok) {

        const errorData =
            await response.json()
                .catch(() => ({}));

        throw new Error(
            errorData.message ||
            'Failed to load machine utilization'
        );
    }


    const result =
        await response.json();


    if (!result.success) {

        throw new Error(
            result.message ||
            'Failed to load machine utilization'
        );
    }


    return result.data;
};