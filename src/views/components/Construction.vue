<template lang="jade">
  .container
    .content-fullpage
      .logo Hiwim
      .maintenance
        h1.info-title Ik ga Lanceren in :
        h2.info-counter
          .time
            span.digit {{ days | two_digits }}
              b.text dagen
          .time
            span.digit {{ hours | two_digits }}
              b.text u
          .time
            span.digit {{ minutes | two_digits }}
              b.text m
          .time
            span.digit {{ seconds | two_digits }}
              b.text s
        .context
          p.info-body Mijn website is onder constructie. De lancering van de nieuwe
             | website komt binnenkort online te staan.
          .countdown
      .social
    aside.block-element
</template>

<script>
export default {
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      date: Math.trunc(new Date("February 30, 2017") / 1000)
    }
  },
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
  },
  computed: {
    seconds() {
      return(this.date - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.date - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.date - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.date - this.now) / 60 / 60 / 24);
    }
  }
}
</script>

<style lang="sass">
 .container
    .content-fullpage
      background-color: #ffcc1b
      position: relative
      width: calc(100vw - 40vw)
      height: 100vh
      display: flex
      justify-content: flex-start
      flex-direction: row
      flex-wrap: wrap
      align-items: center
      opacity: 1
      &::after
        content: ''
        position: absolute
        top: 0
        right: -11vw
        height: 100vh
        width: 30vw
        transform: skewX(-14deg)
        background-color: inherit
        z-index: 1
      .logo
        font-size: 36px
        font-weight: bold
        width: 100%
        color: #252525
        margin-left: 2rem
        margin-right: 2rem
      .maintenance
        width: 100%
        color: #252525
        margin-left: 2rem
        margin-right: 2rem
        z-index: 2
        h1.info-title
          font-size: 20px
          font-weight: 600
        h2.info-counter
          font-size: 20px
          font-weight: 600
          max-width: 200px
          display: flex
          justify-content: space-between
          flex-wrap: nowrap
          margin-bottom: 24px
          .time
            margin-right: 1rem
            span.digit
              color: #079e81
            b.text
              margin-left: 7px
              color: #252525
        .context
          max-width: 500px
          p.info-body
            font-size: 18px
            line-height: 1.8
    aside.block-element
      background: url('/dist/assets/launch.jpg') no-repeat
      background-size: cover
      position: absolute
      top: 0
      right: 0
      width: 40vw
      height: 100%
      &::after
        content: ''
        position: absolute
        top: 0
        right: 0
        width: 100%
        height: 100%
        background: #6d2a9c
        opacity: 0.8
    @media screen and (max-width: 820px)
      .content-fullpage::after
        transform: none
    @media screen and (max-width: 450px)
      .content-fullpage
        width: 100vw
      aside.block-element
        display: none
</style>
