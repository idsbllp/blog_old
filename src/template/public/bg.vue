<template>
    <section class="bg">
        <div class="bg-img"></div>
    </section>
</template>

<style>
    .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('/blog/public/index/index/getBiyingPic');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        opacity: .8;
        z-index: -900;
    }
    .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(61,66,96,0.4);
        background-image: linear-gradient(140deg, rgba(61, 66, 96, 0.4) 15%, rgba(31, 34, 49, 0.4));
        background-image: -o-linear-gradient(140deg, rgba(61, 66, 96, 0.4) 15%, rgba(31, 34, 49, 0.4));
        background-image: -moz-linear-gradient(140deg, rgba(61, 66, 96, 0.4) 15%, rgba(31, 34, 49, 0.4));
        background-image: -webkit-linear-gradient(140deg, rgba(61, 66, 96, 0.4) 15%, rgba(31, 34, 49, 0.4));
        z-index: -899;
    }
</style>