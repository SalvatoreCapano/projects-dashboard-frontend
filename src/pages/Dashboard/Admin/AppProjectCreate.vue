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
                description: null,
                deadline: null,
                typeId: null,
                teamId: null,
            },
            types: null,
            teams: null
        }
    },
    methods: {
        handleCreateProject() {

            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF', response);

                    this.postData();
                })
                .catch((response) => {
                    console.log('Errore ottenimento Cookie', response);
                    this.store.errors = response.data;
                })
        },
        postData() {
            axios.post('http://localhost:8000/api/projects', {
                title: this.form.title,
                description: this.form.description,
                deadline: this.form.deadline,
                type_id: this.form.typeId,
                team_id: this.form.teamId
            })
                .then((response) => {
                    console.log('Added Project', response.data);
                })
        },
        getFormData() {
            axios.get('http://localhost:8000/api/projects/create')
                .then((response) => {
                    console.log('Form data', response.data);
                    this.types = response.data.types;
                    this.teams = response.data.teams;
                })
        },
    },
    mounted() {

        this.getFormData();

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
            <form @submit.prevent="handleCreateProject()">
                <div>
                    <label for="title">title</label>
                    <input type="text" name="title" placeholder="title" v-model="form.title" id="title">
                </div>

                <div>
                    <label for="description">description</label>
                    <input type="text" name="description" placeholder="description" v-model="form.description"
                        id="description">
                </div>

                <div>
                    <label for="deadline">deadline</label>
                    <input type="date" name="deadline" id="deadline" v-model="form.deadline">
                </div>

                <div>
                    <label for="type"></label>
                    <select name="type_id" id="type" v-model="form.typeId">
                        <option :value="item.id" v-for="item in this.types">{{ item.name }}</option>
                    </select>
                </div>

                <div>
                    <label for="team"></label>
                    <select name="team_id" id="team" v-model="form.teamId">
                        <option :value="item.id" v-for="item in this.teams">team #{{ item.id }}</option>
                    </select>
                </div>

                <button type="submit">Add</button>
            </form>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../style/variables.scss' as *;
@use '../../../style/mixin.scss' as *;

// select {
//     text-transform: capitalize;
//     background-color: red;
// }

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