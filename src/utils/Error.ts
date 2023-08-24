export default class CustomError extends Error {
    private statusCode: number;
    private data: any;
    constructor(message: string) {
        super();
        super.message = message
        this.statusCode = 500;
    }
    setData = <T>(data: T): CustomError => {
        this.data = data;
        return this;
    }
    setStatusCode = (code: number): CustomError => {
        this.statusCode = code;
        return this;
    }
    getStatusCode = (): number => {
        return this.statusCode;
    }
    getData = () => {
        return this.data;
    }
    throw = (): never => {
        throw this;
    }
};
