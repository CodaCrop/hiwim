<template>
  <main id="work-layer">
    <router-link to="/" class="return-layer-bg"></router-link>
    <div class="work-bg">
      <div class="project-wrapper">
        <div class="project-intro">
          <div class="row">
            <div class="col-12">
              <h2 class="title">Title</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <ul class="work-details">
                <li>
                  <p class="work-class">role :</p>
                  <p class="work-attribute">branding / web design / front end</p>
                </li>
                <li>
                  <p class="work-class">typeface :</p>
                  <p class="work-attribute">Trade Gothic / Proxima Nova</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="project-items">

        </div>
      </div>
  </main>
</template>

<script>
</script>

<style>
  #work-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
  }
  .work-bg {
    background: black;
    height: 100%;
    position: relative;
    z-index: 0;
    flex-grow: 1;
  }
  .project-wrapper {
    width: 100%;
  }
  .return-layer-bg {
    height: 100%;
    width: 120px;
    z-index: 1;
  }
</style>
