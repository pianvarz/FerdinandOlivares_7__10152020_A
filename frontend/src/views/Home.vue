<template>
  <section id="home">
      <div>
       <Nav />
      </div>
      <CreatePosts />
      <PostsList />
  </section>
</template>

<script>
import Nav from '../components/Nav'
import PostsList from '../components/PostsList'
import CreatePosts from '../components/CreatePosts'

export default {
  name: 'Home',
  components: {
    Nav,
    CreatePosts,
    PostsList
  },
  data() {
    return {
     userData: JSON.parse(localStorage.getItem('userData')),
    }
  }
}
</script>
