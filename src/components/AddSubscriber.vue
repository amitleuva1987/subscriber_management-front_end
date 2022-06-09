<template>
    <p v-if="message" class="text-success text-center">{{message}}</p>
    <p v-if="error_message" class="text-danger text-center">{{error_message}}</p>
    <Form @submit="add_subscriber" class="border border-grey p-3" :validation-schema="schema">
        <div class="form-group">
            <label>Name</label>
            <Field type="text" class="form-control" name="fullname" v-model="name"/>
            <ErrorMessage name="fullname" class="text-danger" />
        </div>
        <div class="form-group">
            <label>Email</label>
            <Field type="email" class="form-control" name="email" v-model="email"/>
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
            <span>Add Subscriber</span>
        </button>
    </Form>    
</template>

<script>
import http from "../http_common.js";
import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'

export default {
    name:'AddSubscriber',
    components:{Form, Field, ErrorMessage},
    data(){
        const schema = yup.object({
        fullname: yup.string().required().min(3),
        email: yup.string().required().email(),
        state: yup.string().required(),
        });
        return{
            schema,
            name:'',
            email:'',
            state:'',
            message:'',
            error_message:'',
            loading:false,
        }
    },
    methods:{
        async add_subscriber(){
            this.loading = true;
            await http.post('subscribers',{name:this.name,email:this.email,state:this.state}).then(response => {
                this.loading = false;
                this.message = response.data.message
                this.$emit('change_list')
            }).catch(error => { 
                this.loading = false;
                this.error_message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            });
        }
    }
}
</script>

<style scoped>
.border-grey{
    border-color: #e8e8e8;
}
</style>