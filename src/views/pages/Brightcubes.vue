<template lang="jade">
#work-layer
  router-link.return-layer-bg(@click.native='$parent.HideHome(false), $parent.SetAnimation(1, 400, 0), $parent.ScrolledPosTop = 0', to='/')
  .work-bg
    .project-head-wrapper(:style='WrapperHeadColor')
    .project-wrapper
      .project-intro
        .row
          .project-intro-title
            h2.title Bright Cubes
        .row
          .project-detail-data
            ul.work-details
              li
                p.work-class role :
                p.work-attribute consultant | software developer
      .project-items
        .row(v-for="img in List")
          .item
            img(v-lazy="img", :key="img", lazy="loading").web-shot
</template>

<script>
export default {
  data() {
    return {
      WrapperHeadColor: 'background-color: #e28b23',
      List: []
    }
  }
}
</script>

<style>
</style>
