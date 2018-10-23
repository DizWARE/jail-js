<template>
  <v-app>
    <app-scaffold>
      <v-toolbar app slot="nav">
        <v-toolbar-title class="headline text-uppercase">
          <span>Example</span>
          <span class="font-weight-light">Application</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn><span class="mr-2">Do Something</span></v-btn>
        <v-btn><span class="mr-2">Be Something</span></v-btn>
        <v-btn><span class="mr-2">Love Something</span></v-btn>
      </v-toolbar>
      <div slot="side" style="background-color: green;"></div>
      <v-content slot="body">
        <HelloWorld/>
      </v-content>
      <div slot="footer" style="background-color: black;">
        <flex-box style="color: white;" flex-direction="row-reverse" justify-content="space-evenly" align-items="center">
          <div>Terms of Use</div>
          <div>Farms of Ants</div>
          <div>Towers of Babel</div>
          <div>Fists of Fury</div>
        </flex-box>
      </div>
    </app-scaffold>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style lang="scss">
.v-toolbar--fixed {
  position: relative;
}
</style>
