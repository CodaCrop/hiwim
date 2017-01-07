<template lang="jade">
  .wrapper
    header.default-header
      a.logo(href='/')
    nav.default-menu
      router-link.work.menu-item(to="/#work-section", v-on:click.native="Hide(false)",
      v-bind:class='{ active : HideDefaultLayer || ActiveWork }')
        .menu-link
          span.title work
          .icon
            svg
              rect(x='19', y='8', width='20', height='20')
      router-link.about.menu-item(to="/#about-section", v-on:click.native="Hide(false)",
      v-bind:class="StateAbout")
        .menu-link
          span.title about
          .icon
            svg
              polygon(points='29 5, 41 25, 18 25')
      router-link.contact.menu-item(to="/#contact-section", v-on:click.native="Hide(false)",
      v-bind:class='{ active: ActiveContact }')
        .menu-link
          span.title contact
          .icon
            svg
              circle(cx='30', cy='14', r='10')
    #default-layer(v-bind:class='{ hidden : HideDefaultLayer }', v-bind:style="PosFromTop").container-fluid
      #intro-section.section
        .row
          .col-12
            .intro-text
              h1.title hi I'm Wim — designer & coder
              h2.subtitle
                | I love creating useful and beautiful things for people
                br
                | see my latest &nbsp;
                a.primary-link(href='#work-section') work
      #work-section.section
        .row
          .col-12
            h2.section-title my work
        .row
          .col-4.project-item
            router-link.work-link(v-on:click.native='Hide(true), CatchScreenPos()', to='ben')
              .image project 1
              h3.title Ben
          .col-4.project-item
            router-link.work-link(v-on:click.native='Hide(true), CatchScreenPos()', to='guidion')
              .image project 2
              h3.title Guidion
          .col-4.project-item
            router-link.work-link(v-on:click.native='Hide(true), CatchScreenPos()', to='google-chrome')
              .image project 3
              h3.title Google Chrome
          .col-4.project-item
            router-link.work-link(v-on:click.native='Hide(true), CatchScreenPos()', to='hhs')
              .image project 4
              h3.title Haagse Hogeschool
          .col-4.project-item
            router-link.work-link(v-on:click.native='Hide(true), CatchScreenPos()', to='klm')
              .image project 5
              h3.title KLM
          .col-4.project-item
            router-link.work-link(v-on:click.native='Hide(true), CatchScreenPos()', to='alcedo-media')
              .image project 6
              h3.title Alcedo Media
          .col-4.project-item
            router-link.work-link(v-on:click.native='Hide(true), CatchScreenPos()', to='museon')
              .image project 6
              h3.title Museon
      #about-section.section
        .row
          .col-12
            h2.section-title me
        .row
          .col-5.about-img
            img(src='#')
          .col-7.about-text
            p.complementary-text
              | I'm a 27 year old UX designer and Front-end developer. I'm a bachelor
              | of applied sciences and studied UX, UI and front-end languages such as
              | HTML, CSS, Javascript.
      #contact-section.section
        .row
          .col-12
            h2.section-title let's talk
        .row
          .col-5.follow-text
            p.title follow me on —
            p.complementary-text
              a.secundary-link(href='/', target='_blank') dribble,
              a.secundary-link(href='/', target='_blank')  github,
              a.secundary-link(href='/', target='_blank')  kodity,
              a.secundary-link(href='/', target='_blank')  facebook
          .col-7.contact-form
            p.title say hi —
            p.complementary-text
              | by email : say@hiwim.com
              br
              | or write me a message
            form#contact-form(name='contact-form', method='post')
              .input-group
                label#name(for='name') name:
                input(name='name', type='text')
              .input-group
                label#email(for='email') email:
                input(name='email', type='text')
              .input-group
                label#message(for='message') message:
                textarea(name='message', rows='4', spellcheck='false')
              .input-seperate
              button.button-icon.send-button(value='', type='submit')
              .message-sent
    transition(name='smoothTrans')
      router-view(v-if='HideDefaultLayer')
    footer.default-footer(v-bind:class='{ hidden : HideDefaultLayer }')
      .row
        .col-12
          span © 2017 willem
</template>

<script>
import Vue from 'vue'
var vueSmoothScroll = require('vue-smoothscroll')
Vue.use(vueSmoothScroll);
export default {
  data() {
    return {
      HideDefaultLayer: false,
      ActiveWork: false,
      ActiveAbout: false,
      ActiveContact: false,
      ScrolledPosTop: 0,
      Loading: false
    }
  },
  computed: {
    PosFromTop: function() {
      return {
        'top': this.ScrolledPosTop + 'px'
      }
    },
    StateAbout: function() {
      if(this.HideDefaultLayer) { return ''; }
      else if(this.ActiveAbout) { return 'active'; }
      else { return ''; }
    }
  },
  methods: {
    Hide: function(state) {
      this.HideDefaultLayer = state;
    },
    HandleScroll: function() {
      let intro = document.getElementById("intro-section");
      let work = document.getElementById("work-section");
      let about = document.getElementById("about-section");
      let contact = document.getElementById("contact-section");
      if(this.IsInViewport(intro)) { this.SetActiveState('intro') }
      if(this.IsInViewport(work)) { this.SetActiveState('work') }
      if(this.IsInViewport(about)) { this.SetActiveState('about') }
      if(this.IsInViewport(contact)) { this.SetActiveState('contact') }
    },
    IsInViewport: function(el) {
      let rect = el.getBoundingClientRect();
      let html = document.documentElement;
      return (
        rect.top <= (window.innerHeight * .5 || html.clientHeight) &&
        rect.bottom >= (window.innerHeight * .5 || html.clientHeight)
      )
    },
    SetActiveState: function(el) {
      let menu = document.querySelectorAll('.menu-item');
      if (el !== '') {
        if(el == 'intro') { this.ActiveWork = false }
        el == 'work' ? this.ActiveWork = true : this.ActiveWork = false
        el == 'about' ? this.ActiveAbout = true : this.ActiveAbout = false
        el == 'contact' ? this.ActiveContact = true : this.ActiveContact = false
      }
    },
    CatchScreenPos: function() {
      var el = document.getElementById("default-layer");
      var elPosY = el.getBoundingClientRect();
      this.ScrolledPosTop = elPosY.top
    }
  },
  mounted() {
    window.addEventListener('scroll', this.HandleScroll);
  }
}
</script>

<style lang="sass">
  .smoothTrans-leave-active
    transition: transform .3s ease, opacity .2s ease
  .smoothTrans-enter-active
    transition: all .3s ease
  .smoothTrans-enter, .smoothTrans-leave-active
    overflow-x: hidden
    transform: translateX(200px)
    opacity: 0

  .smoothHide-leave-active
    transition: transform .3s ease, opacity .2s ease
  .smoothHide-enter-active
    transition: all .3s ease
  .smoothHide-enter, .smoothHide-leave-active
    transform: translateX(400px)
    opacity: 0.5
</style>
