<template lang="pug">
    .page-admin-create.container
        section.create-post-form
            h2.page-title 포스트 생성
            p 새로운 글을 작성합니다.
            post-form(@submit="onSubmitted")
</template>
<script>
import PostForm from '@/components/Admin/PostForm'

export default {
    layout: 'admin',
    components: {
        PostForm
    },
    methods: {
        onSubmitted(newPost) {
            // 스토어에 createPost 디스패치
            this.$store
                .dispatch('createPost', newPost)
                .then(() => this.$router.push('/admin'))
        }
    }
}
</script>