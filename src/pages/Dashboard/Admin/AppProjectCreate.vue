<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';
import AppDashboardHeader from '../../../components/AppDashboardHeader.vue';
// import AppLinkButton from '../../../components/AppLinkButton.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppProjectCreate',
    components: {
        AppSidebar,
        AppDashboardHeader,
        // AppLinkButton
    },
    data() {
        return {
            store,
            router,
            // projects: null
            form: {
                title: null,
                description: null
            }
        }
    },
    methods: {
        addProject() {

            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF', response);

                    axios.post('http://localhost:8000/api/projects', {
                        title: this.form.title,
                        description: this.form.description,
                    })
                        .then((response) => {
                            // this.projects = response.data.projects;
                            console.log('Added Project', response.data);
                        })


                })
                .catch((response) => {
                    console.log('Errore ottenimento Cookie', response);
                    this.store.errors = response.data;
                })


            // axios.post('http://localhost:8000/api/projects', {
            //     title: this.form.title,
            //     description: this.form.description,
            // })
            //     .then((response) => {
            //         // this.projects = response.data.projects;
            //         console.log('Added Project', response.data);
            //     })
        },
    },
    mounted() {
        setTimeout(function () {
            store.clear();
        }, 2);
    }
}
</script>

<template>
    <div class="container" v-if="store.user">
        <AppSidebar />

        <main>
            <AppDashboardHeader />
            <form @submit.prevent="addProject()">
                <label for="title">title</label>
                <input type="text" name="title" placeholder="title" v-model="form.title" id="title">

                <label for="description">description</label>
                <input type="text" name="description" placeholder="description" v-model="form.description" id="description">
                <button type="submit">Add</button>
            </form>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../style/variables.scss' as *;
@use '../../../style/mixin.scss' as *;

.container {
    height: 100%;

    @include flexRowGap (1rem);

    main {
        @include mainContent;
    }
}

.card {
    border: 1px solid black;

    .cardHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $dark-color-three;

        background-color: $light-color-two;

        .cardTitle {
            color: $dark-color-one;
        }
    }

    .cardBody {
        border: 5px solid lightblue;

        .row {
            @include flexRowGap (0.5rem);

            >* {
                height: 36px;
                width: 36px;
            }
        }
    }
}
</style>