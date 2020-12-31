import router from '@/router/index.js';



// 退出登录
export function logout () {
	storage.remove();
	router.push('/login');
}

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
 *权限对象
 */
export const menu = {
    // 给权限菜单添加下标
    setIndex (menus) {
        recursion(menus, []);
        return menus;

        function recursion (arr, idxs) {
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                item.idxs = idxs.concat(i);
                if (item.children && item.children.length) {
                    recursion(item.children, item.idxs);
                }
            }
        }
    },
    // 根据path获取当前的menu
    current (path) {
        path = path.split('?')[0];

        var menus = storage.get('menus');
        var current = null; // 根据path获取的当前菜单menu项
        recursion(menus); // 执行遍历，获取current
        return current;

        function recursion (arr) {
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.path == path) {
                    current = JSON.parse(JSON.stringify(item));
                }
                if (current) {
                    break;
                }
                if (item.children && item.children.length) {
                    recursion(item.children);
                }
            }
        }
    },
    // 根据idxs下标数组获取列表
    list (idxs) {
        var menus = storage.get('menus');
        var res = menus;
        if (idxs) {
            for (var i = 0; i < idxs.length; i++) {
                res = res[idxs[i]].children;
            }
        }
        return res;
    },
    // 根据路径和等级获取根对象 lv-1对应首页、综合指标、专题分析，最小为1
    root (path, lv) {
        var menus = storage.get('menus');
        var current = this.current(path); // 根据path获取的当前菜单menu项
        var res = menus; // 将要返回的对象
        var idxs = current.idxs.splice(0, lv || 1); // 需要对象的下标数组

        // 根据下标数组获得对象
        for (var i = 0; i < idxs.length; i++) {
            res = i == 0 ? res[idxs[i]] : res.children[idxs[i]];
        }
        return res;
    },
}

/**
 *排除/empty路由，当是empty时使用empty即将跳转的路由路径
 */
export function excludeEmpty (path) {
    return path == '/empty' ? storage.get('emptyPath').path : path;
}

export default {
	logout,
	cookie,
	storage,
    menu,
    excludeEmpty,
};

