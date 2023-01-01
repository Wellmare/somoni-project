export const doAsyncFunc = (func: () => void): unknown => {
    return (async () => {
        await func();
    })();
};
