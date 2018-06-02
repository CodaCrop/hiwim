<template lang="jade">
  .row
    .timeline-gradient
    .event(v-for="client in works")
      .year(v-if="client.year") {{ client.title }}
      .item(v-if="!client.year", :class="{ work : client.work }")
        .info(:class="{ work : client.work, study : !client.work, professional : client.workingfor }")
          router-link(:to='client.route' @click.native='$parent.HideHome(true), $parent.SetPageBtns(), $parent.SetAnimation(0, 400, 250), $parent.CatchScreenPos()', v-if=('client.work'))
            {{ client.title }}
            i
            .date
              span {{ client.date }}
          div(v-else)
            {{ client.title }}
            i
          .date
            span {{ client.date }}
          span {{ client.info }}
        .tags(v-if=('client.work'))
          b(v-for="tags in client.tags") {{ tags }}
</template>

<script>
export default {
  data() {
    return {
      works: [
        {
          project: '/dist/assets/clients/knab.png',
          route: 'knab', title: 'Knab',
          info: 'Software developer',
          date: 'June 2017 - present',
          context: 'Blabla',
          work: true,
          tags: [ 'fintech', 'consultancy', 'front-end', 'back-end' ]
        },
        {
          project: '/dist/assets/clients/brightcubes.png',
          route: 'brightcubes', title: 'Bright Cubes',
          info: 'Software developer consultant',
          date: 'March 2017 - present',
          context: 'Blabla',
          work: true,
          tags: [ 'consultancy', 'software development' ]
        },
        {
          project: '', route: '', title: '2017', info: '', context: '', work: false,
          year: true
        },
        {
          project: '/dist/assets/clients/klm.png',
          route: 'klm', title: 'KLM',
          info: 'Booking data retriever',
          date: 'January 2016',
          context: 'Blabla',
          work: true,
          tags: [ 'design', 'front-end', 'back-end' ]
        },
        {
          project: '/dist/assets/clients/alcedo.png',
          route: 'alcedo-media', title: 'Alcedo Media',
          info: 'News platform',
          date: 'September 2016',
          context: 'Blabla',
          work: true,
          tags: [ 'design', 'front-end', 'back-end', 'testing' ]
        },
        {
          project: '',
          route: '', title: 'Bachelor of Applied Sciences',
          info: 'Afgestudeerd voor CMD aan de Haagse Hogeschool',
          date: 'September 2011 - December 2016',
          context: '',
          work: false
        },
        {
          project: '/dist/assets/clients/ben.png',
          route: 'ben', title: 'Ben',
          info: 'Finance app',
          date: 'April 2016',
          context: 'Blabla',
          work: true,
          tags: [ 'design', 'mobile', 'prototyping', 'ui / ux', 'testing' ]
        },
        {
          project: '', route: '', title: '2016', info: '', context: '', work: false,
          year: true
        },
        {
          project: '/dist/assets/clients/guidion.png',
          route: 'guidion', title: 'Guidion',
          info: 'Social intranet',
          date: 'September 2015',
          context: 'Blabla',
          work: true,
          tags: [ 'design', 'front-end', 'back-end', 'wordpress', 'ui / ux', 'testing' ],
          workingfor: true
        },
        {
          project: '/dist/assets/clients/hhs.png',
          route: 'hhs', title: 'Haagse Hogeschool',
          info: 'Micro finance platform',
          date: 'Mei 2015',
          context: 'Blabla',
          work: true,
          tags: [ 'design', 'front-end', 'ui / ux', 'testing' ],
          workingfor: true
        },
        {
          project: '', route: '', title: '2015', info: '', context: '', work: false,
          year: true
        },
        {
          project: '',
          route: '', title: 'ROC Studie afgerond',
          info: 'Afgestudeerd voor Information Technologies op MBO',
          date: 'Januari 2007 - September 2011',
          context: '',
          work: false
        },
        {
          project: '', route: '', title: '2011', info: '', context: '', work: false,
          year: true
        },
        {
          project: '',
          route: '', title: 'Bureau Blanco',
          info: 'Front-end developer',
          date: 'September 2011 - Juni 2012',
          context: '',
          work: false,
          workingfor: true
        },
        {
          project: '',
          route: '', title: 'Supreme Hosting',
          info: 'Web Developer',
          date: 'September 2008 - Juni 2010',
          context: '',
          work: false,
          workingfor: true
        },
        {
          project: '', route: '', title: '2008', info: '', context: '', work: false,
          year: true
        }
      ]
    }
  },
  methods: {
    ScrollTimeline: function() {

    }
  },
  mounted() {
    window.addEventListener('scroll', this.ScrollTime)
  }
}
</script>

<style>
</style>
