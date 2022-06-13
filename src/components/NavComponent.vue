<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Subscriber Management</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/login" class="nav-link active" aria-current="page">Login</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active cursor" aria-current="page" @click="logout_method">Logout</a>
        </li>
      </ul>
    </div>
  </div>
  </nav>
</template>

<script>
import http from '../http_common'

export default {
  methods:{
    logout_method(){
        http.post('logout').then(response => { 
          localStorage.removeItem('token');
          this.$router.push('/login'); 
        }).catch(error => {
          console.log(error)
        });
    }
  }
}
</script>

<style scoped>
.cursor{
  cursor: pointer;
}
</style>