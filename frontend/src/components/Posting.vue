<template>
<div id="posting">
        <b-form-group class="w-25">
          <div class="w-25">
              <b-form-textarea  :value="value"
                                @input="updateValue"
                                form="postForm"
                                id="content"
                                :placeholder="`Got something on your mind? ${userData.firstName}`"
                                aria-label="Input Post">
              </b-form-textarea>
          </div>    
            <div id="preview">
                <img v-if="url" :src="url" alt="" />
            </div>
        </b-form-group>
        <b-form-group>
          <div>
           <button @click="engageUpload"
                    type="button"
                    >Upload</button>
            <button v-if="isCreating"
                    :class="`${emptyField ? 'disabled' : ''}`"
                    :disabled="emptyField"
                    type="submit"
                    aria-label="Send a post"
                    >Post</button> 
            <input
                class="inputPosting"
                ref="inputFile"
                type="file"
                @change="onFileSelected" />
          </div>
        </b-form-group>
    </div> 
</template>

<script>
// import { apiClient }  from '../services/apiService'
export default {
    name: "Posting",
    props: ['value', 'imgUrl', 'formSubmit', 'isCreating', 'postForm'],
    data() {
        return {
            userData: JSON.parse(localStorage.getItem('userData')),
            url: this.imgUrl,
        }
    },
    watch: {
        formSubmit () {
            this.url = null
        }   
    },
    methods: {
        onFileSelected (event) {
            this.url = URL.createObjectURL(event.target.files[0])
            this.$emit('onFileSelected', event.target.files[0])
        },

        updateValue (value) {
            this.$emit('input', value)
        },

        engageUpload() {
            this.$refs.inputFile.click()
        },
    },
    computed: {
        emptyField () {
        return !this.value.trim().length && !this.url
        }
    }
}
</script>

<style lang="scss">
#preview img {
  max-width: 100%;
  max-height: 500px;
}
.inputPosting{
    display: none;
}
</style>