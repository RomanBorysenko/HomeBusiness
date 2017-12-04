/**
 * Creates fetch response for each test.
 * @number status
 * @string statusText
 * @json response
 */
export const mockResponse = (status, statusText, response) => {
    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(new window.Response(response, {
            status: status,
            statusText: statusText,
            headers: {
                'Content-type': 'application/json'
            }
        }))
    });
};