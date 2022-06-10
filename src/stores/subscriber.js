import { defineStore } from 'pinia'
import http from '../http_common'

export const useSubscriber = defineStore({
    id:'subscriber',
    state:() => ({
        subscribers_list:[],
    }),
    
    actions:{
        async getAllSubscribers()
        {
            await http.get('subscribers').then(response => {
                this.subscribers_list = response.data.data
            });
        },

        async removeSubscriber(id)
        {
            return await http.delete('subscribers/'+id).then(response => {
              this.subscribers_list = response.data.data      
              return Promise.resolve(response);  
            });
        },

        async addSubscriber(name,email,state){
            return await http.post('subscribers',{name:name,email:email,state:state}).then(response => {
                return Promise.resolve(response);
            }).catch(error => {
                return Promise.reject(error);
            });
        }
    }
})