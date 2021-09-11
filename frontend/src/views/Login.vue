<template>
    <section id="login">
        <h1> Login to Account </h1>
        <form class="login-form">
            <div class="login-div">
                <input type="email" name="email" placeholder="Email" v-model="input.email" class="loginInput" aria-label="Email Input">  
            </div>
            <div class="login-div">
                <input type="password" name="password" placeholder="Password" v-model="input.password" class="loginInput" aria-label="Password Input">
            </div>
            <div class="login-div">
                <button @click.stop="login" type="submit" id="login-button" aria-label="Login Button">Connect</button>
            </div>
        </form>
        <div class="sigupTab">
            <p>Have no account registered?
                <router-link to="/signup" class="Signup">click here to register</router-link>
            </p>
        </div>
    </section>
</template>

<script>
import { apiClient } from '../services/apiClient'
// import SignUp from '../components/SignUp'
import router from '../router/index'

export default {
    name: 'Login',
    // component: SignUp,
    data () {
        return {
            errorMsg: '',
            input: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            if (this.input.email != '' && this.input.password != '') {
                apiClient
                .post('api/auth/login', this.input)
                .then(res => {
                    const token = res.token;
                    const user = res.user;
                    if (!token) {
                        this.errorMsg = 'No user account found, please sign up'
                    } else {
                        localStorage.setItem('userToken', token)
                        localStorage.setItem('userData', JSON.stringify(user))
                        router.push({ name: 'Home' })
                    }
                })
                .catch((error) => console.log(error))
            } else {
                this.errorMessage = 'Please enter email and password to continue'
            }
        }
    }
}
</script>