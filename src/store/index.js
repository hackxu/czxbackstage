import { observable, action, autorun } from 'mobx';

class AppData {
    @observable isLogin = false
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
        localStorage.setItem("isLogin", "true")
        console.log(this.isLogin)
    }
    @action loginout() {
        this.isLogin = false;
        localStorage.removeItem("isLogin")
    }
    @action setToken(t) {
        this.token = t
    }
}
const store = new AppData()
autorun(() => {
    // console.log("autorun")
    if (localStorage.getItem("isLogin") === "true") {
        store.isLogin = true
    };
    if (localStorage.getItem("token")) {
        store.token = localStorage.getItem("token")
    }
})

// console.log(store)
export default store