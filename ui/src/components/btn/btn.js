import template from "./btn.html?vue";
import "./btn.css";

export default {
  name: "btn",
  template,
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
};
