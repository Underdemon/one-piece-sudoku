/*
in the case of the character list, the handleSearch function is called every time the user types a character in the input field
This can be a problem if the user types quickly because the function will be called many times in quick succession

the debounce function will limit the rate at which the handleSearch function can be called
 */

export function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}