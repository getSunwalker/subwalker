import isArray from './isArray';
import isArrayLike from './isArrayLike';
import indexOf from './indexOf';
import _has from './_has';
export default (obj: any, prop: string): boolean => {
    if (isArray(obj) || isArrayLike(obj)) {
        return indexOf(obj, prop) > -1;
    }
    if (prop in obj) {
        return true;
    }
    return _has(obj, prop);
};
