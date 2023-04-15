type ExtractDate<T> = (arg: T) => Date | string | number | null

type FindMaxDateOverload = {
    (arr: (Date | string | number | null)[]): Date | null;
    <T=any>(arr: (T | null)[], extractFn: ExtractDate<T>): Date | null;
}

type GetDateValueOverload = {
    (value: number | string| Date | null): Date | number,
    <T>(value: T | null, extractFn: ExtractDate<T>): Date | number
}

const getDateValue: GetDateValueOverload = (
    value: any, 
    extractFn?: ExtractDate<T>,
) => {
    if (value === null) {
        return Number.NEGATIVE_INFINITY;
    }

    if (extractFn) {
        const exctractedDate = extractFn(value);

        if (exctractedDate !== null) {
            return new Date(exctractedDate);
        }

        return Number.NEGATIVE_INFINITY;
    } else {
        return new Date((value as number | string));
    }
};

export const findMaxDate: FindMaxDateOverload = (
    arr: (Date | string | number | null)[],
    extractFn?: (obj: unknown) => Date | string | number | null,
) => {
    const firstDate = extractFn ? extractFn(arr[0]) : arr[0];
    if (firstDate === undefined) {
        return null;
    }

    const maxDate = new Date(
        Math.max(
            ...arr.map((i) => Number(getDateValue(i, extractFn))),
        ),
    );
    return maxDate;
};