<template>
  <!-- класс div-ки должен совподать названию файла (поменяй на auth_tab) -->
  <div class="auth-tabs">
    <!-- здесь ты продублировала button лучшее пропиши айдишку и функцию в js, и потом сделай ту же логику через for -->
    <button class="auth-tab"
      :class="{ 'auth-tab--active': active == 'login' }"
      v-on:click="$router.push('/login')">
      Login
    </button>
    <button class="auth-tab"
      :class="{ 'auth-tab--active': active == 'registration' }"
      v-on:click="$router.push('/registration')">
      Registration
    </button>
  </div>
</template>

<!-- Сделать отдельный файл для скрипта и стилей -->
<script>
export default {
  name: 'AuthTabs',
  props: {
    // обобщенная название давай более конкретные имена например active_tab
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
  padding: .5rem 1rem;
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
