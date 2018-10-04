import has from './has';
import isArray from './isArray';
import isArrayLike from './isArrayLike';
import isFunction from './isFunction';
import typeOf from './typeOf';
const baseTypes = ['number', 'boolean', 'undefined'];
type IEachCallback = <T, K>(value: K, prop: string | number) => T;
export default <T>(obj: any, cb: IEachCallback | any) => {
    const type: string = typeOf(obj);
    if (!isFunction(cb) || obj === null || baseTypes.indexOf(type) > -1) {
        return;
    }
    if (isArray(obj) || isArrayLike(obj)) {
        for (let i = 0; i < obj.length; i++) {
            cb(obj[i] as T, i);
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
