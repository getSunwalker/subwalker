import has from './has';
import isArray from './isArray';
import isArrayLike from './isArrayLike';
import isFunction from './isFunction';
import typeOf from './typeOf';
const baseTypes = ['number', 'boolean', 'undefined'];
export default <T>(obj: any | T[], cb: (value: T, prop: string | number) => any | any): void => {
    const type: string = typeOf(obj);
    if (!isFunction(cb) || obj === null || baseTypes.indexOf(type) > -1) {
        return;
    }
    if (isArray(obj) || isArrayLike(obj)) {
        obj = obj as T[];
        for (let i = 0; i < obj.length; i++) {
            cb(obj[i], i);
        }
    } else if (type === 'object') {
        for (const prop in obj) {
            if (has(obj, prop)) {
                cb(obj[prop], prop as string);
            }
        }
    } else {
        return;
    }
};
