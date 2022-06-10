<template>
    <transition name="message">  
    <p v-if="message" class="text-white bg-success p-2 ">{{message}}</p>
    </transition>
    <transition name="message">  
    <p v-if="error_message" class="text-white bg-danger p-2">{{error_message}}</p>
    </transition>
    <Form @submit="update_subscriber" class="border border-grey p-3" :validation-schema="schema">
        <div class="form-group">
            <label>Name</label>
            <Field type="text" class="form-control" name="fullname" v-model="name"/>
            <ErrorMessage name="fullname" class="text-danger" />
        </div>
        <div class="form-group">
            <label>Email</label>
            <Field type="email" class="form-control" name="email" v-model="email" disabled="disabled"/>
            <ErrorMessage name="email" class="text-danger" />
        </div>
        <div class="form-group">
            <label>State</label>
            <Field class="form-select" name="state" as="select" v-model="state">
                <option value="active" selected="selected">active</option>
                <option value="unsubscribed">unsubscribed</option>
                <option value="junk">junk</option>
                <option value="bounced">bounced</option>
                <option value="unconfirmed">unconfirmed</option>
            </Field>    
            <ErrorMessage name="state" class="text-danger" />
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Update Subscriber</span>
        </button>
    </Form>    
</template>

<script>
import { mapActions } from 'pinia'
import { useSubscriber } from '../stores/subscriber.js'
import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'

export default {
    name:'EditSubscriber',
    components:{Form, Field, ErrorMessage},
    props:['subscriber_id'],
    data(){
        const schema = yup.object({
        fullname: yup.string().required().min(3),
        email: yup.string().required().email(),
        state: yup.string().required(),
        });
        return{
            schema,
            subscriber_id:'',
            name:'',
            email:'',
            state:'',
            message:'',
            error_message:'',
            loading:false,
        }
    },
    created(){
        this.subscriber_id = this.$route.params.id; 
        this.getASubscriber(this.subscriber_id).then(response => {
                this.name = response.data.data.name
                this.email = response.data.data.email
                this.state = response.data.data.state
        });
    },
    methods:{
        ...mapActions(useSubscriber,['getASubscriber','updateSubscriber']),
        update_subscriber()
        {
            this.loading = true;   
            this.updateSubscriber(this.subscriber_id,this.name,this.email,this.state).then(response => {
                this.loading = false;
                this.message = response.data.message
                setTimeout(() => this.$router.push('/'), 2000)
            }).catch(error => {
                this.loading = false;
                this.error_message = response.data.message
            })
        },
        refreshSubscriber()
        {
            this.getAllSubscribers();
        }
    }
}
</script>