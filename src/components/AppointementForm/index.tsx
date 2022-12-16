import React, { FunctionComponent } from 'react';
import { useState, useRef } from 'react';

import type { Availability, Error } from './types';
import { ErrorMessage } from './types';

import AvailabilityMessage from './AvailabilityMessage';
import { checkAvailability } from './functions';


function AppointementForm() {
    const dateRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<Error>({
        isError: false,
        message: undefined,
    });

    const [availability, setAvailability] = useState<Availability>({
        message: '',
        isAvailable: false,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!dateRef?.current?.value || !timeRef?.current?.value) { 
                throw new Error(ErrorMessage.EmptyFields);
            }

            const date: string = dateRef?.current?.value;
            const time: string = timeRef?.current?.value;

            if (date.length !== 10) {
                throw new Error(ErrorMessage.InvalidDate);
            }

            if (time.length !== 5) {
                throw new Error(ErrorMessage.InvalidTime);
            }

            const isAvailable: boolean = await checkAvailability(date, time);

            if (isAvailable) {
                setAvailability({
                    message: `Un créneau est disponible le ${date} à ${time}`,
                    isAvailable: true,
                });
            } else {
                setAvailability({
                    message: `Le créneau n'est pas disponible le ${date} à ${time}`,
                    isAvailable: false,
                });
            }

        } catch (error) {
            setError({
                isError: true,
                message: error.message,
            });
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', width: '70%', gap: '1rem' }}>
                {
                    error.isError && <p style={{ color: 'red', fontWeight: 'bold' }}>
                        {error?.message}
                    </p>
                }
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h2>Check if the ressource is available</h2>
                    <input type="date" ref={dateRef} />
                    <input type="time" ref={timeRef} />
                    <button type="submit">Check availability</button>
                </form>

                {availability && <AvailabilityMessage availability={availability} />}

            </div>
        </div>
    );
}

export default AppointementForm as FunctionComponent<{}>;