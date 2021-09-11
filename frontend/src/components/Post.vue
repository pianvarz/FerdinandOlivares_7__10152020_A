<template>
  <div id='post'>
    <b-card>
      <div>
        <router-link :to="{ name: 'UserProfile', params: {userId: post.User.id }}">
          <ProfileImg :src="post.User.imageUrl" customClass="post-profile-picture" divCustomClass="div-post-picture" />
        </router-link>
      </div>
        <div>
          <router-link :to="{ name: 'UserProfile', params: { userId: post.User.id }}">
            <p>
              {{post.User.firstName}} {{ post.User.lastName }}
            </p>
          </router-link>
            <p class="text-secondary"> 
              {{ moment(post.createdAt)
                    .locale('en-gb')
                    .format('l') }}
            </p>
        </div>
        <!-- <EditPost :post="post" /> -->
        <b-card-text class="" v-if="post.content">
            {{ post.content }}
        </b-card-text>
      <div class="" v-if="post.imageUrl">
          <img v-b-modal="`modal-photo-${post.id}`" class="post__image" :src="post.imageUrl" alt="" />
          <b-modal :id="`modal-photo-${post.id}`" size="xl" class="modal-photo" header-class="header-style" >
            <div slot="modal-title"></div>
              <div class="">
                <img class="modal-phot__img" :src="post.imageUrl" alt="" />
              </div>
            <div slot="modal-footer"></div>
          </b-modal>
      </div>
    <!--<LikesList :post="post" :likesCount="likeCount"> -->
        <div class="line"></div>
        <div class="">
            <!--    Like Button     -->
          <button  @click="reactPost()" class="react-btn btn-block" aria-label="Button for like or dislike">
              <!-- An icon that activates like(react) -->
          </button>
            <!--        CommentS Section Button    --> 
          <button  class="" @click="initiateComment(post)" aria-label="Comment to a post"> 
              <!--      Input section can be found in Comment.vue  -->
          </button>
      </div>
      <!-- <Comments :post="post" /> -->
    </b-card>
  </div>
</template>
<script>
// import { apiClient } from '../services/apiClient'
import ProfileImg from './ProfileImg.vue'
// import EditPost from './EditPost'
// import LikesList from './LikesList'


export default {
    name: 'Post',
    components: {
        ProfileImg,
        // EditPost,
        // LikesList
        // Comments,
    },
    props: ['post'],
    // async mounted () {
    //     const res = await apiClient.get(`api/posts/${this.post.id}/like`)
    //     this.likesInPost = res.like
    // },
    data () {
        return {
            likePost: false,
            // likesCount: this.post.likeCount
        }
    },
    methods: {
        // async reactPost() {
        //     const res = await apiClient.post(`api/posts/${this.post.id}/likes`)

        //     if (res.like !== this.likesInPost) {
        //         this.likesCount += res.like ? 1 : -1
        //     }

        //     this.likePost = res.like
        // },

        // initiateComment() {
        //     document.getElementById(`comment-area-${this.post.id}`).focus()
        // }
    }
}
</script>