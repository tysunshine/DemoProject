

/**
 *cookie
 */
export const cookie = {
    /*
    作用：通过传key值，返回需要的当前key的value值，即封装cookie的查
    参数：name->cookie中的key值
    返回：有则返回value，无则返回""空
    调用方法 console.log(getCookie("phone"));
    */
    get (name) {
        name += '_' + location.port;
        var cookieTxt = document.cookie;
        var arr = cookieTxt.split("; ");
        for(var i=0; i<arr.length; i++) {
            var arr1 = arr[i].split("=");
            if(decodeURIComponent(arr1[0]) == name) {
                return decodeURIComponent(arr1[1]);
            }
        }
        return "";
    },
    /*
    作用：封装cookie的增和改
    参数：name->当前这条cookie的名称，value->当前cookie的值，day->当前cookie存在的天数为0或为空则为有效时间是当前会话，path->为当前cookie的有效路径不设则为根路径/
    */
    set (name,value,day,path) {
        name += '_' + location.port;
        var result = "";
        result += encodeURIComponent(name)+"="+encodeURIComponent(value);
        if(day) {
            var date = new Date();
            date.setDate(date.getDate()+day);
            result += "; expires="+date;
        }
        if(path) {
            result += "; path="+path;
        } else {
            result += "; path=/";
        }
        document.cookie = result;
    },
    /*
    作用：封装cookie的删
    参数：name->需要删除的cookie的名称
    */
    remove (name) {
        name += '_' + location.port;
        this.set(name,"",-1);
    }
}

export const storage = {
    /**
     * 存储sessionStorage
     */
    set (name, data) {
        if (!name) return;
        name += '_' + location.port;
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        window.sessionStorage.setItem(name, data);
    },
    /**
     * 获取sessionStorage
     */
    get (name) {
        if (!name) return;
        name += '_' + location.port;
        var value = window.sessionStorage.getItem(name);
        if (value !== null) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                value = value;
            }
        }
        return value;
    },
    /**
     * 删除sessionStorage
     * name 为空时  清除所有数据
     */
    remove (name) {
        if (!name) {
            window.sessionStorage.clear();
        }else {
            name += '_' + location.port;
            window.sessionStorage.removeItem(name);
        }
    },
}

/**
 *格式化时间
 *@param {String} time [可以new Date()的时间]
 *@param {String} format [时间格式化类型
        yyyy            年
        M               月       不用补0
        MM              月       需要补0
        W               周       不用补0
        WW              周       需要补0
        d               日       不用补0
        dd              日       需要补0
        H               24小时    不用补0
        HH              24小时    需要补0
        h               12小时    不用补0
        hh              12小时    需要补0
        m               分       不用补0
        mm              分       需要补0
        s               秒       不用补0
        ss              秒       需要补0
        timestamp       时间戳   
        
        例子：yyyy年MM月dd日 HH:mm:ss
    ]
 */
export function switchTime (time, format) {
    format = format ? format : 'yyyy年MM月dd日 HH:mm:ss';

    var res = format;

    var date = new Date(time);
    var timestamp = date.getTime(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        week = date.getDay(); // 0是星期日

    // 判断传入是否可以转换为时间
    if (!year) {
        return time;
    }

    // 替换时间戳
    res = res.replace(/timestamp/g, timestamp);

    // 替换年
    res = res.replace(/yyyy/g, year);

    // 替换月
    res = res.replace(/MM/g, makeUpNum(month));
    res = res.replace(/M/g, month);

    // 替换日
    res = res.replace(/dd/g, makeUpNum(day));
    res = res.replace(/d/g, day);

    // 替换时
    res = res.replace(/HH/g, makeUpNum(hours));
    res = res.replace(/H/g, hours);

    // 替换分
    res = res.replace(/mm/g, makeUpNum(minutes));
    res = res.replace(/m/g, minutes);

    // 替换秒
    res = res.replace(/ss/g, makeUpNum(seconds));
    res = res.replace(/s/g, seconds);

    // 替换周
    res = res.replace(/WW/g, makeUpNum(week));
    res = res.replace(/W/g, week);

    return res;
}

/**
 *数字补0
 @param {Number} val [需要补0的数]
 */
export function makeUpNum (val) {
    return val < 10 ? '0' + parseInt(val) : val;
}

/**
 *拷贝
 */
export function copy (data) {
    return JSON.parse(JSON.stringify(data));
}

/**
 *判断是否为空
 *@return {Boolean} [true为空，false不为空]
 */
export function isEmpty (val) {
  if (typeof val == 'string') {
    val = val.trim();
  }
  return !val && val!==0 && typeof val!=="boolean"?true:false;
}

// 保留小数位数
/**
 *保留几位小数
 *@param {Number} val [传入的值]
 *@param {Number} num [保留小数的位数]
 *@return {Number} [保留小数位数后的数字]
 */
export function toFixed(val, num) {
  var res = Number(val);
  if (!res) {
    return res;
  }
  res = res.toFixed(num);
  var arr = ('' + res).split('.');
  if (arr[1].length > num) {
    arr[1] = arr[1].slice(0, num);
    res = arr.join('.');
  }
  return res;
}

export default {
    cookie,
    storage,
    switchTime,
    makeUpNum,
    copy,
    isEmpty,
};

