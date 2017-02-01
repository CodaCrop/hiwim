<template lang="jade">
  .content
    .row
      h2.title — laten we praten
    .row.contact
      .follow-text
        p.title volg me op —
        p.complementary-text
          a.secundary-link(href='/', target='_blank') dribble,
          a.secundary-link(href='/', target='_blank')  github,
          a.secundary-link(href='/', target='_blank')  kodity,
          a.secundary-link(href='/', target='_blank')  facebook
        p.title zeg hi —
        p.complementary-text
          | via email : <a href="#" class="secundary-link">sayhiwim@gmail.com</a>
          br
          | of stuur me direct een bericht
      .contact-form
        form(@submit.prevent="ValidateBeforeSubmit")
          .input-group.half-width
            span.state-text.input-error(v-if="errors.has('name')") {{ errors.first('name') }}
            input(v-model="name", v-validate="name", data-vv-rules="required|alpha",
            name='name', type='text')
            span.input-value(:class="{ filled : name !== '' }") Naam:
          .input-group.half-width
            span.state-text.input-error(v-if="errors.has('email')") {{ errors.first('email') }}
            input(v-model.lazy="email", v-validate="email", data-vv-rules="required|email",
            name='email', type='text')
            span.input-value(:class="{ filled : email !== '' }") Email:
          .input-group.full-width
            span.state-text.message-error(v-if="errors.has('message')") {{ errors.first('message') }}
            textarea(v-model="message", v-validate="message", data-vv-rules="required",
            name='message', rows='1', spellcheck='false')
            span.input-value(:class="{ filled : message !== '' }") Bericht:
          .input-group.full-width.send
            button.send-button(:class="{ 'disabled' : errors.has('name') || errors.has('email') || errors.has('message'), 'sending' : SendLoader }",
            value='', type='submit')
              svg(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve")
                path(class="paper-plane-icon" d="M462,54.955L355.371,437.187l-135.92-128.842L353.388,167l-179.53,124.074L50,260.973L462,54.955zM202.992,332.528v124.517l58.738-67.927L202.992,332.528z")
            .message-success(v-if="MessageSent")
              p.state-text Message sent!
</template>

<script>

import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      SendLoader: false,
      MessageSent: false
    }
  },
  methods: {
    ValidateBeforeSubmit: function(fields) {
      this.validator.validateAll().then(success => {
        if (!success) {
          return;
        } else {
          //let email = "sayhiwim@gmail.com"
          //let data = "?subject=" + this.name + "?content=" + this.message + "?source=" + this.email
          this.SendData()
        }
      });
    },
    SendData: function() {
      this.name = ''
      this.email = ''
      this.message = ''
      this.SendLoader = true
      setTimeout(() => {
        this.CleanData()
      }, 1)
      setTimeout(() => {
        this.SendLoader = false
        //this.MessageSent = true
      }, 3000)
    },
    CleanData: function() {
      this.errors.clear()
    }
  }
}
</script>
