<template>
    <div class="page-home">
        <section class="intro">
            <h1>BLOG 서비스 with Nuxt.js</h1>
        </section>
        <section class="featured-post">
            <article class="post-preview">
                <nuxt-link :to="'/posts/' + 1">
                    <figure class="post-thumbnail"></figure>
                    <div class="post-content">
                        <h2 class="post-title">포스트 제목 1</h2>
                        <p class="post-text">포스트 내용</p>
                    </div>
                </nuxt-link>

            </article>
            <article class="post-preview">
                <nuxt-link :to="'/posts/' + 2">
                    <figure class="post-thumbnail"></figure>
                    <div class="post-content">
                        <h2 class="post-title">포스트 제목 2</h2>
                        <p class="post-text">포스트 내용</p>
                    </div>
                </nuxt-link>
            </article>
        </section>
    </div>
</template>
<style>
    .intro {
        position: relative;
        height: 200px;
        margin-bottom: 20px;
        padding: 30px;
        background-size: cover;
    }
    .intro h1 {
        position: absolute;
        top: 5%;
        left: 5%;
        width: 90%;
        font-size: 1.5rem;
        border-radius: 4px;
        padding: 10px;
    }
    .featured-posts {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px;
    }
    .post-preview {
        border: 1px solid #aaa;
        box-shadow: 0 2px 2px #aaa;
        flex: 1 0 90%;
        margin: 0 5% 15px 5%;
    }
    a {
        text-decoration: none;
        transition: all 0.4s ease;

    }
    .post-thumbnail {
        width: 100%;
        height: 150px;
        margin: 0;
        background-position: center;
        background-size: cover;
    }
    .post-title {
        margin-bottom: 0;
    }
    .post-text {
        margin-top: 0;
    }
    .post-content {
        padding: 10px;
        text-align: center;
    }
    @media (min-width: 768px) {
        .intro h1 {
            font-size: 2rem;
        }
        .post-preview {
            flex: 0 0 45%;
            margin: 0 10px;
        }
    }
</style>