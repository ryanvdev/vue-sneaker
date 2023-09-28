function asyncSleep(millisecond:number):Promise<void> {
    return new Promise((resolve, reject) => {
        const timeOutId = setTimeout(() => {
            resolve();
        }, millisecond);
    });
}

export {asyncSleep};