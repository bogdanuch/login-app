const mockRequest = (
    data: any,
    timeout: number = 0,
    error = false
): Promise<any> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            error ? reject(data) : resolve(data);
        }, timeout);
    });
};

export default mockRequest;
