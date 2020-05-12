export class Profile {
    firstName: string;
    lastName: string;
    city: string;
    photoUrl: string;
    interests: string;

    constructor(values: {}) {
        Object.assign(this, values);
    }
}