<template>
  <div>
    <div class="auth--container">
      <div class="options">
        <div class="auth--selection">
          <span><router-link to="/login">Login</router-link></span>
          <span><router-link to="/register">Register</router-link></span>
        </div>
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {};
</script>