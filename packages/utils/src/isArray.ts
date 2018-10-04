import typeOf from './typeOf';
export default (arr: any): boolean => {
    return Array.isArray ? Array.isArray(arr) : typeOf(arr) === '[object Array]';
};
