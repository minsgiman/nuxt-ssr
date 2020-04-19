import Vuex from 'vuex'

const api = process.env.baseUrl;

const createStore = () => {
    return new Vuex.Store({
        state: {
            token: null,
            loadedPosts: []
        },
        mutations: {
            setToken(state, token) {
                state.token = token
            },
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
            async nuxtServerInit({ commit }, { app }) {
                try {
                    const data = await app.$axios.$get('/posts.json');
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
            authUser({ commit }, authData) {
                const API_KEY = process.env.APIKey
                const authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${
                    !authData.isLogin ? 'signupNewUser' : 'verifyPassword'
                }?key=${API_KEY}`

                return this.$axios.$post(authURL, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then(res => {
                    commit('setToken', res.idToken)
                })
                .catch(e => console.error(e));
            },
            setPosts({ commit }, posts) {
                commit('setPosts', posts)
            },
            createPost({ commit, getters }, createdPost) {
                createdPost.createdDate = new Date().toLocaleString()
                createdPost.updatedDate = createdPost.createdDate
                // Firebase 데이터베이스와 통신
                return this.$axios
                    .$post(`/posts.json?auth=${getters.token}`, createdPost)
                    .then(data => {
                        // 통신이 성공하면 뮤테이션에 커밋
                        commit('createPost', { ...createdPost, id: data.name })
                    })
                    .catch(e => console.error(e))
            },
            updatePost({ commit, getters }, updatedPost) {
                updatedPost.updatedDate = new Date().toLocaleString()
                return this.$axios
                    .$put(
                        `/posts/${updatedPost.id}.json?auth=${getters.token}`,
                        updatedPost
                    )
                    .then(data => {
                        commit('updatePost', updatedPost)
                    })
                    .catch(e => console.error(e))
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            token(state) {
                return state.token
            }
        }
    })
}

export default createStore;