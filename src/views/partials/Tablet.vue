<template lang="jade">
  .tablet.item
    span.camera
    .shadow
    .screen(:class='{ scrollable : AnimationDone }')
      .inner.cf
        .wireframe.cf(:class='{ scroll : ScrollActive }')
          .w_header(:class='{ show : ShowHeader }')
            .wrapper
              span.w_image.w_logo.w_animate(:class='{ pop : !ShowHeader }').delay_4
              .w_nav
                span.w_text.w_animate(:class='{ pop : !ShowHeader }', :style='{ width: "20px" }').delay_5
                span.w_text.w_animate(:class='{ pop : !ShowHeader }', :style='{ width: "35px" }').delay_6
                span.w_text.w_animate(:class='{ pop : !ShowHeader }', :style='{ width: "45px" }').delay_7
                span.w_text.w_animate(:class='{ pop : !ShowHeader }', :style='{ width: "20px" }').delay_8
                span.w_text.w_animate(:class='{ pop : !ShowHeader }', :style='{ width: "29px" }').delay_9
                span.w_btn.green.w_animate(:class='{ pop : !ShowHeader }', :style='{ width: "52px" }').delay_10
          .w_feature.w_animate(:class='{ show : ShowFeature }')
            .wrapper
              span.w_text.title.w_animate(:class='{ pop : !ShowFeature }', :style='{ width: "35%" }').delay_7
              span.w_text.w_animate(:class='{ pop : !ShowFeature }', :style='{ width: "50%" }').delay_8
              span.w_text.w_animate(:class='{ pop : !ShowFeature }', :style='{ width: "45%" }').delay_9
              span.w_btn.w_animate(:class='{ pop : !ShowFeature }').delay_10
          .wrapper
            .w_portals.cf
              .w_portal.w_animate(:class='{ pop : !ShowFeature }').delay_5
                span.w_image
                span.w_text(:style='{ width: "85%" }')
                span.w_text(:style='{ width: "80%" }')
              .w_portal.w_animate(:class='{ pop : !ShowFeature }').delay_6
                span.w_image
                span.w_text(:style='{ width: "80%" }')
                span.w_text(:style='{ width: "60%" }')
              .w_portal.w_animate(:class='{ pop : !ShowFeature }').delay_7
                span.w_image
                span.w_text(:style='{ width: "80%" }')
                span.w_text(:style='{ width: "70%" }')
          .w_split.w_animate(:class='{ show : ShowSplit }')
            .wrapper
              span.w_image.w_animate(:class='{ pop : !ShowSplit }').delay_1
              .w_content
                span.w_text.title.w_animate(:class='{ pop : !ShowSplit }', :style='{ width: "70%" }').delay_3
                span.w_text.w_animate(:class='{ pop : !ShowSplit }', :style='{ width: "100%" }').delay_4
                span.w_text.w_animate(:class='{ pop : !ShowSplit }', :style='{ width: "90%" }').delay_5
                span.w_text.w_animate(:class='{ pop : !ShowSplit }', :style='{ width: "75%" }').delay_6
                span.w_text.w_animate(:class='{ pop : !ShowSplit }', :style='{ width: "85%" }').delay_7
                span.w_btn.w_animate(:class='{ pop : !ShowSplit }').delay_8
          .wrapper
            #services.w_services.cf.w_animate(:class='{ show : ShowServices }')
              .w_service.w_animate(:class='{ pop : !ShowServices }').delay_1
                span.w_image
                .w_content
                  span.w_text.title(:style='{ width: "75%" }')
                  span.w_text(:style='{ width: "100%" }')
                  span.w_text(:style='{ width: "100%" }')
              .w_service.w_animate(:class='{ pop : !ShowServices }').delay_3
                span.w_image
                .w_content
                  span.w_text.title(:style='{ width: "75%" }')
                  span.w_text(:style='{ width: "100%" }')
                  span.w_text(:style='{ width: "100%" }')
              .w_service.w_animate(:class='{ pop : !ShowServices }').delay_5
                span.w_image
                .w_content
                  span.w_text.title(:style='{ width: "75%" }')
                  span.w_text(:style='{ width: "100%" }')
                  span.w_text(:style='{ width: "100%" }')
              .w_service.w_animate(:class='{ pop : !ShowServices }').delay_7
                span.w_image
                .w_content
                  span.w_text.title(:style='{ width: "75%" }')
                  span.w_text(:style='{ width: "100%" }')
                  span.w_text(:style='{ width: "100%" }')
              .w_service.w_animate(:class='{ pop : !ShowServices }').delay_9
                span.w_image
                .w_content
                  span.w_text.title(:style='{ width: "75%" }')
                  span.w_text(:style='{ width: "100%" }')
                  span.w_text(:style='{ width: "100%" }')
              .w_service.w_animate(:class='{ pop : !ShowServices }').delay_11
                span.w_image
                .w_content
                  span.w_text.title(:style='{ width: "75%" }')
                  span.w_text(:style='{ width: "100%" }')
                  span.w_text(:style='{ width: "100%" }')
          .w_form.w_animate(:class='{ show : ShowForm }')
            .wrapper
              .w_fields.cf
                .w_field.w_animate(:class='{ pop : !ShowForm }').delay_1
                  span.w_text(:style='{ width: "25%" }')
                .w_field.w_animate(:class='{ pop : !ShowForm }').delay_3
                  span.w_text(:style='{ width: "20%" }')
                .w_btn.w_animate(:class='{ pop : !ShowForm }').delay_5
          .wrapper
            .w_news.cf.w_animate(:class='{ show : ShowNews }')
              .w_article.large.w_animate(:class='{ pop : !ShowNews }').delay_1
                .w_content.w-animate(:class='{ pop : !ShowNews }').delay_2
                  span.w_text.title(:style='{ width: "75%" }')
                  span.w_text(:style='{ width: "85%" }')
                  span.w_text(:style='{ width: "75%" }')
              .w_article.large.w_animate(:class='{ pop : !ShowNews }').delay_3
                .w_content.w_animate(:class='{ pop : !ShowNews }').delay_4
                  span.w_text.title(:style='{ width: "55%" }')
                  span.w_text(:style='{ width: "65%" }')
                  span.w_text(:style='{ width: "60%" }')
              .w_article.w_animate(:class='{ pop : !ShowNews }').delay_5
                .w_content.w_animate(:class='{ pop : !ShowNews }').delay_6
                  span.w_text.title(:style='{ width: "35%" }')
                  span.w_text(:style='{ width: "45%" }')
                  span.w_text(:style='{ width: "40%" }')
              .w_article.w_animate(:class='{ pop : !ShowNews }').delay_7
                .w_content.w_animate(:class='{ pop : !ShowNews }').delay_8
                  span.w_text.title(:style='{ width: "60%" }')
                  span.w_text(:style='{ width: "70%" }')
                  span.w_text(:style='{ width: "65%" }')
          .w_footer.w_animate(:class='{ show : ShowFooter }')
            .wrapper
              .w_links
                span.w_text.title.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "70%" }').delay_1
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "60%" }').delay_2
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "65%" }').delay_2
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "58%" }').delay_2
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "62%" }').delay_2
              .w_links.w_animate(:class='{ pop : !ShowFooter }').delay_3
                span.w_text.title.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "50%" }').delay_3
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "62%" }').delay_4
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "58%" }').delay_4
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "52%" }').delay_4
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "56%" }').delay_4
              .w_links.w_animate(:class='{ pop : !ShowFooter }').delay_6
                span.w_text.title.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "65%" }').delay_6
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "60%" }').delay_6
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "62%" }').delay_6
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "58%" }').delay_6
                span.w_text.w_animate(:class='{ pop : !ShowFooter }', :style='{ width: "57%" }').delay_6
    span.button
