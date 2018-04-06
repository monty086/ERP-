let urls = {};

let protocol = window.location.protocol;
let host = window.location.host

urls.baseAPI = protocol+'//'+host.replace('location','www.yuanmeng.com')


urls.order_list = '/order/list'
urls.login = '/login'


export default urls