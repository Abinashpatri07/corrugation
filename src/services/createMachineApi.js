// =====================================================
// CREATE MACHINE API
// =====================================================
// This file connects the React Machine form
// with the Node/Express Machine backend.
//
// Backend endpoint:
//
// POST /api/v1/machines
// =====================================================


const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:3000/api/v1';


// =====================================================
// CREATE MACHINE
// =====================================================
//
// machineData = data collected from CreateMachinePage
//
// Returns:
// Backend response
//
// =====================================================

export const createMachine = async (
    machineData
) => {

    // -------------------------------------------------
    // Send POST request to backend
    // -------------------------------------------------

    const response = await fetch(

        `${API_BASE_URL}/machines`,

        {

            method: 'POST',

            headers: {

                'Content-Type':
                    'application/json'

            },

            // Convert JavaScript object
            // into JSON.
            body:
                JSON.stringify(
                    machineData
                )

        }

    );


    // -------------------------------------------------
    // Convert backend response to JSON
    // -------------------------------------------------

    const result =
        await response.json();


    // -------------------------------------------------
    // Check whether backend returned an error
    // -------------------------------------------------

    if (
        !response.ok
    ) {

        // Backend validation errors
        if (
            result.errors &&
            Array.isArray(
                result.errors
            )
        ) {

            const errorMessages =
                result.errors
                    .map(
                        err =>
                            err.msg || err
                    )
                    .join(', ');


            throw new Error(
                `Validation failed: ${errorMessages}`
            );

        }


        // Normal backend error
        throw new Error(

            result.message ||
            'Failed to create machine'

        );

    }


    // -------------------------------------------------
    // Return successful response
    // -------------------------------------------------

    return result;

};