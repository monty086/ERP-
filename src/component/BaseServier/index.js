import React from 'react';
import axios from 'axios'
import urls from '../../contants/urls'
export default class BaseServier {
    static ajax (option){
        let mockApi = 'https://www.easy-mock.com/mock/5ab497e674cb3a490381870f/api'
        if(option.isMock){
            option.baseURL = mockApi
        }else {
            option.baseURL = urls.baseAPI
        }
        return new Promise ((resolve,reject)=>{
            axios({
                url:option.url,
                method:option.type||'post',
                baseURL: option.baseURL,
                timeout:8000,
                data:JSON.stringify(option.data||''),
                withCredentials:true
            }).then((response)=>{
                if(response.status== '200'){
                    let  result = response.data;
                    if(result&&result.error&&result.error.code!=0){
                        alert(result.error.message)
                    }
                    resolve(response.data)
                }else {
                    reject(response.data)
                }
            },(response)=>{
                alert('网络请求失败')
            }).catch((error)=>{
                console.error(`request URI:${error}`)
            })
        })
    }
}