
<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">

        <div class="modal-loading-wrapper">
          <div v-if="this.$parent.modalloading" class="modal-loading">
            <transition name="modal-fade">
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
          </transition>
          </div>
        </div>


      <div class="modal-header">
        <slot v-cloak name="header">
          <h1>{{this.$parent.postcontent.data.title}}</h1>

          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>
        </slot>
      </div>
      <section class="modal-body">

        <div class="modal-data">
           <div v-html="this.$parent.postcontent.data.content"></div>
        </div>

       </section>
       <footer class="modal-footer">
          <slot name="footer">

            <button
              type="button"
              class="btn-green"
              @click="close"
            >
              Close me!
          </button>
        </slot>
      </footer>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss">

  .modal-loading {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background: #FFF;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
   opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
   transition: opacity .5s ease;
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    max-width: 900px;
    max-height: 650px;
    top: 50px;
    justify-content: center;
    margin: 0 auto;
    @media (max-width: 600px) {
          top: 10px;
    }
  }

  .modal-data {
    overflow: auto;
    max-height: 485px;
    p {
      text-align: left;
    }
    ul {
      text-align: left;
      padding: 15px;
    }
    img {
      width: 100%;
    }
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
    h1 {
      font-size: 22px;
      padding: 0px 30px;
    }
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    position: absolute;
    right: 5px;
    top: 0px;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
