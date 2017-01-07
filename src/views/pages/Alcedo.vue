<template lang="jade">
#work-layer
  router-link.return-layer-bg(v-on:click.native='$parent.Hide(false)', to='/')
  .work-bg
    .project-head-wrapper
    .project-wrapper
      .project-intro
        .row
          .project-intro-title.col-12
            h2.title Alcedo Media
        .row
          .project-detail-data.col-12
            ul.work-details
              li
                p.work-class role :
                p.work-attribute branding / web design / front end
              li
                p.work-class typeface :
                p.work-attribute Trade Gothic / Proxima Nova
      .project-items
        .row
          .col-12
            .item
              img.web-shot
        .row
          .col-12
            .item
              img.web-shot
        .row
          .col-12
            .item
              img.web-shot
</template>

<script>
</script>

<style>
</style>
