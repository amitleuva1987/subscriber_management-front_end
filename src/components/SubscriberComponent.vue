<template>
       <transition name="message">  
       <p class="text-white bg-success p-2" v-if="message">{{message}}</p> 
       </transition>
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
                   <td><button class="btn btn-sm btn-danger" @click="remove_subscriber(subscriber.id)"><font-awesome-icon icon="trash" /></button> <button class="btn btn-sm btn-info"><font-awesome-icon icon="edit" /></button></td>
               </tr>
           </tbody>    
       </table> 
       <h2 v-else class="text-center">No Subscriber Found</h2>
</template>

<script>
import { mapState,mapActions } from 'pinia'
import { useSubscriber } from '../stores/subscriber.js'
import AddSubscriber from '@/components/AddSubscriber.vue'

export default {
    name:'SubscriberComponent',
    components:{AddSubscriber},
    data(){
        return{
            message:''
        }
    },
    mounted(){
         this.getAllSubscribers();
    },
    computed:{
        ...mapState(useSubscriber,['subscribers_list']),
    },
    methods:{
        ...mapActions(useSubscriber,['getAllSubscribers','removeSubscriber']),
        remove_subscriber(id){
            this.removeSubscriber(id).then(response => {
                console.log(response);
                this.message = response.data.message
                setTimeout(() => this.message = '', 3000)
            });
        }
    }
}
</script>

<style>
.message-leave-to{
    opacity: 0;
    transform: translatex(0);
    transition: all 1.5s ease-out;
}
</style>