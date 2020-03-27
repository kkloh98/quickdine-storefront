<script>
import Axios from "axios";

export default {
  data: () => ({
    axios: null,
    token: null,
    base_url: "https://quickdineapi.herokuapp.com"
    // base_url: "http://localhost:8000"
  }),

  methods: {
    apiGet(url = "/", params = {}, headers = {}) {
      headers["Authorization"] = `Bearer ${this.token}`;

      return new Promise((resolve, reject) => {
        url = this.processUrl(url);

        this.axios
          .get(url, { params, headers })
          .then(res => resolve(res.data))
          .catch(reject);
      });
    },

    apiPost(url = "/", body = {}, headers = {}) {
      headers["Authorization"] = `Bearer ${this.token}`;

      return new Promise((resolve, reject) => {
        url = this.processUrl(url);

        this.axios
          .post(url, body, { headers })
          .then(res => resolve(res.data))
          .catch(reject);
      });
    },

    apiPut(url = "/", body = {}, headers = {}) {
      headers["Authorization"] = `Bearer ${this.token}`;

      return new Promise((resolve, reject) => {
        url = this.processUrl(url);

        this.axios
          .put(url, body, { headers })
          .then(res => resolve(res.data))
          .catch(reject);
      });
    },

    apiDelete(url = "/", params = {}, headers = {}) {
      headers["Authorization"] = `Bearer ${this.token}`;

      return new Promise((resolve, reject) => {
        url = this.processUrl(url);

        this.axios
          .delete(url, { params, headers })
          .then(res => resolve(res.data))
          .catch(reject);
      });
    },

    processUrl(url) {
      if (url.includes("@store")) {
        url =
          "/storefront" +
          url.replace("@store", `/stores/${this.$route.params.store_id}`);
      }
      return url;
    }
  },

  created() {
    this.axios = Axios.create({
      baseURL: this.base_url,
      timeout: 100000
    });
  }
};
</script>
