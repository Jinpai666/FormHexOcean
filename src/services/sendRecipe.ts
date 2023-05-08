import axios, { AxiosResponse } from 'axios';

interface Dish {
    name: string;
    preparation_time: string;
    type: string;
    no_of_slices?: string;
    diameter?: string;
    spiciness_scale?: string;
    slices_of_bread?: string;
}

export  default async function submitDish(data: Dish): Promise<number> {
    try {
        const response: AxiosResponse<{ id: number }> = await axios.post( // Specify the expected response type
            'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/',
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );

        const dishId: number = response.data.id;
        return dishId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Request was made and server responded with a status code
                console.log('Validation errors:', error.response.data);
            } else {
                // Something else went wrong
                console.log('Error:', error.message);
            }
        } else {
            // Handle other types of errors
            console.log('Error:', error);
        }

        throw error; // Rethrow the error to handle it further if needed
    }
}


