<template lang="jade">
#work-layer
  router-link.return-layer-bg(@click.native='$parent.HideHome(false), $parent.SetAnimation(1, 400, 0), $parent.ScrolledPosTop = 0', to='/')
  .work-bg
    .project-head-wrapper(:style='WrapperHeadColor')
    .project-wrapper
      .project-intro
        .row
          .project-intro-title
            h2.title Museon
        .row
          .project-detail-data
            ul.work-details
              li
                p.work-class role :
                p.work-attribute branding / web design / front end
              li
                p.work-class typeface :
                p.work-attribute Trade Gothic / Proxima Nova
      .project-items
        .row(v-for="img in List")
          .item
            img(v-lazy="img", :key="img", lazy="loading").web-shot
</template>

<script>
export default {
  data() {
    return {
      WrapperHeadColor: 'background-color: #95c013',
      List: [
        '/dist/works/alcedo/test.jpg',
        '/dist/works/alcedo/test-2.jpg',
        '/works/alcedo/test-3.jpg',
      ]
    }
  }
}
</script>

<style>
</style>
