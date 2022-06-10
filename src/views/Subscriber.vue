<template>
    <div class="container my-3">
        <div class="row justify-content-md-center">
        <div class="col-sm-5">    
        <EditSubscriber :subscriber_id="$route.params.id"/>
        </div>
        </div>
    </div>    
</template>

<script>
import EditSubscriber from '@/components/EditSubscriber.vue'

export default {
    name:'SubscriberView',
    components:{EditSubscriber},
}
</script>