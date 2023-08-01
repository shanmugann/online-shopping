<template>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <svg  width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Online Shopping</a>
            <button @click="()=> { showMenu = !showMenu}"  class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="showMenu ? 'cutom-collapse': ''" class="collapse navbar-collapse " id="navbarNavDropdown">
                <ul class="navbar-nav ml-auto">
                    <li class="mr-6 nav-item active">
                        <router-link class="nav-link" :to="{name:'product'}">Purchase</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'order'}">Re-Stock</router-link>                        
                    </li> -->
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'orderForm'}">Order</router-link>                        
                    </li>
                </ul>
            </div>
        </nav>
</template>

<script>

export default {
    data() {
        return {
            showMenu: false
        }
    }
}

</script>