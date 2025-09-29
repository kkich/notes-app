<template>
  <div class="auth-tabs">
    <button
      class="auth-tab"
      :class="{ 'auth-tab--active': active === 'login' }"
      v-on:click="$router.push('/login')"
    >
      Login
    </button>
    <button
      class="auth-tab"
      :class="{ 'auth-tab--active': active === 'registration' }"
      v-on:click="$router.push('/registration')"
    >
      Registration
    </button>
  </div>
</template>

<script>
export default {
  name: "AuthTabs",
  props: {
    active: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.auth-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.auth-tab {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-weight: bold;
  cursor: pointer;
  color: #6b7280;
}
.auth-tab--active {
  color: #199c7e;
  border-bottom: 2px solid #199c7e;
}
</style>
