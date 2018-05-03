
/**
 * 对象拷贝，参考$.extend()实现。首个参数为true时为深度拷贝，默认为false。
 *
 * @param {any} args
 * @returns
 * @memberof SharedService
 */
export function extend(...args) {
    const isArray = Array.isArray || function (obj) {
        return this.type(obj) === 'array';
    };

    const type = function (obj: object) {
        if (obj === null) {
            return obj + '';
        }
        return typeof obj === 'object' || typeof obj === 'function' ?
            this.class2type[this.toString.call(obj)] || 'object' :
            typeof obj;
    };
    
    let options, name, src, srcType, copy, copyIsArray, clone,
        target = args[0] || {},
        i = 1,
        deep = false;
    const length = args.length;

    if (typeof target === 'boolean') {
        deep = target;
        target = args[i] || {};
        i++;
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = args[i]) !== null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                // 若参数中字段的值就是目标参数，停止赋值，进行下一个字段的赋值
                // 这是为了防止无限的循环嵌套
                if (target === copy) {
                    continue;
                }
                srcType = isArray(src) ? 'array' : typeof src;
                // 不能用typeof判断一个数组是否为数组格式，例：typeof [] -> object。如需判断的话可用'[] instanceof Array'方法。
                // copyType = typeof copy;
                if (deep && copy && ((copyIsArray = isArray(copy)) || typeof copy === 'object')) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && srcType === 'array' ? src : [];
                    } else {
                        clone = src && srcType === 'object' ? src : {};
                    }
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}
