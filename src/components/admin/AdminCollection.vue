<template>
  <div class="collection">
    <router-link
        :to="`/admin/userlist`"
        :class="{active: this.$route.params.name==='userlist' || this.$route.fullPath.includes('/admin/user')}"
        class="collection-item"
    > Пользователи системы
    </router-link>
    <router-link
        :to="`/admin/personal`"
        :class="{active: this.$route.params.name==='personal'}"
        class="collection-item"
    >
      Сотрудники
    </router-link>
    <router-link
        :to="`/admin/programs`"
        :class="{active: this.$route.params.name==='programs'}"
        class="collection-item"
    >
      Программы
    </router-link>
    <router-link
        :to="`/admin/bar`"
        :class="{active: this.$route.params.name==='bar'}"
        class="collection-item"
    >
      Бар
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.collection-item.active {
  background: #2b2b4d;
}

.collection a.collection-item {
  color: #2b2b4d;

  &.active {
    color: white;
  }
}
</style>