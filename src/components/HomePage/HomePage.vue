<template>
    <div>
        <h1>Welcome</h1>
        <div class="button-container">
        <ButtonMenu v-for="(button, index) in buttons" 
            :key="index" 
            :color="button.color"        
            :onClick="() => onRedirect(button.to)"
        >   {{ button.label }}
        </ButtonMenu>
        </div>
    </div>
</template>
  
<script setup>
    import { buttons } from './buttons.ts';
    import { ButtonMenu } from './styles.ts';
    import { useRouter } from "vue-router";
    const routerManager = useRouter();
    console.log(routerManager.getRoutes())
    const onRedirect = (name)=> {
        routerManager.push({ name });
    };
</script>

<style scoped>
    .button-container {
    display: flex;
    flex-wrap: wrap;
    }
</style>