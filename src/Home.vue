<template>
  <main id="default-layer" class="container-fluid">
    <div id="intro-section" class="section">
      <div class="row">
        <div class="col-12">
          <div class="intro-text">
            <h1 class="title">hi I'm Wim — designer & coder</h1>
            <h2 class="subtitle">I love creating useful and beautiful things for people<br>see my latest <a href="#work-section" class="primary-link">work</a></h2>
          </div>
        </div>
      </div>
    </div>
    <div id="work-section" class="section">
      <div class="row">
        <div class="col-12">
          <h2 class="section-title">my work</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-4 project-item">
          <router-link to="ben">
            <div class="image">project 1</div>
            <h3 class="title">Ben</h3>
          </router-link>
        </div>
        <div class="col-4 project-item">
          <router-link to="guidion">
            <div class="image">project 2</div>
            <h3 class="title">Guidion</h3>
          </router-link>
        </div>
        <div class="col-4 project-item">
          <router-link to="google-chrome">
            <div class="image">project 3</div>
            <h3 class="title">Google Chrome</h3>
          </router-link>
        </div>
        <div class="col-4 project-item">
          <router-link to="hhs">
            <div class="image">project 4</div>
            <h3 class="title">Haagse Hogeschool</h3>
          </router-link>
        </div>
        <div class="col-4 project-item">
          <router-link to="klm">
            <div class="image">project 5</div>
            <h3 class="title">KLM</h3>
          </router-link>
        </div>
        <div class="col-4 project-item">
          <router-link to="alcedo-media">
            <div class="image">project 6</div>
            <h3 class="title">Alcedo Media</h3>
          </router-link>
        </div>
        <div class="col-4 project-item">
          <router-link to="museon">
            <div class="image">project 6</div>
            <h3 class="title">Museon</h3>
          </router-link>
        </div>
      </div>
    </div>
    <div id="about-section" class="section">
      <div class="row">
        <div class="col-12">
          <h2 class="section-title">me</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-5 about-img"><img src="#"></div>
        <div class="col-7 about-text">
          <p class="complementary-text">
            I'm a 27 year old UX designer and Front-end developer. I'm a bachelor of applied sciences and studied
            UX, UI and front-end languages such as HTML, CSS, Javascript.
          </p>
        </div>
      </div>
    </div>
    <div id="contact-section" class="section">
      <div class="row">
        <div class="col-12">
          <h2 class="section-title">let's talk</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-5 follow-text">
          <p class="title">follow me on —</p>
          <p class="complementary-text"><a href="/" target="_blank" class="secundary-link">dribble,</a><a href="/" target="_blank" class="secundary-link">&nbsp;github,</a><a href="/" target="_blank" class="secundary-link">&nbsp;kodity,</a><a href="/" target="_blank" class="secundary-link">&nbsp;facebook</a></p>
        </div>
        <div class="col-7 contact-form">
          <p class="title">say hi —</p>
          <p class="complementary-text">
            by email : say@hiwim.com<br>
            or write me a message
          </p>
          <form name="contact-form" method="post" id="contact-form">
            <div class="input-group">
              <label for="name" id="name">name:</label>
              <input name="name" type="text">
            </div>
            <div class="input-group">
              <label for="email" id="email">email:</label>
              <input name="email" type="text">
            </div>
            <div class="input-group">
              <label for="message" id="message">message:</label>
              <textarea name="message" rows="4" spellcheck="false"></textarea>
            </div>
            <div class="input-seperate"></div>
            <button value="" type="submit" class="button-icon send-button"></button>
            <div class="message-sent"></div>
          </form>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
</script>

<style>

</style>
