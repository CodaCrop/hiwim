<template lang="jade">
  .wrapper
    header.default-header
      router-link(to='/' @click.native="SmoothScroll()").logo WB
    nav.default-menu
      router-link(to="/#work-section", @click.native="HideHome(false), SmoothScroll('work'), SetAnimation(1, 0, 0)",
      :class='{ active : HideDefaultLayer || ActiveWork }').work.menu-item
        .menu-link
          span.title work
          .icon
            svg
              rect(x='19', y='8', width='20', height='20')
      router-link(to="/#about-section", @click.native="HideHome(false), SmoothScroll('about'), SetAnimation(1, 0, 0)",
      :class="StateAbout").about.menu-item
        .menu-link
          span.title about
          .icon
            svg
              polygon(points='29 5, 41 25, 18 25')
      router-link(to="/#contact-section", @click.native="HideHome(false), SmoothScroll('contact'), SetAnimation(1, 0, 0)",
      :class='{ active : ActiveContact }').contact.menu-item
        .menu-link
          span.title contact
          .icon
            svg
              circle(cx='30', cy='14', r='10')
    .work-menu(v-if="HideDefaultLayer")
      .prev-link(v-if="PrevBtn === true")
        router-link(:to="PrevUrl", @click.native="SetPageBtns(), SetAnimation(1, 0, 0)").prev-layer-btn previous — {{ PrevUrl }}
      .next-link(v-if="NextBtn === true")
        router-link(:to="NextUrl", @click.native="SetPageBtns(), SetAnimation(1, 0, 0)").next-layer-btn next — {{ NextUrl }}
    #default-layer(:class='{ hidden : HideDefaultLayer }', :style="PosFromTop").container-fluid
      #intro-section.section
        .row
          .col-12
            .intro-text
              h1.title hi I'm Wim — designer & coder
              h2.subtitle
                | I love creating useful and beautiful things for people
                br
                | see my latest &nbsp;
                router-link(to="/#work-section", @click.native="SmoothScroll('work')").primary-link work
      #work-section.section
        .row
          .col-12
            h2.section-title my work
        .row
          .col-4.project-item(v-for="client in Clients")
            router-link.work-link(@click.native='HideHome(true), CatchScreenPos(), SetPageBtns(), SetAnimation(0, 400, 250)',
            :to='client.route')
              .image
                img(:src='client.src')
              h3.title {{ client.title }}
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
              | of applied sciences and studied UX and UI concepts, and front-end languages such as
              | HTML, CSS and Javascript.
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
            form#contact-form(@submit.prevent="ValidateBeforeSubmit")
              .input-group
                label#name(for='name') name:
                span.state-text.input-error(v-if="errors.has('name')") {{ errors.first('name') }}
                input(v-model="name", v-validate.initial="name", data-vv-rules="required|alpha",
                name='name', type='text')
              .input-group
                label#email(for='email') email:
                span.state-text.input-error(v-if="errors.has('email')") {{ errors.first('email') }}
                input(v-model.lazy="email", v-validate.initial="email", data-vv-rules="required|email",
                name='email', type='text')
              .input-group
                label#message(for='message') message:
                span.state-text.message-error(v-if="errors.has('message')") {{ errors.first('message') }}
                textarea(v-model="message", v-validate.initial="message", data-vv-rules="required",
                name='message', rows='4', spellcheck='false')
              .input-group
                button.send-button(:class="{ 'disabled' : errors.has('name') || errors.has('email') || errors.has('message'), 'sending' : SendLoader }",
                value='', type='submit')
                  svg(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve")
                    path(class="paper-plane-icon" d="M462,54.955L355.371,437.187l-135.92-128.842L353.388,167l-179.53,124.074L50,260.973L462,54.955zM202.992,332.528v124.517l58.738-67.927L202.992,332.528z")
                .message-success(v-if="MessageSent")
                  p.state-text Message sent!
              .input-seperate
    transition(v-on:before-enter="WorkBeforeEnter", v-on:enter="WorkEnter", v-on:leave="WorkLeave")
      router-view(v-if='HideDefaultLayer')
    footer.default-footer(:class='{ hidden : HideDefaultLayer }')
      .row
        .col-12
          span © {{ CurrentYear }} willem
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

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
      ScrolledPosTop: 0,
      name: '',
      email: '',
      message: '',
      SendLoader: false,
      MessageSent: false,
      Clients: [
        { src: '/dist/assets/clients/ben.png', route: 'ben', title: 'Ben' },
        { src: '/dist/assets/clients/guidion.png', route: 'guidion', title: 'Guidion' },
        { src: '/dist/assets/clients/google.png', route: 'google-chrome', title: 'Google' },
        { src: '/dist/assets/clients/hhs.png', route: 'hhs', title: 'Haagse Hogeschool' },
        { src: '/dist/assets/clients/klm.png', route: 'klm', title: 'KLM' },
        { src: '/dist/assets/clients/alcedo.png', route: 'alcedo-media', title: 'Alcedo Media' },
        { src: '/dist/assets/clients/museon.png', route: 'museon', title: 'Museon' },
      ]
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
  methods: {
    ValidateBeforeSubmit: function(fields) {
      this.$validator.validateAll().then(success => {
        if (!success) {
          return;
        } else {
          let email = "wim.d.boer017@gmail.com"
          let data = "?subject=" + this.name + "?content=" + this.message + "?source=" + this.email
          this.SendData(email, data)
        }
      });
    },
    SendData: function() {
      this.SendLoader = true;
      setTimeout(() => {
        this.SendLoader = false;
        this.CleanData();
      }, 3000)
    },
    CleanData: function() {
      console.log('CleanData is called')
      this.email = ''
      this.name = ''
      this.message = ''
      this.errors.clear();
    },
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
    SetAnimation: function(op, px, ms) {
      this.AnimeOP = op
      this.AnimePX = px
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
        el == 'contact' && !this.HideDefaultLayer ? this.ActiveContact = true : this.ActiveContact = false
      }
    },
    SmoothScroll: function(goto) {
      let intro = document.getElementById("intro-section")
      let work = document.getElementById("work-section")
      let about = document.getElementById("about-section")
      let contact = document.getElementById("contact-section")
      switch(goto) {
        case 'work':
          Velocity(work, "scroll", { duration: 300, easing: "easeInBack" })
          break;
        case 'about':
          Velocity(about, "scroll", { duration: 300, easing: "easeInBack" })
          break;
        case 'contact':
          Velocity(contact, "scroll", { duration: 300, easing: "easeInBack" })
          break;
        default:
          velocity(intro, "scroll", { duration: 300, easing: "easeInBack" })
      }
    },
    CatchScreenPos: function() {
      var el = document.getElementById("default-layer")
      var elPosY = el.getBoundingClientRect()
      this.ScrolledPosTop = elPosY.top
    },
    WorkBeforeEnter: function(el) {
      el.style.opacity = this.AnimeOP
    },
    WorkEnter: function(el, done) {
      Velocity(el, { translateX: this.AnimePX }, { duration: 0 })
      Velocity(el, { opacity: 1, translateX: '0px' }, { duration: this.AnimeMS, complete: done })
    },
    WorkLeave: function(el, done) {
      Velocity(el, { opacity: 0, translateX: '0px' }, { duration: this.AnimeMS, complete: done })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.HandleScroll)
  }
}
</script>

<style lang="sass">
</style>
