import type { 
    SafeGetAvailabilityFetchOptions, 
    AvailabilityFetchResponse,
} from './types';
import { ErrorMessage } from './types';

const BASE_URL: string = 'http://localhost:8080/resource/1337/available';

const fetchOptions: SafeGetAvailabilityFetchOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

const checkAvailability = async (date: string, time: string): Promise<boolean> => {
    try {
        const fetchURL = `${ BASE_URL }?datetime=${date}T${time}`;

        const response = await fetch(fetchURL, fetchOptions) as Response;
        const data = await response.json() as AvailabilityFetchResponse;

        return data.available;
    } catch (error: unknown) {
        throw new Error(ErrorMessage.ConnectionError);
    }
};

export { checkAvailability };