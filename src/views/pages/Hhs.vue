<template lang="jade">
#work-layer
  router-link.return-layer-bg(@click.native='$parent.HideHome(false), $parent.SetAnimation(1, 400, 250), $parent.ScrolledPosTop = 0', to='/')
  .work-bg
    .project-head-wrapper(:style='WrapperHeadColor')
    .project-wrapper
      .project-intro
        .row
          .project-intro-title.col-12
            h2.title Haagse Hogeschool
        .row
          .project-detail-data.col-12
            ul.work-details
              li
                p.work-class role :
                p.work-attribute branding / web design / front end
              li
                p.work-class typeface :
                p.work-attribute Archive / Helvetica Standard
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
      WrapperHeadColor: 'background-color: #1f3141',
      List: [
        'http://127.0.0.1:8080/dist/works/hhs/hhs-contact.png',
        'http://127.0.0.1:8080/dist/works/hhs/hhs-krediet.png',
        'http://127.0.0.1:8080/dist/works/hhs/hhs-wat.png',
      ]
    }
  }
}
</script>

<style lang="sass">
  h2.title, p.work-class, p.work-attribute
    color: #f5f5f5

</style>
