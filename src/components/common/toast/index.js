import Toast from './Toast'
const obj = {}

export default obj.install = function (Vue){
    //1.创建组件构造器
     const tosatConstruct = Vue.extend(Toast);
    //2.new的方法 根据组件构造器，创建一个组件对象
    const toast = new tosatConstruct();
    //3.将组件对象手动挂载在一个元素上面
    toast.$mount(document.createElement('div'))
    //4.toast.$el 对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}