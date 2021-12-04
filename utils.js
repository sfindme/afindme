var utils = {
    /**
     * 环境设置
     * 提交的时候需要修改成build
     *
     * 本地开发环境: dev
     * 线上正式环境: build
     */
    ENV: 'build',
    /**
     * 判断基本类型
     *
     * @param {*} obj 任意类型
     * @return {String} 类型的小写别称
     */
    type: function (obj) {
        if (obj === null || obj === undefined) {
            return String(obj);
        }
        return Object.prototype.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
    },
    /**
     * 判断是否为真正的数字
     *
     * @param {Number} obj 需要判断的参数
     * @return {Boolean} true为数字,false不为数字
     */
    isNumber: function (obj) {
        return this.type(obj) === "number" ? !isNaN(obj) && obj < Number.MAX_VALUE && isFinite(obj) : false;
    },
    /**
     * 判断是否为字符串
     *
     * @param {String} obj 需要判断的参数
     * @return {Boolean} true为字符串,false不为字符串
     */
    isString: function (obj) {
        return this.type(obj) === "string";
    },
    /**
     * 判断是否为null
     *
     * @param {Null} obj 需要判断的参数
     * @return {Boolean} true为null,false不为null
     */
    isNull: function (obj) {
        return this.type(obj) === "null";
    },
    /**
     * 判断是否为undefined
     *
     * @param {Undefined} obj 需要判断的参数
     * @return {Boolean} true为undefined,false不为undefined
     */
    isUndefined: function (obj) {
        return this.type(obj) === "undefined";
    },
    /**
     * 判断是否为数组
     *
     * @param {Array} obj 需要判断的参数
     * @return {Boolean} true为数组,false不为数组
     */
    isArray: function (obj) {
        return this.type(obj) === "array";
    },
    /**
     * 判断是否为函数
     *
     * @param {Function} obj 需要判断的参数
     * @return {Boolean} true为函数,false不为函数
     */
    isFunction: function (obj) {
        return this.type(obj) === "function";
    },
    /**
     * 判断是否为对象
     *
     * @param {Object} obj 需要判断的参数
     * @return {Boolean} true为对象,false不为对象
     */
    isObject: function (obj) {
        return this.type(obj) === "object";
    },
    /**
     * 判断是否为布尔值
     *
     * @param {Boolean} obj 需要判断的参数
     * @return {Boolean} true为布尔值,false不为布尔值
     */
    isBoolean: function (obj) {
        return [true, false].indexOf(obj) !== -1;
    },
    /**
     * 判断是否为正整数(包括0)
     *
     * @param {Number} obj 需要判断的参数
     * @return {Boolean} true为正整数,false不为正整数
     */
    isPositiveInteger: function (obj) {
        if (!this.isNumber(obj) || obj < 0) return false;
        return obj.toString().indexOf('.') === -1;
    },
    /**
     * 判断是否为空对象,空数组
     *
     * @param {Array|Object} obj 需要判断的参数
     * @return {Boolean} true为空对象或空数组,false不为空对象或空数组
     */
    isEmptyObject: function (obj) {
        if (this.isArray(obj)) {
            return obj.length === 0;
        }
        if (this.isObject(obj)) {
            return JSON.stringify(obj) === "{}";
        }
        return false;
    },
    /**
     * 复制数组或对象
     *
     * @param {Array|Object} [param] 需要复制的参数
     * @param {Boolean} [bool] 是否深度复制 true:是(默认),false:不是
     * @return {Array|Object} 复制后的数组或对象
     */
    clones: function (param, bool) {
        bool = this.isBoolean(bool) ? bool : true;
        if (!(this.isArray(param) || this.isObject(param))) return [];
        if (this.isArray(param)) {
            return bool === true ? JSON.parse(JSON.stringify(param)) : param.slice();
        } else {
            return bool === true ? JSON.parse(JSON.stringify(param)) : param;
        }
    },
    /**
     * 判断是否为类数组
     * 类数组定义：
     * 1.有length,且0<=length<=Number.MAX_VALUE,正整数 ----条件
     * 2.属性以数字排序
     * {'0': '我', '1': '们', length: 2}
     *
     * @param {Object} obj 类数组
     * @return {Boolean} true为类数组,false不为类数组
     * */
    isClassArray: function (obj) {
        return this.isObject(obj) && obj.length !== undefined && this.isPositiveInteger(obj.length);
    },
    /**
     * 时间string格式处理(时分秒)
     * 如2020-04-26 09:28:14:323
     *
     * @param {String} str 待处理格式
     * @return {String} 处理过后的时间 2020-04-26 09:28:14
     * */
    getFormatHandle: function (str) {
        if (!this.isString(str)) return '';
        var timeArr = str.split(' ');
        return timeArr[0] + ' ' + timeArr[1].split(':').slice(0, 3).join(':');
    },
    /**
     * 当前时间集合
     *
     * @param {Object} [obj] 参数集合
     * @param {Number} [obj.type] 返回类型 0:时间集合对象(默认),1:当前时间戳
     * @param {Number} [obj.timeStamp] 时间戳
     * @param {Object} [obj.format] 年月日--连接符，时分秒--连接符
     * @param {String} [obj.format.yearMark] 年月日--连接符
     * @param {String} [obj.format.timeMark] 时分秒--连接符
     * @return {Object|Number} 时间集合对象或时间戳
     * */
    getCurrentTime: function (obj) {
        if (this.isObject(obj)) {
            if (obj.type === undefined || [0, 1].indexOf(obj.type) === -1) {
                obj['type'] = 0;
            }
            if (obj.timeStamp === undefined || !this.isPositiveInteger(obj.timeStamp)) {
                obj['timeStamp'] = new Date().getTime();
            }
            if (this.isObject(obj.format)) {
                if (!this.isString(obj.format.yearMark)) obj.format.yearMark = "-";
                if (!this.isString(obj.format.timeMark)) obj.format.timeMark = ":";
            } else {
                obj['format'] = {
                    yearMark: '-',
                    timeMark: ':'
                }
            }
        } else {
            obj = {
                type: 0,
                timeStamp: new Date().getTime(),
                format: {
                    yearMark: '-',
                    timeMark: ':'
                }
            };
        }
        var time = obj.timeStamp === undefined ? new Date() : new Date(obj.timeStamp),
            yar = time.getFullYear(),
            month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
            date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
            day = time.getDay(),
            hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
            minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
            seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds(),
            weekend = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        if (obj.type === 0) { /* 当前时间 */
            return {
                time: yar + obj.format.yearMark + month + obj.format.yearMark + date + ' ' + hours + obj.format.timeMark + minutes + obj.format.timeMark + seconds, // yyyy/MM/dd HH:mm:ss
                week: weekend[day], // 星期几
                ymd: yar + obj.format.yearMark + month + obj.format.yearMark + date, // yyyy/MM/dd
                hms: hours + obj.format.timeMark + minutes + obj.format.timeMark + seconds, // HH:mm:ss
                timeStamp: time.getTime()
            }
        } else if (obj.type === 1) { /* 当前时间戳 */
            return time.getTime();
        }
    },
    /**
     * 将时间戳转换成"时分秒"或者"天时分秒"
     *
     * @param {Number} [timeStamp] 时间戳
     * @param {Number} [type] 返回格式,0:时分秒(默认),1:天时分秒
     * @return {Boolean|Object} timeStamp参数错误为false|处理过Object
     * */
    getConvertTime: function (timeStamp, type) {
        if (!this.isPositiveInteger(timeStamp)) return false;
        if (!this.isNumber(type) || [0, 1].indexOf(type) === -1) type = 0;
        var date = 24 * 60 * 60 * 1000, /* 天 */
            hours = 60 * 60 * 1000, /* 时 */
            minutes = 60 * 1000, /* 分 */
            seconds = 1000, /* 秒 */
            dates = 0, /* 天 */
            hourss = 0, /* 时 */
            minutess = 0, /* 分 */
            secondss = 0; /* 秒 */
        if (type === 0) { /* 时分秒 */
            hourss = Math.floor(timeStamp / hours);
            minutess = Math.floor((timeStamp - hourss * hours) / minutes);
            secondss = Math.floor((timeStamp - hourss * hours - minutess * minutes) / seconds);
            hourss = hourss < 10 ? '0' + hourss : hourss + '';
            minutess = minutess < 10 ? '0' + minutess : minutess + '';
            secondss = secondss < 10 ? '0' + secondss : secondss + '';
            return {
                format: hourss + ':' + minutess + ':' + secondss,
                list: [hourss, minutess, secondss]
            };
        } else if (type === 1) { /* 天时分秒 */
            dates = Math.floor(timeStamp / date);
            hourss = Math.floor((timeStamp - dates * date) / hours);
            minutess = Math.floor((timeStamp - dates * date - hourss * hours) / minutes);
            secondss = Math.floor((timeStamp - dates * date - hourss * hours - minutess * minutes) / seconds);
            dates = dates < 10 ? '0' + dates : dates + '';
            hourss = hourss < 10 ? '0' + hourss : hourss + '';
            minutess = minutess < 10 ? '0' + minutess : minutess + '';
            secondss = secondss < 10 ? '0' + secondss : secondss + '';
            return {
                format: dates + ':' + hourss + ':' + minutess + ':' + secondss,
                list: [dates, hourss, minutess, secondss]
            };
        }
    },
    /**
     * "返回对象的第一个值和key"或者"指定属性的值"
     *
     * @param {Object} [data] 待查找对象
     * @param {String} [key] 待查找对象的key
     * @return {Object|*} 指定对象的key和value(或者第一个属性)|原对象
     */
    getObjKey: function (data, key) {
        if (!this.isObject(data) || this.isEmptyObject(data)) return data;
        if (key === undefined) {
            for (var name in data) {
                return {
                    key: name,
                    val: data[name]
                };
            }
        } else {
            return data[key + ''];
        }
    },
    /**
     * 微信性别转化映射
     *
     * @param {Number} sex 性别数字
     * 0 ---- 未知
     * 1 ---- 男
     * 2 ---- 女
     * @return String 性别对应的映射
     */
    getSex: function (sex) {
        if (!this.isNumber(sex)) return '男';
        sex = parseInt(sex);
        if ([0, 1, 2].indexOf(sex) === -1) return '男';
        var val = '';
        switch (sex) {
            case 0:
                val = '未知';
                break;
            case 1:
                val = '男';
                break;
            case 2:
                val = '女';
                break;
        }
        return val
    },
    /**
     * 裁减小数点
     * 小数点后为0，裁剪
     *
     * 用于价格裁剪:
     * 如：12.00->12
     * 12.09->12.09
     * '12.00'->12
     * '12.09'->12.09
     *
     * @param {String|Number} [money] 需要裁剪的String|Number
     * @return {*|String} 原对象|裁剪过后的数字
     */
    cutInto: function (money) {
        if (!(this.isString(money) || this.isNumber(money))) return money;
        money = money.toString();
        var data = '',
            dataList = money ? money.split(".") : '';
        if (dataList.length === 2 && parseInt(dataList[1]) === 0) {
            data = dataList[0];
        } else {
            data = money;
        }
        return data;
    },
    /**
     * 价格裁剪,保留2位
     * 如：'12.0000' -> '12.00'
     *
     * @param {String|Number} [money] 需要裁剪的String/Number
     * @param {Boolean} [bool] 是否四舍五入 true: 是(默认),false: 否
     * @return {*|String} 原对象|裁剪过后的数字(原对象返回)
     */
    getTwoMoney: function (money, bool) {
        if (!(this.isString(money) || this.isNumber(money))) return money;
        bool = this.isBoolean(bool) ? bool : true;
        money += '';
        if (money.indexOf('.') !== -1) {
            if (bool) {
                money = Number(money).toFixed(2); // 四舍五入 如：0.98999 -> 0.99
                return money;
            } else {
                var arr = money.split('.');
                arr[1] = arr[1].slice(0, 2); // 直接裁剪两位小数点
                return arr.join('.');
            }
        } else {
            return this.getMoneyFormat(money);
        }
    },
    /**
     * 生成指定范围的随机正整数[min, max]
     * 大于等于0
     *
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @return {Number|Boolean} 随机数/传入参数有问题
     */
    getRandom: function (min, max) {
        if (!(this.isNumber(min) && this.isNumber(max))) return false;
        if (min < 0 || max < 0) return false;
        min = Math.floor(min);
        max = Math.floor(max);
        var temp;
        if (min > max) {
            temp = min;
            min = max;
            max = temp;
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
     * string末尾添加.00
     *
     * @param {String|Number} str 待处理格式
     * @return {*|String} 原对象|处理过后的String 99.00
     */
    getMoneyFormat: function (str) {
        if (!(this.isNumber(str) || this.isString(str))) return str;
        str = str + '';
        if (str.indexOf('.') !== -1) {
            return str;
        } else {
            if (/((^[1-9]\d*)|^0)$/g.test(str)) {
                return str + '.00';
            } else {
                return str;
            }
        }
    },
    /**
     * 排序(默认降序)
     *
     * @param {Array} array 需要排序的数组
     * @param {Object} o 匹配规则
     * @param {String} o.prop 哪个参数(key)进行排序
     * @param {Number} [o.desc] 排序方式 0: 升序(默认), 1: 降序
     * @param {Function} [o.parser] 处理函数
     * @return Array 空数组或者排序过后的数组
     */
    sortBy: function (array, o) {
        // 单独版
        /*var _toString = Object.prototype.toString,
         _parser = function (x) { return x; },
         _getItem = function (x) {
         return this.parser((_toString.call(x) === "[object Object]" && x[this.prop]) || x);
         };
         if (!(array instanceof Array) || !array.length) return [];
         if (_toString.call(o) !== "[object Object]") o = {};
         if (typeof o.parser !== "function") o.parser = _parser;
         o.desc = [1, -1][+!!o.desc];
         return array.sort(function (a, b) {
         a = _getItem.call(o, a);
         b = _getItem.call(o, b);
         return ((a > b) - (b > a)) * o.desc;
         });*/
        // 系统版
        var _toString = Object.prototype.toString,
            _parser = function (x) { return x; },
            _getItem = function (x) {
                // _toString.call(x) === "[object Object]"--解决this内部指向问题
                return this.parser((_toString.call(x) === "[object Object]" && x[this.prop]) || x);
            };
        if (!this.isArray(array)) return [];
        if (!this.isObject(o)) o = {};
        if (!this.isFunction(o.parser)) o.parser = _parser;
        o.desc = [1, -1][+!!o.desc];
        return array.sort(function (a, b) {
            a = _getItem.call(o, a);
            b = _getItem.call(o, b);
            return ((a > b) - (b > a)) * o.desc;
        });
    },
    /**
     * 判断是否是连续中文或者一个中文
     *
     * @param {String} str 待匹配字符
     * @return {Boolean} true: 是中文,false: 不是中文
     */
    isCN: function (str) {
        return /^[\u4e00-\u9fa5]+$/g.test(str);
    },
    /**
     * Object添加上key前缀
     * 比如：{'a': 1, 'b': 2} --('num')--> {'numa': 1, 'numb': 2}
     *
     * @param {Object} obj 转化的Object对象
     * @param {String} [str] key前缀
     * @param {Number} [type] key前缀添加模式 0: Object(默认), 1: Array  0-{'number.pro': 0},1-{'numberpro': 0}
     * @return {String|Object} 空字符串|转化后的Object对象
     */
    addPrefix: function (obj, str, type) {
        if (!this.isObject(obj)) return "";
        if (!this.isString(str)) str = '';
        if (!this.isNumber(type) || [0, 1].indexOf(type) === -1) type = 0;
        var newObj = {};
        for (var i in obj) {
            if (type === 0) { // Object
                newObj[str + '.' + i] = obj[i];
            } else if (type === 1) { // Array
                newObj[str + i] = obj[i];
            }
        }
        return newObj;
    },
    /**
     * 对象或数组json化
     *
     * @param {Object|Array|*} [obj] 需要json化的对象或数组
     * @return {*|String} 原对象|序列化的string
     */
    getObjectJson: function (obj) {
        if (!(this.isArray(obj) || this.isObject(obj))) return obj;
        return JSON.stringify(obj);
    },
    /**
     * 搜索String第一个不为数字的下标
     * 比如: '23423.88' -> return 5
     *
     * @param {String|*} [str] 待搜索的String
     * @param {Number} [type] 类型 0: 返回下标(默认), 1: 返回不为数字的前面String 例子: '234.88' 0->3,1->'234'
     * @return {Number|String|*} 下标(-1: 表示没有)|裁剪的String|原对象
     */
    getStringIndex: function (str, type) {
        if (!this.isString(str)) return str;
        if (!this.isNumber(type) || [0,1].indexOf(type) === -1) type = 0;
        var value = -1, len = str.length;
        for (var i = 0; i < len; ++i) {
            if (!(/^[0-9]*$/g.test(str.charAt(i)))) {
                value = i;
                break;
            }
        }
        if (type === 0) {
            return value;
        } else if (type === 1) {
            if (value === -1) {
                value = len;
            }
            return str.slice(0, value);
        } else {
            return -1;
        }
    },
    /**
     * 将时间字符串处理成对应的格式
     * yyyy-MM-dd HH:mm:ss 0
     * MM-dd HH:mm 1
     * yyyy-MM-dd 2
     * HH:mm:ss 3
     * MM-dd 4
     * HH:mm 5
     *
     * @param {String} str 时间String格式
     * @param {Number} [type] 转化格式 0: 年-月-日 时:分:秒(默认)，1: 月-日 时:分，2: 年-月-日，3: 时:分:秒，4: 月-日，5: 时:分
     * @param {Array} [format] 拆分格式-年月日拆分格式,时分秒拆分格式 默认['-',':']
     * @return {String|*} 处理过后的时间String格式|原值
     */
    getTimeStringHandle: function (str, type, format) {
        if (!(this.isString(str) && str !== '')) return str;
        if (!this.isNumber(type) || [0,1,2,3,4,5].indexOf(type) === -1) type = 0;
        // 防止format值不对
        if (this.isArray(format)) {
            switch (format.length) {
                case 0:
                    format = ['-', ':'];
                    break;
                case 1:
                    format = [format[0], ':'];
                    break;
                default:
                    format = format.slice(0, 2);
            }
            format[0] = String(format[0]);
            format[1] = String(format[1]);
        } else {
            format = ['-', ':'];
        }
        
        var timeArr = str.split(' '), newTime1, newTime2, timeStr = '';
        newTime1 = timeArr[0] !== undefined ? timeArr[0].split(format[0]) : [];
        newTime2 = timeArr[1] !== undefined ? timeArr[1].split(format[1]) : [];
        // 检查每一项是否正确--必须为数字
        for (var i = 0; i < newTime1.length; ++i) {
            if (/^[0-9]*$/g.test(newTime1[i])) {
                newTime1[i] = newTime1[i].length < 2 ? '0' + newTime1[i] : newTime1[i];
            } else {
                newTime1[i] = this.getStringIndex(newTime1[i], 1);
            }
        }
        for (var j = 0; j < newTime2.length; ++j) {
            if (/^[0-9]*$/g.test(newTime2[j])) {
                newTime2[j] = newTime2[j].length < 2 ? '0' + newTime2[j] : newTime2[j];
            } else {
                newTime2[j] = this.getStringIndex(newTime2[j], 1);
            }
        }
        if (type === 0) {
            timeStr += newTime1.join('-');
            timeStr += (' ' + (newTime2.length > 2 ? newTime2.slice(0, 3).join(':') : newTime2.join(':')));
        } else if (type === 1) {
            timeStr += (newTime1.length > 2 ? newTime1.slice(1, 3).join('-') : newTime1.join('-'));
            timeStr += (' ' + (newTime2.length > 2 ? newTime2.slice(0, 2).join(':') : newTime2.join(':')));
        } else if (type === 2) {
            timeStr += newTime1.length > 2 ? newTime1.slice(0, 3).join(':') : newTime1.join(':');
        } else if (type === 3) {
            timeStr += newTime2.length > 2 ? newTime2.slice(0, 3).join(':') : newTime2.join(':');
        } else if (type === 4) {
            timeStr += (newTime1.length > 2 ? newTime1.slice(1, 3).join('-') : newTime1.join('-'));
        } else if (type === 5) {
            timeStr += (newTime2.length > 2 ? newTime2.slice(0, 2).join(':') : newTime2.join(':'));
        }
        return timeStr.trim();
    },
    /**
     * 将null,undefined转成''
     *
     * @param {null|undefined|*} [indi] 基本参数
     * @return {String|*} 空字符串|原对象
     */
    paramTransform: function (indi) {
        if (!(indi === null || indi === undefined)) return indi;
        return '';
    },
    /**
     * ArrayBuffer转16进制字符串
     *
     * @param {ArrayBuffer} buffer 二进制流
     * @return {String} 转换的文本
     */
    ab2hex: function (buffer) {
        var hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function (bit) {
                return ('00' + bit.toString(16)).slice(-2)
            }
        );
        return hexArr.join('');
    },
    /**
     * 动态计算页面根元素字体大小
     * 以"iPhone6"作为参考对象--"50px"做为根大小--2k屏
     * 计算公式 100/iPhone6-width = 实际手机-fontSize/实际手机-width
     * */
    resize: function () {
        var htmlEle = document.documentElement, htmlWidth = window.innerWidth; // 返回窗口的文档显示区的高度
        htmlEle.style.fontSize = 50/375 * htmlWidth + 'px';
    },
    /**
     * 文本提示
     *
     * @param {Object} [param] 参数集合
     * @param {String} [param.msg=''] 提示文本
     * @param {Number} [param.duration=3000] 显示时长毫秒
     * */
    tips: function (param) {
        if (this.type(param) !== 'object') {
            return;
        }
        param.msg = param.msg ? param.msg : '';
        param.duration = this.type(param.duration) === 'number' ? param.duration : 3000;
        var m = document.createElement('div');
        m.style.cssText = "position: fixed;top: 50%;left: 50%;max-width: 70%;transform: translate(-50%, -50%);z-index: 999999;";
        var n = document.createElement('div');
        n.style.cssText = "word-break: break-all;word-wrap: break-word;line-height: 1.3;" +
            "text-align: center;border-radius: 4px;background: rgba(50,50,51,.88);font-size: 14px;color: #fff;" +
            "opacity: 1;box-sizing: border-box;padding: 7px 8px 5px;";
        n.innerHTML = param.msg;
        m.appendChild(n);
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            n.style.webkitTransition = '-webkit-transform: ' + d + 's ease-in; opacity: ' + d + 's ease-in';
            n.style.transition = '-webkit-transform: ' + d + 's ease-in; opacity: ' + d + 's ease-in';
            n.style.opacity = '0';
            setTimeout(function() { document.body.removeChild(m) }, d * 1000);
        }, param.duration);
    },
    getQueryVariable: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
    },
    /**
     * 时间string格式处理--车车通(内部使用)
     * 车车通时间格式：2020-04-26 09:28:14:323
     * 车车通时间格式：2020-04-26T09:28:14:323
     * 车车通时间格式：2020-04-26T09:28:14.323
     * 局限性很大
     * 处理：去掉"T"，"."，毫秒数
     *
     * @param {String} str 待处理格式
     * @return {String} 处理过后的String
     * */
    getFormatHandle: function (str) {
        if (!this.isString(str)) return '';
        str = str.replace('T', ' ').replace('.', ':');
        var startTime = str.split(' ')[0];
        var endTime = str.split(' ')[1];
        var newStr = '';
        if (startTime) {
            newStr += startTime;
        }
        if (endTime) {
            newStr += (' ' + endTime.split(':').slice(0, 3).join(':'));
        }
        return newStr;
    },
};