</template>

<script>
export default {
  data() {
    return {
      AnimationDone: false,
      ScrollActive: false,
      ShowHeader: false,
      ShowFeature: false,
      ShowSplit: false,
      ShowServices: false,
      ShowForm: false,
      ShowNews: false,
      ShowFooter: false
    }
  },
  methods: {
    Header: function() { this.ShowHeader = true; },
    Feature: function() { this.ShowFeature = true; },
    Split: function() { this.ShowSplit = true; },
    Services: function() { this.ShowServices = true; },
    Form: function() { this.ShowForm = true; },
    News: function() { this.ShowNews = true; },
    Footer: function() { this.ShowFooter = true; },
    ScrollPhase: function() { this.ScrollActive = true; },
    AnimationFinish: function() {
      this.AnimationDone = true;
      this.ScrollActive = false;
    }
  },
  mounted: function() {
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
      .DelayState(this.Header, 1500)
      .DelayState(this.Feature, 1000)
      .DelayState(this.Split, 1000)
      .DelayState(this.Services, 1000)
      .DelayState(this.ScrollPhase, 1000)
      .DelayState(this.Form, 1000)
      .DelayState(this.News, 1000)
      .DelayState(this.Footer, 1000)
      .DelayState(this.AnimationFinish, 2000)
  }
}
</script>

<style>
</style>
