<template>
    <div class="row">
    <div class="col-sm-8">
       <p class="text-success" v-if="message">{{message}}</p> 
       <table class="table table-bordered" v-if="subscribers_list.length > 0">
           <thead>
               <tr>
                   <td>ID</td>
                   <td>NAME</td>
                   <td>EMAIL</td>
                   <td>STATE</td>
                   <td>ACTION</td>
               </tr>
           </thead>
           <tbody>
               <tr v-for="(subscriber,index) in subscribers_list" :key="index">
                   <td>{{index+1}}</td>
                   <td>{{subscriber.name}}</td>
                   <td>{{subscriber.email}}</td>
                   <td>{{subscriber.state}}</td>
                   <td><button class="btn btn-sm btn-danger" @click="remove_subscriber(subscriber.id)">X</button></td>
               </tr>
           </tbody>    
       </table> 
    </div>
    <div class="col-sm-4">
      <AddSubscriber @change_list="re_list_subscribers"/>
    </div>
    </div>
</template>

<script>
import AddSubscriber from '@/components/AddSubscriber.vue'
import http from "../http_common.js";
export default {
    name:'SubscriberComponent',
    components:{AddSubscriber},
    data(){
        return{
            subscribers_list:[],
            message:''
        }
    },
    async mounted(){
        return await http.get('subscribers').then(response => {
            this.subscribers_list = response.data.data
        });
    },
    methods:{
        async re_list_subscribers(){
            return await http.get('subscribers').then(response => {
            this.subscribers_list = response.data.data
        });
        },
        remove_subscriber(id){
            http.delete('subscribers/'+id).then(response => {
            this.subscribers_list = response.data.data    
            this.message = response.data.message
        });
        }
    }
}
</script>