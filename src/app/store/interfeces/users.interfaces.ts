export interface Session {
    id: number;
    status: boolean;
}

export interface User {
    firstName: string;
    lastName: string;
    city?: string;
    photoUrl: string;
}

export interface UserAPI {
    response: [{
        city: {
            title: string;
        };
        first_name: string;
        interests: string;
        last_name: string;
        photo_100: string;
    }];
}

