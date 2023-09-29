function asyncSleep(millisecond:number):Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, millisecond);
    });
}

export {asyncSleep};