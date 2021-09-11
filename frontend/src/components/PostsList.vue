<template>
    <div class="post-list">
        <h4>
            What's going on....
        </h4>
        <b-row>
            <b-col class="" v-for="post in posts.listPosts" :key="post.id">
                <Post :post="post" />
            </b-col>
        </b-row>

        <p class="">{{ posts.errorMessage }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Post from './Post'

export default {
    name: 'PostsList',
    components: {
        Post
    },
    props: ['userId'],

    async mount() {
        await this.initializePostStore(this.queryParams)
    },

    posted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    remove () {
        window.removeEventListener('scroll', this.handleScroll)
    },

    methods: {
        ...mapActions(['initializePostStore', 'seeMore' ]),

        handleScroll () {
            const totalHeight = document.documentElement.scrollHeight
            const scrollHeight = window.scrollY + window.innerHeight
            const remainingOffset = totalHeight - scrollHeight
            if (remainingOffset < 300 ) {
                this.seeMore(this.queryParams)
            }
        }
    },

    computed: {
        ...mapState(['posts']),
        queryParams () {
            if (this.userId) {
                return { userId: this.userId}
            } else {
                return {}
            }
        }
    }
}
</script>