/**
 * 本项目特有
 *
 * */
var basic = {
    /**
     * 相关参数是否填写
     * */
    relatedParameters: function (judge1, judge2) {
        // 请选择缴费单位(没有选择学校)
        if (localStorage.getItem('schoolIndex') === null && judge1 === 1) {
            window.location.href = './index.html';
            return false;
        }
        // 请选择孩子所在班级(是否选择年级，班级)
        if (localStorage.getItem('gradeIndex') === null && judge2 === 1) { // 年级
            window.location.href = './index.html';
            return false;
        }
        if (localStorage.getItem('classIndex') === null && judge2 === 1) { // 班级
            window.location.href = './index.html';
            return false;
        }
    },
    /**
     * 打开微信浏览器--相关操作
     * */
    weixinHandle: function (bool, url) {
        if (bool) {
            var openid = utils.getQueryVariable('openid') || sessionStorage.getItem('openid');
            if (!openid) {
                var temp = utils.getQueryVariable('s');
                var str = '';
                if (temp !== undefined) {
                    str += ('?s=' + temp);
                }
                url = url ? url : '/BasicData/School/Detailed';
                window.location.href = url + str;
            } else {
                sessionStorage.setItem('openid', openid);
            }
        }
    }
};

/**
 * 线上和本地
 *
 * 本地开发环境: dev
 * 线上正式环境: build
 */
var api = {
    API_IMG_URL: '', // 图片地址
    API_BASE_URL: '', // api前缀
    API_LOCAL: '', // 顶层地址
};
if (utils.ENV === 'dev') { // 本地开发
    api.API_LOCAL = 'http://192.168.10.112:8080/'; // 测试域名
    api.API_BASE_URL = api.API_LOCAL + 'Api.ashx?act=';
} else if (utils.ENV === 'build') { // 线上开发
    api.API_LOCAL = 'http://430.cctlog.com/';
    api.API_BASE_URL = api.API_LOCAL + 'Api.ashx?act=';
}
api['payWayBill'] = api.API_BASE_URL + 'WechatApplet.PayWayBill'; // 获取收款码
api['getPayList'] = api.API_BASE_URL + 'WechatApplet.GetPayList'; // 获取收款列表

