const func = Object.prototype.hasOwnProperty;
export default (obj: any, prop: string) => func.call(obj, prop);
