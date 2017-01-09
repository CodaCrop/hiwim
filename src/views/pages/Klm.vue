<template lang="jade">
#work-layer
  router-link.return-layer-bg(v-on:click.native='$parent.HideHome(false), $parent.SetAnimeSpeed(200), $parent.ScrolledPosTop = 0', to='/')
  .work-bg
    .project-head-wrapper(v-bind:style='WrapperHeadColor')
    .project-wrapper
      .project-intro
        .row
          .project-intro-title.col-12
            h2.title Air France / KLM
        .row
          .project-detail-data.col-12
            ul.work-details
              li
                p.work-class role :
                p.work-attribute branding / web design / front end
              li
                p.work-class typeface :
                p.work-attribute Trade Gothic / Proxima Nova
      .project-items
        .row(v-for="img in List")
          .col-12
            .item
              img(v-lazy="img" v-bind:key="img" lazy="loading").web-shot
</template>

<script>
export default {
  data() {
    return {
      WrapperHeadColor: 'background-color: #00a1e4',
      List: [
        'http://127.0.0.1:8080/dist/works/alcedo/test.jpg',
        'http://127.0.0.1:8080/dist/works/alcedo/test-2.jpg',
        'http://127.0.0.1:8080/dist/works/alcedo/test-3.jpg',
      ]
    }
  }
}
</script>

<style>
</style>
