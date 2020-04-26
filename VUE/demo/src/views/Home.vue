<template>
  <div class="home">
    <ul>
      <li v-for="(aItem, aIndex) in routes" :key="aIndex">
        <router-link class="link-btn" :to="aItem.path">{{aItem.name}}</router-link>

        <ul v-if="aItem.children">
          <li v-for="(bItem, bIndex) in aItem.children" :key="bIndex">
            <router-link class="link-btn" style="padding-left: 20px;" :to="bItem.path">{{bItem.name}}</router-link>
          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>

<script>
import routes from '@/router/router.js'

export default {
  name: 'Home',
  data () {
  	return {
  		routes: routes,
  	}
  }
}
</script>
<style lang="scss" scoped>
.home {
	padding: 30px;

  .link-btn {
    margin-bottom: 10px;
    line-height: 30px;

    &:hover {
      color: #409EFF;
    }
  }
}  
</style>

