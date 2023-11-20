<template>
    <transition name="fade">
      <div class="modal-mask">
        <div class="lg:tw-w-5/12 md:tw-w-3/5 tw-w-11/12 tw-bg-primary tw-p-6 tw-rounded-xl">
          <header class="tw-mb-6 tw-flex tw-justify-between tw-items-center">
            <slot name="header"></slot>
            <span
              class="tw-flex tw-justify-center tw-items-center  tw-p-1 "
              role="button"
              @click="$emit('close')"
            >
              <i-icon icon="ri:close-line" width="25px" class="tw-text-white" />
            </span>
          </header>
          <main class="">
            <slot name="body"></slot>
          </main>
          <footer>
            <slot name="actions"></slot>
          </footer>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  /* MODALS  */
  .modal-mask {
    background-color: #000000c6;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 10;
    width: 100%;
    display: grid;
    display: -ms-grid;
    display: -moz-grid;
    place-items: center;
    /* visibility: ; */
  }
  
  .modal-content {
    /* width: 40%;
    padding: 30px 45px;
    box-shadow: var(--elevation-1);
    border: none;
    border-radius: 10px; */
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .fade-enter-active {
    transition: all 0.6s ease;
  }
  .fade-leave-active {
    transition: all 0.3s cubic-bezier(0.3, 0.5, 0.8, 1);
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateY(15px);
    opacity: 0;
  }
  .main-site-map {
    max-height: 500px;
    overflow-y: auto;
  }
  </style>