<template lang="jade">
#work-layer
  router-link.return-layer-bg(
    @click.native='$parent.HideHome(false), $parent.SetAnimation(1, 400, 250), $parent.ScrolledPosTop = 0',
    to='/')
  .work-bg
    .project-head-wrapper(:style='WrapperHeadColor')
    .project-wrapper
      .project-intro
        .row
          .project-intro-title.col-12
            h2.title Alcedo Media
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
              img(v-lazy="img", :key="img", lazy="loading").web-shot
</template>

<script>
export default {
  data() {
    return {
      WrapperHeadColor: 'background-color: #3eb8e3',
      List: [
        '/dist/works/alcedo/test.jpg',
        '/dist/works/alcedo/test-2.jpg',
        '/dist/works/alcedo/test-3.jpg',
      ]
    }
  }
}
</script>

<style>
</style>
