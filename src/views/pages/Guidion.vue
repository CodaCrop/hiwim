<template lang="jade">
#work-layer
  router-link.return-layer-bg(@click.native='$parent.HideHome(false), $parent.SetAnimation(1, 400, 250), $parent.ScrolledPosTop = 0', to='/')
  .work-bg
    .project-head-wrapper(:style='WrapperHeadColor')
    .project-wrapper
      .project-intro
        .row
          .project-intro-title.col-12
            h2.title Guidion
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
      WrapperHeadColor: 'background-color: #f16b5f',
      List: [
        '/dist/works/guidion/guidion-wiki-home.jpg',
        '/dist/works/guidion/guidion-wiki.jpg',
        '/dist/works/guidion/guidion-sonar-home.jpg',
      ]
    }
  }
}
</script>

<style>
</style>
