import AuthTabs from "@/components/AuthTabs.vue";

export default {
  name: "RegistrationPage",
  components: {
    AuthTabs,
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    };
    
  },
  methods: {
    async registerUser() {
      try {
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!res.ok) {
            throw new Error("Registration failed");
        }
        alert("Registration successful");
        this.$router.push("/login"); 
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
