import React, { FunctionComponent } from 'react';
import type { Availability } from './types';

const AvailabilityMessage = ({ availability }: { availability: Availability }) => {
    const { 
        message,
        isAvailable
    } = availability;

    return <p style={{ 
        color: isAvailable ? 'green' : 'red', 
        fontWeight: 'bold'
    }}>
        { message }
    </p>;
};

export default AvailabilityMessage as FunctionComponent<{ availability: Availability }>;