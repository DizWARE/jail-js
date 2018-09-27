/**
 * Adds a template tag to the given HTML content.
 *
 * @export
 * @param {string} htmlContent
 * @returns
 */
export function addTemplateTag(htmlContent: string, tagName: string) {
    return /^<template(.*)>.*<\/template>$/s.test(htmlContent) ? 
        htmlContent.replace(/^<template(.*)>/, `<template id=${tagName}$1>`) :
        `<template id=${tagName}>${htmlContent}</template>`;
}

/**
 * Adds a style tag to the given HTML content.
 *
 * @export
 * @param {string} styleContent
 * @returns
 */
export function addStyleTag(styleContent: string) {
    return /^<style>.*<\/style>$/s.test(styleContent) ? 
        styleContent :
        `<style>${styleContent}</style>`;
}

/**
 * Minimizes the html by remove all whitespace and replacing it with just single spaces.
 *
 * @export
 * @param {string} htmlContent
 * @returns
 */
export function minimizeHtml(htmlContent: string) {
    return htmlContent.replace(/\s+/sg, " ");
}