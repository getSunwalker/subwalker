export default (fun: any): boolean => {
    return typeof fun === 'function' || fun instanceof Function;
};
