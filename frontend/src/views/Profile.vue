<template>
    <div class="profile">
        <b-row>
            <b-col>
                <b-card>
                    <b-form @submit="changeDetails">
                        <ProfileImg 
                        @click="engageUpload"
                        :src="url || user.Data.imageUrl"
                        customClass="profile-main-picture"
                        divCustomClass="div-main-picture" />
                      <b-form-group>
                            <button @click="engageUpload"
                                    type="button">
                                Change Profile Picture
                            </button>
                           <div>
                             <b-col>
                               <input ref="fileUpload"
                                      class="d-none"
                                      type="file"
                                      @change="fileSelected" /> 
                             </b-col>
                           </div>
                           <div>
                             <b-col class="d-none">
                               <label for="firstName"> First Name </label>
                             </b-col>
                             <b-col>
                                 <b-form-input id="firstName"
                                               type="text"
                                               placeholder="First Name"
                                               v-model="input.firstName">
                                 </b-form-input>
                             </b-col> 
                           </div>
                           <div>
                             <b-col calls="d-none">
                               <label for="lastName"> Last Name </label>
                             </b-col>  
                             <b-col>
                                <b-form-input id="lastName"
                                              type="text"
                                              placeholder="Last Name"
                                              v-model="input.lastName">
                                </b-form-input> 
                             </b-col>
                           </div>
                           <div>
                               <b-col class="d-none">
                                  <label for="email"> Email </label>
                               </b-col> 
                               <b-col> 
                                   <b-form-input id="email"
                                                 type="email"
                                                 placeholder="Email"
                                                 v-model="input.email"
                                                 disabled> Email
                                   </b-form-input>
                               </b-col>
                           </div>
                           <div>
                               <b-col class="d-none">
                                 <label for="status"> Status </label>
                               </b-col> 
                               <b-col>
                                  <b-form-input id="admin"
                                                type="text"
                                                placeholder="Admin"
                                                disabled>
                                                </b-form-input>
                               </b-col>
                           </div>
                      </b-form-group> 
                      <button type="submit"
                              :class="`save-btn ${emptyInput ? 'disabled' : ''}`"
                              :disabled="emptyInput"
                              aria-label="Upload user details">
                              Change Account Details
                      </button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>

        <PostsList :userId="userData.id" />
    </div>
</template>

<script>
import PostsList from '../components/PostsList.vue'
import ProfileImg from '../components/ProfileImg.vue'
import { apiClient } from '../services/apiClient'

export default {
    name: 'Profile',
    component: {
        ProfileImg,
        PostsList
    },
    data () {
        const userData = JSON.parse(localStorage.getItem('userData'))
        return {
            userData,
            input: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email
            },
            selectedFile: null,
            url: null
        }
    },

    methods: {
        fileSelected(event) {
            this.url = URL.createObjectURL(event.target.files[0])
            this.selectedFile = event.target.files[0]
        },

        engageUpload () {
            this.$refs.fileUpload.click()
        },

        async changeDetails (event) {
            let body = this.input

            const needsForm = !!this.selectedFile

            if (needsForm) {
                const fd = new FormData()
                fd.append('image', this.selectedFile)
                fd.append('user', JSON.stringify(body))
                body = fd
            }
            apiClient.put('api/auth/edit', body, { needsForm })
            .then(res => {
                localStorage.setItem('userData', JSON.stringify(res.user))
                this.userData = res.user
                window.location.reload(event)
            })
        }
    }, 
    
    computed: {
        emptyInput(){
            return (!this.input.firstName.trim().length || !this.input.lastName.trim().length)
        }
    },
}
</script>