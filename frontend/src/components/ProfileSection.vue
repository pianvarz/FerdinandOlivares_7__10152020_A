<template>
<div id="profileSection">
    <div class="profileButton">
        <button @click="toggleNav" aria-label="Profile Section"> 
            <ProfileImg />
            <h3> 
            Hello {{userData.firstName}} !!
            </h3>
            <!-- <img> Profile picture -->
        </button> 
    </div>
        <div class="collapse" v-show="elementsHidden">
            <p class="content" aria-label="View profile"> 
                <button @click="changeLocation('Profile')"> View my Profile </button>
            </p>
            <p class="content" aria-label="Home button"> 
                <button @click="changeLocation('Home')"> Home </button>
            </p>
            <p class="content" aria-label="Signout"> 
               <button @click.stop="signOut">Signout</button>  
            </p>
          <!-- User Profile -->
        </div>        
    </div>
</template>
<script>
import router from '../router/index'
import ProfileImg from './ProfileImg'

export default {
    name: 'ProfileSection',
    components: {
        ProfileImg
    },
    data () {
        return {
        userData: JSON.parse(localStorage.getItem('userData')),
        elementsHidden: false 
      }
    },
    methods: {
        toggleNav () {
            this.elementsHidden = !this.elementsHidden
        },
        changeLocation (name) {
        if (name === this.$route.name) return location.reload()
        this.$router.push({ name })
        },
        signOut() {
            localStorage.clear();
            router.push({ name: 'Login' })
            location.reload()
        }
    }
}
</script>

<style lang="scss" scoped>
    // .collapse {
    //     .content{
    //         // padding: 0 18px;
    //         // display: none;
    //         // overflow: hidden;
    //         // background-color: #f1f1f1;
    //     }
    // }
</style>