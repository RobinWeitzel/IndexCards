export class Answer {
    text: string;
    correct: boolean;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}