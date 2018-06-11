import {observable, action, autorun, computed} from 'mobx';

class AppData {
    @observable isLogin = false
    @observable customLoginout = false;
    @observable token = "";
    // @observable todos = {};
    // @computed get unfinishedTodoCount() {
    //     return this.todos.filter(todo => !todo.finished).length
    // }
    // @action changeTodos(t) {
    //     this.todos = t
    // }

    @action login() {
        this.isLogin = true;
        this.customLoginout = false
    }

    @computed get checkLoginOut() {

        return this.customLoginout && !localStorage.getItem('isLogin')
    }

    @action loginout() {
        this.isLogin = false;
        this.customLoginout = true;
    }

    @action setToken(t) {
        this.token = t
    }
}

const store = new AppData()

autorun((e) => {
    console.log('登入情况', store.isLogin)
    if (store.isLogin) {
        console.log("绝对登入")
        localStorage.setItem("isLogin", "true")
        store.token = localStorage.getItem("token")
        return
    } else {
        if (store.customLoginout) {
            console.log("手动登出")
            localStorage.removeItem("isLogin")
            localStorage.removeItem("token")
            store.token = ""
            return false
        }
        if (localStorage.getItem('isLogin')) {
            console.log("刷新导致的登入为false")
            store.isLogin = true
            localStorage.setItem("isLogin", "true")
            store.token = localStorage.getItem("token")
            return

        } else {
            console.log("本来就是登出状态")
        }
    }
})

// console.log(store)
// console.log(store)
export default store