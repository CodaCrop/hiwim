<template lang="jade">
  .container
    header.heading(:class="{ works : ActiveWork || HideDefaultLayer }")
      router-link(to='/#intro-section', @click.native="SmoothScroll('intro')").logo
        | \/<span> </span>/
    transition(v-on:before-enter="WorkBeforeEnter", v-on:enter="WorkEnter", v-on:leave="WorkLeave")
      nav.menu(:class="{ works : ActiveWork || HideDefaultLayer }")
        router-link(to="/#work-section", @click.native="HideHome(false), SmoothScroll('work'), SetAnimation(1, 0, 0)",
        :class='{ active : ActiveWork || HideDefaultLayer }').work.menu-item
          .menu-link
            .icon
              svg(xmlns="http://www.w3.org/2000/svg")
                rect(x='20', y='20', width='20', height='20')
            span werk
        router-link(to="/#about-section", @click.native="HideHome(false), SmoothScroll('about'), SetAnimation(1, 0, 0)",
        :class="StateAbout").about.menu-item
          .menu-link
            .icon
              svg(xmlns="http://www.w3.org/2000/svg")
                polygon(points='30 20, 42 40, 20 40')
            span over
        router-link(to="/#contact-section", @click.native="HideHome(false), SmoothScroll('contact'), SetAnimation(1, 0, 0)",
        :class='{ active : ActiveContact }').contact.menu-item
          .menu-link
            .icon
              svg(xmlns="http://www.w3.org/2000/svg")
                circle(cx='30', cy='30', r='10')
            span contact
    nav.work-menu(v-show="HideDefaultLayer")
      .prev-link(v-if="PrevBtn === true")
        router-link(:to="PrevUrl", @click.native="SetPageBtns(), SetAnimation(1, 0, 0)").prev-layer-btn previous — {{ PrevUrl }}
        router-link(:to="PrevUrl", @click.native="SetPageBtns(), SetAnimation(1, 0, 0)").prev-layer-btn-small prev
          svg(class="prev-arrow" xmlns="http://www.w3.org/2000/svg" width="50" height="10" viewBox="0 0 50 10")
            path(class="arrow" d="M34.6623,26.2627 L27.6313,19.2317 C27.2413,18.8417 26.6083,18.8417 26.2173,19.2317 C25.8273,19.6227 25.8273,20.2557 26.2173,20.6467 L31.5713,25.9997 L20.0003,25.9997 C19.4473,25.9997 19.0003,26.4477 19.0003,26.9997 C19.0003,27.5527 19.4473,27.9997 20.0003,27.9997 L31.6053,27.9997 L26.2273,33.3777 C25.8373,33.7687 25.8373,34.4017 26.2273,34.7917 C26.6183,35.1827 27.2513,35.1827 27.6423,34.7917 L34.7133,27.7207 C35.0093,27.4247 35.0783,26.9897 34.9243,26.6257 C34.8673,26.4837 34.7743,26.3637 34.6623,26.2627")
      .next-link(v-if="NextBtn === true")
        router-link(:to="NextUrl", @click.native="SetPageBtns(), SetAnimation(1, 0, 0)").next-layer-btn next — {{ NextUrl }}
        router-link(:to="NextUrl", @click.native="SetPageBtns(), SetAnimation(1, 0, 0)").next-layer-btn-small next
    #default-layer(:class='{ hidden : HideDefaultLayer }', :style="PosFromTop")
      section#intro-section
        .content
          TabletComponent
          .intro-text.item
            h1.title
            p.intro-content
            .goto-work
              router-link(to="/#work-section", @click.native="SmoothScroll('work')")
                i.arrow-down
          PhoneComponent
        .bg
          span.band.over.bottom.left.rotate_cc.origin_tl
          span.band.under.bottom.right.rotate_c.origin_tr
      section#work-section
        .content.timeline
          WorkComponent
      section#about-section
        .content
          .row.profile-pic
              img(src="dist/assets/photo_animated.gif" alt="image")
          .row
            h2.title
          .row.about
            .flex-wrap
              .personal-synopsis
                h2.title Development
                p.complementary-text 
              .personal-skills
                h2.title UX UI Design
                p.complementary-text 
        .bg
          span.band.white.top.right.rotate_cc.origin_br
          span.band.blue_1.top.right.rotate_cc.origin_tr
          span.band.blue_2.top.right.rotate_cc.origin_tr
          span.band.blue_3.bottom.right.rotate_c.origin_br
      section#contact-section
        FormComponent
    transition(v-on:before-enter="WorkBeforeEnter", v-on:enter="WorkEnter", v-on:leave="WorkLeave")
      router-view(v-if='HideDefaultLayer')
    footer.foot(v-if='!HideDefaultLayer')
      .content
        .row
          p.footer-text {{ CurrentYear }}  © Hiwim
