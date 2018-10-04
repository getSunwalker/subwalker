import toString from './toString';
export default (obj: any): string => {
    const type = typeof obj;
    if (type !== 'object') {
        return type;
    }
    return toString(obj);
};
