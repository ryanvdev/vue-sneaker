

export function className(...v:(string|undefined|null|boolean)[]) {
    const result = v.join(' ');
    console.log(result);
    return result;
}