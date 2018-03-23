import axios from 'axios'
import Jsonp from 'jsonp'
// import {hashHistory} from 'react-router'
// import {hashHistory} from 'react-router'
import urls from '../urls/urls'
import Utils from '../utils/Utils'


export default class BaseService {
    static jsonp (option){
        return new Promise((resolve,reject)=>{
            Jsonp(option.url,{
                timeout:5000,
                param:'callback'
            },(err,response)=>{
                if(response.status =='success'){
                    resolve(response)
                }else {
                    reject(reject.message)
                }
            })
        })
    }

    static ajax(option){
        
        if(option.isMock){
            option.baseURL = 'https://www.easy-mock.com/mock/5ab497e674cb3a490381870f/backend'
        }else {
            option.baseURL = urls.baseURL
        }

        return new Promise((resolve,reject)=>{
            axios({
                url:option.url,
                method:option.type||'post',
                baseURL:option.baseURL,
                timeout:8000,
                data:JSON.stringify(option.data||''),
                // headers:{
                //     'Server-Token':Utils.getCookie('Server-Token'),
                //     'cityId':Utils.getCity()
                // },
                withCredentials:true
            }).then((response)=>{
                let data = response.data
                if(response == '10008'){
                    hashHistory.push('/')
                }
                if(data.code =='0'){
                    resolve(data)
                }else {
                    reject(data.error)
                }
            })
        }).catch((error)=>{
            console.error('Request Error' , 'Request url:'+(error&& error.message))
        })
    }
}