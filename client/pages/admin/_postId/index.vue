<template lang="pug">
    .page-admin-post.container
        section.update-form
            h2.page-title 포스트 수정
            p 작성된 글을 수정합니다.
            post-form(:post="loadedPost", @submit="onSubmitted")
</template>
<script>
    import axios from 'axios'
    import PostForm from '@/components/Admin/PostForm'

    export default {
        head() {
          const post = this.loadedPost;
          return {
              title: post.title,
              meta: [
                  {
                      hid: 'description',
                      name: 'description',
                      content: `${post.title} 포스트 수정 페이지 입니다.`,
                  }
              ]
          }
        },
        layout: 'admin',
        components: { PostForm },
        computed: {
            loadedPost() {
                const id = this.$route.params.postId
                return this.$store.getters.loadedPosts.find(post => post.title === id)
            }
        },
        methods: {
            onSubmitted(editedPost) {
                // 스토어에 updatePost 디스패치
                this.$store
                    .dispatch('updatePost', editedPost)
                    .then(res => {
                        this.$notify({
                            group: 'admin-noti',
                            title: '수정 성공!',
                            text: '포스트 수정에 성공했습니다.',
                            duration: 2000,
                            speed: 10
                        })
                        this.$router.push('/admin')
                    })
            }
        }
    }
</script>