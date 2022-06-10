<template>
  <div class="container my-3">
    <div class="row">
    <div class="col-sm-8">
      <SubscriberComponent />
    </div>
    <div class="col-sm-4">
      <AddSubscriber />
    </div>
    </div>  
  </div>
</template>

<script>
import SubscriberComponent from '@/components/SubscriberComponent.vue'
import AddSubscriber from '@/components/AddSubscriber.vue'

export default {
    components:{SubscriberComponent,AddSubscriber},  
}
</script>
