export interface Availability {
    message: string
    isAvailable: boolean
}

export interface Error {
    isError: boolean
    message: ErrorMessage | undefined
}

export interface AvailabilityFetchResponse {
    available: boolean
}

export enum ErrorMessage {
    EmptyFields = 'Veuillez remplir tous les champs pour continuer !',
    InvalidDate = 'Veuillez entrer une date valide !',
    InvalidTime = 'Veuillez entrer une heure valide !',
    ConnectionError = 'Erreur de connexion au service de disponibilité !',
}

export interface SafeGetAvailabilityFetchOptions {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}