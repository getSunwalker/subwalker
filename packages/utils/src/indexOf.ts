import isArray from './isArray';
import isArrayLike from './isArrayLike';
import _has from './_has';
import isFunction from './isFunction';
const _indexOf = Array.prototype.indexOf;
export default (list: any, item: any): number => {
    if (isArray(list) || isArrayLike(list)) {
        return _indexOf.call(list, item);
    }
    if (_has(list, 'indexOf') && isFunction(list.indexOf)) {
        return list.indexOf(item);
    }
    return -1;
};
