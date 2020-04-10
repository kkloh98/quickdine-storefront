<script>
import Axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data: () => ({
    axios: null,
    token: null,
    base_url: 'https://quickdineapi.herokuapp.com',
    // base_url: "http://localhost:8000"
  }),

  methods: {
    apiGet(url = '/', params = {}, headers = {}) {
      url = this.init(url)

      headers['Authorization'] = `Bearer ${this.token}`

      return new Promise((resolve) => {
        this.axios
          .get(url, { params, headers })
          .then((res) => resolve(res.data))
          .catch((e) => e.response.status == 404 && this.$router.push('/not-found'))
      })
    },

    apiPost(url = '/', body = {}, headers = {}) {
      url = this.init(url)

      headers['Authorization'] = `Bearer ${this.token}`

      return new Promise((resolve) => {
        this.axios
          .post(url, body, { headers })
          .then((res) => resolve(res.data))
          .catch((e) => e.response.status == 404 && this.$router.push('/not-found'))
      })
    },

    apiPut(url = '/', body = {}, headers = {}) {
      url = this.init(url)

      headers['Authorization'] = `Bearer ${this.token}`

      return new Promise((resolve) => {
        this.axios
          .put(url, body, { headers })
          .then((res) => resolve(res.data))
          .catch((e) => e.response.status == 404 && this.$router.push('/not-found'))
      })
    },

    apiDelete(url = '/', params = {}, headers = {}) {
      url = this.init(url)

      headers['Authorization'] = `Bearer ${this.token}`

      return new Promise((resolve) => {
        this.axios
          .delete(url, { params, headers })
          .then((res) => resolve(res.data))
          .catch((e) => e.response.status == 404 && this.$router.push('/not-found'))
      })
    },

    init(url) {
      var token = Cookies.get('token')

      this.token = token == undefined ? null : JSON.parse(token).value

      if (url.includes('@store')) {
        url = '/storefront' + url.replace('@store', `/stores/${this.$route.params.store_id}`)
      }
      return url
    },
  },

  created() {
    this.axios = Axios.create({
      baseURL: this.base_url,
      timeout: 100000,
    })
  },
}
</script>
