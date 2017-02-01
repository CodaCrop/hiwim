<template lang="jade">
#work-layer
  router-link.return-layer-bg(
    @click.native='ScrollPos',
    to='/#work-section')
  .work-bg
    .project-head-wrapper(:style='WrapperHeadColor')
    .project-wrapper
      .project-intro
        .row
          .project-intro-title
            h2.title Alcedo Media
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
      WrapperHeadColor: 'background-color: #3eb8e3',
      List: [
        '/dist/works/alcedo/test.jpg',
        '/dist/works/alcedo/test-2.jpg',
        '/dist/works/alcedo/test-3.jpg',
      ]
    }
  },
  methods: {
    ScrollTop: function() {
      console.log('scroll top called')
    },
    GoBack: function() {
      console.log('go back called')
    },
    ScrollPos: function() {
      $parent.HideHome(false)
      $parent.SetAnimation(1, 400, 0)
      $parent.ScrolledPosTop = 0
    },
    DelayBack: function() {
      function DelayState(t) {
        return new Promise(function (resolve) {
          setTimeout(resolve, t)
        });
      }
      Promise.DelayState = function(fn, t) {
        if(!t) {
          t = fn;
          fn = function() {};
        }
        return DelayState(t).then(fn)
      }
      Promise.prototype.DelayState = function(fn, t) {
        return this.then(function() {
          return Promise.DelayState(fn, t)
        });
      }
      Promise
        .DelayState(this.ScrollTop, 1500)
        .DelayState(this.GoBack, 1000)
    }
  }
}
</script>

<style>
</style>