</template>

<script>
import PhoneComponent from './partials/Phone.vue'
import TabletComponent from './partials/Tablet.vue'
import WorkComponent from './partials/Works.vue'
import FormComponent from './partials/Form.vue'
import Vue from 'vue'

export default {
  data() {
    return {
      CurrentYear: new Date().getFullYear(),
      PrevBtn: false,
      NextBtn: false,
      PrevUrl: '',
      NextUrl: '',
      AnimeMS: 0,
      AnimePX: 0,
      AnimeOP: 0,
      HideDefaultLayer: false,
      ActiveWork: false,
      ActiveAbout: false,
      ActiveContact: false,
      ScrolledPosTop: 0
    }
  },
  watch: {
    '$route': function(newRoute, oldRoute) {
      newRoute.path == '/' ? this.HideDefaultLayer = false : this.HideDefaultLayer = true
    }
  },
  computed: {
    PosFromTop: function() {
      return {
        'top': this.ScrolledPosTop + 'px'
      }
    },
    StateAbout: function() {
      if(this.ActiveAbout) { return 'active'; } else { return ''; }
    }
  },
  components: {
    PhoneComponent,
    TabletComponent,
    WorkComponent,
    FormComponent,
  },
  methods: {
    SetPageBtns: function() {
      switch(window.location.pathname) {
        case '/knab': this.PrevBtn = false; this.NextBtn = true; this.NextUrl = 'brightcubes'; break;
        case '/brightcubes': this.PrevBtn = true; this.PrevUrl = 'Knab'; this.NextBtn = true; this.NextUrl = 'ben'; break;
        case '/ben': this.PrevBtn = true; this.PrevUrl = 'brightcubes'; this.NextBtn = true; this.NextUrl = 'guidion'; break;
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
    HandleScroll: function() {
      let intro = document.getElementById("intro-section")
      let about = document.getElementById("about-section")
      let work = document.getElementById("work-section")
      let contact = document.getElementById("contact-section")
      if(this.IsInViewport(intro)) { this.SetActiveState('intro') }
      if(this.IsInViewport(about)) { this.SetActiveState('about') }
      if(this.IsInViewport(work)) { this.SetActiveState('work') }
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
        el == 'contact' && !this.HideDefaultLayer ? this.ActiveContact = true : this.ActiveContact = false
      }
    },
    SetWidthText: function(width) {
      return width;
    },
    SmoothScroll: function(goto) {
      let intro = document.getElementById("intro-section")
      let about = document.getElementById("about-section")
      let work = document.getElementById("work-section")
      let contact = document.getElementById("contact-section")
      switch(goto) {
        case 'intro':
          Velocity(intro, "scroll", { duration: 300, easing: "easeInBack" })
          break;
        case 'about':
          Velocity(about, "scroll", { duration: 300, easing: "easeInBack" })
          break;
        case 'work':
          Velocity(work, "scroll", { duration: 300, easing: "easeInBack" })
          break;
        case 'contact':
          Velocity(contact, "scroll", { duration: 300, easing: "easeInBack" })
          break;
      }
    },
    CatchScreenPos: function() {
      var el = document.getElementById("default-layer")
      var elPosY = el.getBoundingClientRect()
      this.ScrolledPosTop = elPosY.top
    },
    SetAnimation: function(op, px, ms) {
      this.AnimeOP = op
      this.AnimePX = px
      this.AnimeMS = ms
    },
    WorkBeforeEnter: function(el) {
      el.style.opacity = this.AnimeOP
    },
    WorkEnter: function(el, done) {
      Velocity(el, { translateX: '200px' }, { duration: 0 })
      Velocity(el, { opacity: 1, translateX: '0px' }, { duration: this.AnimeMS, complete: done })
    },
    WorkLeave: function(el, done) {
      Velocity(el, { translateX: '200px'}, { duration: 0 })
      Velocity(el, { opacity: 0 , translateX: '0px'}, { duration: this.AnimeMS, complete: done })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.HandleScroll)
  }
}
</script>
