import React from 'react'

let Utils = {
    toZero :(data)=>{
        if(data<10){
            data = '0'+data
        }
        return data.toString()
    },
    formatTime:(timestamp)=>{
          if(!timestamp){
              return 
          }
          let data = new Date(+timestamp)
          return [
            data.getFullYear(),
            Utils.toZero(data.getMonth()+1),
            Utils.toZero(data.getDate())
          ].join('-')+' '+[
              Utils.toZero(data.getHours()),
              Utils.toZero(data.getMinutes()),
              Utils.toZero(data.getSeconds())
          ].join(':')
    }
}

export default Utils