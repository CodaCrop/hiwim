<template lang="jade">
  .wrapper
    header.default-header
      a.logo(href='/')
    nav.default-menu
      router-link(to="/#work-section", v-on:click.native="HideHome(false), SetAnimeSpeed(0)",
      v-bind:class='{ active : HideDefaultLayer || ActiveWork }').work.menu-item
        .menu-link
          span.title work
          .icon
            svg
              rect(x='19', y='8', width='20', height='20')
      router-link(to="/#about-section", v-on:click.native="HideHome(false), SetAnimeSpeed(0)",
      v-bind:class="StateAbout").about.menu-item
        .menu-link
          span.title about
          .icon
            svg
              polygon(points='29 5, 41 25, 18 25')
      router-link(to="/#contact-section", v-on:click.native="HideHome(false), SetAnimeSpeed(0)",
      v-bind:class='{ active: ActiveContact }').contact.menu-item
        .menu-link
          span.title contact
          .icon
            svg
              circle(cx='30', cy='14', r='10')
    nav.work-menu(v-if="HideDefaultLayer")
      .prev-link(v-if="PrevBtn === true")
        router-link(v-bind:to="PrevUrl", v-on:click.native="SetPageBtns(), SetAnimeSpeed(0)").prev-layer-btn previous {{ PrevUrl }}
      .next-link(v-if="NextBtn === true")
        router-link(v-bind:to="NextUrl", v-on:click.native="SetPageBtns(), SetAnimeSpeed(0)").next-layer-btn next {{ NextUrl }}
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
      #work-section.section()
        .row
          .col-12
            h2.section-title my work
        .row
          .col-4.project-item(v-for="client in Clients")
            router-link.work-link(v-on:click.native='HideHome(true), CatchScreenPos(), SetPageBtns()', v-bind:to='client.route')
              .image
                img(v-bind:src='client.src')
              h3.title {{ client.title }}
      #about-section.section()
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
      #contact-section.section()
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
    transition(v-on:before-enter="WorkBeforeEnter", v-on:enter="WorkEnter", v-on:leave="WorkLeave")
      router-view(v-if='HideDefaultLayer')
    footer.default-footer(v-bind:class='{ hidden : HideDefaultLayer }')
      .row
        .col-12
          span © 2017 willem
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      PrevBtn: false,
      NextBtn: false,
      PrevUrl: '',
      NextUrl: '',
      AnimeMS: 200,
      HideDefaultLayer: false,
      ActiveWork: false,
      ActiveAbout: false,
      ActiveContact: false,
      ScrolledPosTop: 0,
      Loading: false,
      Clients: [
        { src: 'http://127.0.0.1:8080/dist/assets/ben.png', route: 'ben', title: 'Ben' },
        { src: 'http://127.0.0.1:8080/dist/assets/guidion.png', route: 'guidion', title: 'Guidion' },
        { src: 'http://127.0.0.1:8080/dist/assets/google.png', route: 'google-chrome', title: 'Google' },
        { src: 'http://127.0.0.1:8080/dist/assets/hhs.png', route: 'hhs', title: 'Haagse Hogeschool' },
        { src: 'http://127.0.0.1:8080/dist/assets/klm.png', route: 'klm', title: 'KLM' },
        { src: 'http://127.0.0.1:8080/dist/assets/alcedo.png', route: 'alcedo-media', title: 'Alcedo Media' },
        { src: 'http://127.0.0.1:8080/dist/assets/museon.png', route: 'museon', title: 'Museon' },
      ]
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
    }
  },
  methods: {
    SetPageBtns: function() {
      switch(window.location.pathname) {
        case '/ben': this.PrevBtn = false; this.NextBtn = true; this.NextUrl = 'guidion'; break;
        case '/guidion': this.NextBtn = true; this.NextUrl = 'google-chrome'; this.PrevBtn = true; this.PrevUrl = 'ben'; break;
        case '/google-chrome': this.NextBtn = true; this.NextUrl = 'hhs'; this.PrevBtn = true; this.PrevUrl = 'guidion'; break;
        case '/hhs': this.NextBtn = true; this.NextUrl = 'klm'; this.PrevBtn = true; this.PrevUrl = 'google-chrome'; break;
        case '/klm': this.NextBtn = true; this.NextUrl = 'alcedo-media'; this.PrevBtn = true; this.PrevUrl = 'hhs'; break;
        case '/alcedo-media': this.NextBtn = true; this.NextUrl = 'museon'; this.PrevBtn = true; this.PrevUrl = 'klm'; break;
        case '/museon': this.NextBtn = false; this.PrevBtn = true; this.PrevUrl = 'alcedo-media'; break;
        default: this.NextBtn = false; this.PrevBtn = false;
      }
    },
    HideHome: function(state) {
      this.HideDefaultLayer = state
    },
    SetAnimeSpeed: function(ms) {
      this.AnimeMS = ms
    },
    HandleScroll: function() {
      let intro = document.getElementById("intro-section")
      let work = document.getElementById("work-section")
      let about = document.getElementById("about-section")
      let contact = document.getElementById("contact-section")
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
      let menu = document.querySelectorAll('.menu-item')
      if (el !== '') {
        if(el == 'intro') { this.ActiveWork = false }
        el == 'work' && !this.HideDefaultLayer ? this.ActiveWork = true : this.ActiveWork = false
        el == 'about' && !this.HideDefaultLayer ? this.ActiveAbout = true : this.ActiveAbout = false
        el == 'contact' ? this.ActiveContact = true : this.ActiveContact = false
      }
    },
    CatchScreenPos: function() {
      var el = document.getElementById("default-layer")
      var elPosY = el.getBoundingClientRect()
      this.ScrolledPosTop = elPosY.top
    },
    WorkBeforeEnter: function(el) {
      el.style.opacity = 0
    },
    WorkEnter: function(el, done) {
      Velocity(el, { translateX: '200px' }, { duration: 0 })
      Velocity(el, { opacity: 1, translateX: '0px' }, { duration: this.AnimeMS, complete: done })
    },
    WorkLeave: function(el, done) {
      Velocity(el, { opacity: 0, translateX: '200px' }, { duration: this.AnimeMS, complete: done })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.HandleScroll)
  }
}
</script>

<style lang="sass">
</style>
