
<template>
  <section class="signup">
    <h2 class="container">Create Account</h2>
      <p> Please fill in details </p>
      <form class="signupForm">
          <li> First name:
            <input 
              id="firstName"
              type="text"
              v-model="input.firstName"
              placeholder="e.g. David" 
              aria-label="Input first name"
              required="true"
              >
          </li>
          <li> Last name: 
            <input 
            id="lastName"
            type="text"
            v-model="input.lastName"
            aria-label="Input last name"
            placeholder="e.g. Brown" 
            required="true"
            >
          </li>  
          <li> Email:    
            <input 
            id="email"
            type="email"
            v-model="input.email"
            aria-label="Input email"
            placeholder="e.g. david@mail.com"
            required="true"
            >
          </li>
          <li> Password:
            <input 
            id="password"
            type="password"
            v-model="input.password"
            aria-label="Input password"
            placeholder="e.g. DavidBrown23.1" 
            required="true"
            >
          </li>
           <button 
            v-on:click.stop="signup"
            type="submit"
            id="signup-button"
            aria-label="Signup button">Create an accont
            </button>
      </form> 
    <div class="login-container"> 
      Already have an account? <router-link to="/login"> Click here </router-link>
    </div>
  </section>
</template>

<script>
import router from '../router/index'
import { apiClient } from '../services/apiClient'

export default {
  name: 'Signup',
  data() {
    return {
      errorMessage: '',
      input: {
        firstName: '',
        lastName: '',
        email: '', 
        password: '',
        imageUrl: 'default.jpg'
      }
    }
  },
  methods: {
    signup() { //Post signup details to the local API
      if (this.input.firstName != '' &&
          this.input.lastName != '' &&
          this.input.email != '' &&
          this.input.password != '') 
          { // Using logic from the ApiClient file
          apiClient
          .post('api/auth/signup', this.input)
          .then(res => {
            const token = res.token;
            const user = res.user;
            if (token) {
              localStorage.setItem('userToken', token)
              localStorage.setItem('userData', JSON.stringify(user))
              router.push({ name: 'Home' })
            }
          })
      } else  {
        this.errorMessage = 'Unable to create an account, please fill in details'
      }
    }
  }
}
</script>

<style lanf="scss">
  .signup {
    display: flex;
    flex-direction: column;
    width: 20%;
    margin-left: auto;
    margin-right: auto;
  }
</style>