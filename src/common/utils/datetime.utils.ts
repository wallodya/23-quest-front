type FindMaxDateOverload = {
    (arr: (Date | string | number | null)[]): Date | null;
    <T = any>(
        arr: (T | null)[],
        extractFn: (arg: T | null) => Date | string | number | null,
    ): Date | null;
};

export const findMaxDate: FindMaxDateOverload = (
    arr: (Date | string | number | null)[],
    extractFn?: (obj: unknown) => Date | string | number | null,
) => {
    const firstDate = extractFn ? extractFn(arr[0]) : arr[0];
    if (firstDate === undefined) {
        return null;
    }

    const getDateValue = (value: number | string | Date | null) => {
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
            return new Date(value);
        }
    };

    const maxDate = new Date(
        Math.max(...arr.map((i) => Number(getDateValue(i)))),
    );
    return maxDate;
};
