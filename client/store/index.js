import Vuex from 'vuex'
import axios from 'axios';

const createStore = () => {
    return new Vuex.Store({
        state: { loadedPosts: [] },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            createPost(state, createdPost) {
                state.loadedPosts.push(createdPost);
            },
            updatePost(state, updatedPost) {
                const idx = state.loadedPosts.findIndex(
                    post => post.id === updatedPost.id
                )
                state.loadedPosts[idx] = updatedPost
            }
        },
        actions: {
            async nuxtServerInit({ commit }, context) {
                try {
                    const { data } = await axios.get('https://nuxt-86321.firebaseio.com/posts.json');
                    const postsList = [];
                    for (let key in data) {
                        postsList.push({ ...data[key], id: key });
                    }
                    console.log(JSON.stringify(postsList));
                    commit('setPosts', postsList);
                } catch (e) {
                    console.error(e);
                }
            },
            setPosts({ commit }, posts) {
                commit('setPosts', posts)
            },
            createPost({ commit }, createdPost) {
                createdPost.createdDate = new Date().toLocaleString()
                createdPost.updatedDate = createdPost.createdDate
                // Firebase 데이터베이스와 통신
                return axios
                    .post('https://nuxt-86321.firebaseio.com/posts.json', createdPost)
                    .then(res => {
                        // 통신이 성공하면 뮤테이션에 커밋
                        commit('createPost', { ...createdPost, id: res.data.name })
                    })
                    .catch(e => console.error(e))
            },
            updatePost({ commit }, updatedPost) {
                updatedPost.updatedDate = new Date().toLocaleString()
                return axios
                    .put(
                        `https://nuxt-86321.firebaseio.com/posts/${updatedPost.id}.json`,
                        updatedPost
                    )
                    .then(res => {
                        commit('updatePost', updatedPost)
                    })
                    .catch(e => console.error(e))
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore;