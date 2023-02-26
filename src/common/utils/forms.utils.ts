import { FormEvent } from "react";

export const getFormData = <T>(event: FormEvent<HTMLFormElement>): T => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {} as T;
    type dataKey = keyof typeof data;

    const formEntries = formData.entries() as unknown as [
        dataKey,
        (typeof data)[dataKey],
    ][];

    for (const pair of formEntries) {
        const key: dataKey = pair[0];
        const value = pair[1];
        data[key] = value;
    }

    return data;
};

export const handleFormSubmit = <T>(
    event: FormEvent<HTMLFormElement>,
    actionFn: (payload: T) => any,
) => {
    event.preventDefault()

    const payload = getFormData<T>(event)

    actionFn(payload)
    return 
};
