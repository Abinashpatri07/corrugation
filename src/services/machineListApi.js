/*
=========================================================
MACHINE LIST API
=========================================================

This file is responsible for getting machines from
the backend and sending the data to MachinePage.jsx.
=========================================================
*/

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:3000/api/v1';


/*
=========================================================
GET ALL MACHINES

Backend:
GET /api/v1/machines
=========================================================
*/

export const getMachines = async () => {

    const response = await fetch(
        `${API_BASE_URL}/machines`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );


    /*
    -----------------------------------------------------
    Convert response into JSON
    -----------------------------------------------------
    */

    const result = await response.json();


    /*
    -----------------------------------------------------
    Handle backend error
    -----------------------------------------------------
    */

    if (!response.ok) {

        throw new Error(
            result.message ||
            'Failed to fetch machines'
        );
    }


    /*
    -----------------------------------------------------
    Return machine array

    Backend response:

    {
        success: true,
        message: "...",
        data: [...]
    }
    -----------------------------------------------------
    */

    return result.data || [];
};