<template>
  <div v-cloak class="home">
    <div class="loading" v-if="loading">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
        <path opacity="0.2" fill="#4aae9b" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
         s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
         c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
        <path fill="#4aae9b" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
         C22.32,8.481,24.301,9.057,26.013,10.047z">
         <animateTransform attributeType="xml"
           attributeName="transform"
           type="rotate"
           from="0 20 20"
           to="360 20 20"
           dur="0.5s"
           repeatCount="indefinite"/>
         </path>
        </svg>
    </div>

    <div class="banner">
      <div class="mask"></div>
      <img v-bind:src="this.bannerimage" alt="banner">
      <h1>Kaido Hussar testproject</h1>
    </div>


    <div class="items-wrapper">
        <div v-on:click="getlinkdata($event)" class="item-wrapper" v-for="item in items">
            <img v-if="item.imedia != 'no-media'" v-bind:src="item.imedia" />
            <img v-else v-bind:src="noimageLink" />
            <p @click="showModal" v-bind:data-link="item.ilink" class="item-heading"> {{ item.ititle }} </p>
            <p class="item-description"> {{item.idescription }} </p>
        </div>
    </div>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
    />

  </div>


</template>

<script>
  import axios from 'axios';
  import modal from '../components/modal.vue';


  const port = process.env.PORT || 1234;
  const API_URL = 'https://xml-uptime-test.herokuapp.com';

  export default {
    name: 'home',
    components: {
      modal,
    },
    data () {
      return {
        loading: true,
        modalloading: false,
        bannerimage: './src/assets/nature.jpeg',
        isModalVisible: false,
        posts: '',
        moddata: '',
        noimageLink: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
        items: [],
        apikey: '',
        postcontent: [],
        errors: []
      }
    },
    mounted: function () {
      let config = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/rss+xml',
          }
      }

      axios.get('https://flipboard.com/@raimoseero/feed-nii8kd0sz?rss', config)
      .then(response => {

        this.posts = response;
        this.loading = false;

        const newdata = response.data;

        let text, parser, xmlDoc;

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(newdata,"text/xml");

        const xmlres = xmlDoc.getElementsByTagName("item");

        let i;
        for (i = 0; i < xmlres.length; i++) {
            let myArray = [];

            let nodeItem = xmlres.item(i);

            let nodetitleMain = nodeItem.getElementsByTagName("title");
            let nodeTitle = nodetitleMain[0].innerHTML;

            let nodeLinkMain = nodeItem.getElementsByTagName("link");
            let nodeLink = nodeLinkMain[0].innerHTML;

            let nodedescMain = nodeItem.getElementsByTagName("description");
            let nodeDescription = nodedescMain[0].innerHTML;
            let NodeDescClean = nodeDescription.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/(<([^>]+)>)/ig, " ").replace("/[^[:alnum:][:space:]]/u", '');


            let nodemediaMain = nodeItem.getElementsByTagName("media:content");
            if ((nodemediaMain).length >= 1) {
              let nodeMedia = nodemediaMain[0].getAttribute("url");;
              myArray.push(nodeMedia);
              this.items.push({
                  ititle: nodeTitle,
                  idescription: NodeDescClean,
                  ilink: nodeLink,
                  imedia: nodeMedia
              });
            } else {
              this.items.push({
                  ititle: nodeTitle,
                  idescription: NodeDescClean,
                  ilink: nodeLink,
                  imedia: 'no-media'
              });
            }
        }
      })
      .catch(e => {
     this.errors.push(e)
     this.loading = false;
     })

    },
    created: function () {
      axios.get(API_URL)
      .then(response => {
        this.apikey = response.data.apikey;
      })
    },
    methods: {
      getlinkdata: function () {
        let config = {
          'headers': {
              'x-api-key': this.apikey,
              'Content-Type': 'application/json',
            }
        }

        let datalink = event.target.attributes.getNamedItem('data-link').value;
        axios.get('https://mercury.postlight.com/parser?url='+datalink+'', config)
        .then(
          response => {

          this.modalloading = false;
          this.postcontent = response;
        })
        .catch(e => {
       this.errors.push(e)
       this.loading = false;
       })
     },
     showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
        setTimeout(() => this.modalloading = true, 500);
      }
    }

  };


</script>

<style lang="scss">
[v-cloak] { display: none; }
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
.banner {
  height: 250px;
  position: relative;
  margin-bottom: 50px;
  h1 {
    position: absolute;
    text-align: left;
    bottom: 60px;
    left: 80px;
    color: #FFFFFF;
    z-index: 9;
    font-family: 'Lato';
    @media (max-width: 900px) {
      font-size: 30px;
      text-align: center;
      position: relative;
      z-index: 9;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: auto;
      left: auto;
      width: 100%;
      height: 100%;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9;
  }
  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }
}
.items-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1400px;
  justify-content: center;
  margin: 0 auto;
  .item-wrapper {
    max-width: 420px;
    padding: 15px;
    margin: 15px;
    text-align: left;
    overflow: hidden;
    border-radius: 1px;
    background-color: #fafafa;
    box-shadow: 0 2px 5px -3px rgba(0,0,0,.5);
    .item-heading {
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
    img {
      float: right;
      margin-right: 1em;
      max-width: 150px;
      margin: 0px 0px 10px 10px;
      max-height: 100px;
      border-radius: 1px;
    }
  }
}

</style>
