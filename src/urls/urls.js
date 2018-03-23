

var urls = {} ;

let protocal = window.location.protocol;
let host = window.location.host;

urls.baseApi = protocal + '//' + host.replace('fc','fcapi')

urls.order = '/order/list'
urls.login = '/login'

export default urls