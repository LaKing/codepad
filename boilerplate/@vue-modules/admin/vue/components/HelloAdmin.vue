<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Admin pages of this project.<br>
      check out the about admin modules
      <a href="/README.html" target="_blank" rel="noopener">README</a>.
    </p>
    
  </div>
</template>

<script>
    export default {
        name: 'HelloAdmin',
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #22C;
    }
</style>