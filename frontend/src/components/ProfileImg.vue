<template>
    <div class='profile-picture' :class="divCustomClass" >
        <img class="profile-picture__img"
             :class="customClass"
             :src="src || userData.imageUrl"
             alt="" />
    </div>
</template>
<script>
export default {
    name: 'ProfileImg',
    props: ['customClass', 'divCustomClass', 'src'],
    data () {
   return {
        userData: JSON.parse(localStorage.getItem('userData'))
      } 
    }
}
</script>
<style lang="scss">
    .profile-picture {
      overflow: hidden;
      border-radius: 100%;
      background: transparent;
      &__img {
        width: 40px;
        height: 40px;
      }
    }
</style>