import has from './has';
import isFunction from './isFunction';

const func = Object.prototype.toString;
export default (obj: any): string =>
    has(obj, 'toString') && isFunction(obj.toString) ? obj.toString() : func.call(obj);
