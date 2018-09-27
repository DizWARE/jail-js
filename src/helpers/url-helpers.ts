/**
 * Checks to see if the provided url is a data url.
 *
 * @export
 * @param {string} url
 * @returns
 */
export function isDataUrl(url: string) {
    return /^data:/.test(url);
}

/**
 * Converts a string of data into a data url.
 *
 * @export
 * @param {string} content
 * @param {("text/html" | "text/css")} type
 * @returns
 */
export function convertToDataUrl(content: string, type: "text/html" | "text/css") {
    return `data:${type};base64,${btoa(content)}`;
}

/**
 * Gets a fake url used to represent the content that was loaded.
 *
 * @export
 * @param {string} name
 * @param {("html" | "css")} type
 * @returns
 */
export function getFacadeUrl(name: string, type: "template" | "css") {
    return `jail-js://${type}/${name}`;
}