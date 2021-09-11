<template>
    <div id="createPosts"> 
        <b-form
                @submit="onSubmit">
            <Posting v-model="content"
                     @onFileSelected="onFileSelected"
                     :formSubmit="submitForm"
                     :isCreating="true" />   
        </b-form> 
    </div> 
</template>

<script>
import { mapActions } from 'vuex'
import Posting from './Posting'

export default {
    name: 'CreatePosts',
    components: {
        Posting
    },

    props: {},
    data() {
        return {
            content: '',
            fileSelected: null,
            submitForm: false
        }
    },
    methods: {
        ...mapActions([ 'generatePost' ,'postNotification']),

        onFileSelected(file) {
            this.selectedFile = file
        },
        
        async onSubmit (event) {
            await this.generatePost({
                selectedFile: this.selectedFile,
                content: this.content
            })
            this.postNotification('Post created!!')
            this.resetForm (event)
        },

        resetForm (event) {
            event.target.reset()
            this.content = ''
            this.selectedFile = null
            this.submitForm = !this.submitForm
        }
    }
  
}
</script>
<style lang="scss">
    #textInput {
        display: flex;
        flex-direction: column;;
    }
    #preview img {
  max-width: 100%;
  max-height: 500px;
}
.inputPosting{
    display: none;
}
</style>