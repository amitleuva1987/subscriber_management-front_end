<template>
    <Form @submit="login_method" class="col-md-5 border border-primary mt-5 p-3" :validation-schema="schema">
        <div class="form-group ">
            <label>Email / Username</label>
            <Field type="email" name="email" class="form-control" v-model="email"/>
            <ErrorMessage name="email" class="text-danger" />
        </div>
        <div class="form-group">
            <label>Password</label>
            <Field type="password" name="password" class="form-control" v-model="password" />
            <ErrorMessage name="password" class="text-danger" />
        </div>
        <button class="btn btn-primary w-100 mt-3" method="submit">Login</button>
    </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import http from '../http_common'
export default {
    name:'LoginComponent',
    components:{Form, Field, ErrorMessage },
    data(){
        const schema = yup.object({
            'email' : yup.string().required().email(),
            'password': yup.string().required().min(8),
        })
        return{
            schema,
            email:'',
            password:''
        }
    },
    methods:{
        login_method()
        {
            http.post('login',{email:this.email,password:this.password}).then(response => {
                localStorage.setItem('token',response.data.token);
                this.$router.push('/');
            })
        }
    }
}
</script>