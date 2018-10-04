import isArray from './isArray';
import isArrayLike from './isArrayLike';
import typeOf from './typeOf';
import isFunction from './isFunction';
const baseTypes = ['number', 'boolean', 'undefined'];
export default (obj: any, cb: Function | any) => {
    if (!isFunction(cb) || obj === null || baseTypes.indexOf(typeOf(obj)) > -1) {
        return;
    }
    if (isArray(obj) || isArrayLike(obj)) {
        for (let i = 0; i < obj.length; i++) {
            cb(obj[i], i);
        }
    } else {
        for (let prop in obj) {
            cb(obj[prop] as any, prop as string);
        }
    }
};
