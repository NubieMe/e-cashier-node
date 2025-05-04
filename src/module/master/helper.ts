import { ObjectId } from "mongodb";

/**
 * Filter out all keys that are not included in the keys array from the data object.
 * @param data The object to filter.
 * @param keys The array of keys to include in the filtered object.
 * @returns The filtered object.
 */
export const filter = (data: any, keys: Array<string>) => {
    const dataCopy = { ...data };
    Object.keys(dataCopy).forEach((k) => {
        if (!keys.includes(k)) {
            delete dataCopy[k];
        }
    })
    return dataCopy;
};

/**
 * Pads a number or string with leading zeros until it reaches the given length.
 * @param number The number or string to pad.
 * @param length The length to pad the string to.
 * @returns The padded string.
 */
export const pad = (number: number | string, length: number) => {
    let str = String(number);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
};

/**
 * Checks if the given string is a valid ObjectId.
 * @param str The string to check.
 * @returns The ObjectId instance if the string is valid, otherwise null.
 */
export const isObjectId = (str: string) => {
    try {
        return new ObjectId(str);
    } catch (error) {
        return null;
    }
};

/**
 * Returns a query object for MongoDB that matches all dates in the given month (inclusive),
 * taking into account the UTC+7 timezone offset.
 * @param date The date for which to get the query object.
 * @returns The query object.
 */
export const queryMonth = (date: Date | string) => {
    const tzOffset = 7 * 60 * 60000;

    const start_date = new Date(date);
    start_date.setDate(1);
    start_date.setHours(0, 0, 0, 0);
    const start_utc7 = new Date(start_date.getTime() - tzOffset);

    const end_date = new Date(start_date);
    end_date.setMonth(end_date.getMonth() + 1);
    end_date.setDate(0);
    end_date.setHours(23, 59, 59, 999);
    const end_utc7 = new Date(end_date.getTime() - tzOffset);

    return { $gte: start_utc7, $lte: end_utc7 };
};