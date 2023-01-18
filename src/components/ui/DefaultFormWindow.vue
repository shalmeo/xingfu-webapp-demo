<template>
  <section class="window">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-8 col-xl-6">
          <div class="card rounded-3">
            <div class="card-body p-4 p-md-5">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.window {
  min-height: 100vh;
  background-color: #8fc4b7;
}
</style>
