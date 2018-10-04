import _has from './_has';
import indexOf from './indexOf';
import isArray from './isArray';
import isArrayLike from './isArrayLike';
export default (obj: any, prop: string): boolean => {
    if (isArray(obj) || isArrayLike(obj)) {
        return indexOf(obj, prop) > -1;
    }
    if (prop in obj) {
        return true;
    }
    return _has(obj, prop);
};
