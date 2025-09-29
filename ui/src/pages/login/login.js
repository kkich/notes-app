import AuthTabs from "@/components/AuthTabs.vue";

export default {
  name: "LoginPage",
  components: {
    AuthTabs,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        const data = await res.json();
        localStorage.setItem("token", data.token); 
        this.$router.push("/notes");
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
