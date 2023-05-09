import axios, { AxiosResponse  } from 'axios';
import { Dish } from '../types/dish'


export default async function submitDish(data: Dish): Promise<number> {
    try {
        const response: AxiosResponse = await axios.post(
            'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/',
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );

        const dishId: number = response.data.id;
        return dishId;
    } catch (error: any ) {
        console.log('api error', error.message)
        throw error
    }
}

