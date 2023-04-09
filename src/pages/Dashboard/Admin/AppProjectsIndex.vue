<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';
import AppDashboardHeader from '../../../components/AppDashboardHeader.vue';
import AppLinkButton from '../../../components/AppLinkButton.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppProjectsIndex',
    components: {
        AppSidebar,
        AppDashboardHeader,
        AppLinkButton
    },
    data() {
        return {
            store,
            router,
            projects: null
        }
    },
    methods: {
        getProjects() {
            axios.get('http://localhost:8000/api/projects')
                .then((response) => {
                    this.projects = response.data.projects;
                    console.log('Projects', response.data.projects);
                })
        },
    },
    mounted() {
        setTimeout(function () {
            store.clear();
        }, 2);

        this.getProjects();
    }
}
</script>

<template>
    <div class="container" v-if="store.user">
        <AppSidebar />


        <main>
            <AppDashboardHeader />
            <div class="card">
                <div class="cardHeader">
                    <h1 class="cardTitle">Projects</h1>
                    <AppLinkButton :to="'/admin/projects/create'" :label="'add a project'" :type="'solid'" :icon="'plus'" />
                </div>
                <div class="cardBody">
                    <table v-if="projects">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in projects">
                                <td v-if="project.id">{{ project.id }}</td>
                                <td v-else>-</td>
                                <td v-if="project.title">{{ project.title }}</td>
                                <td v-else>-</td>
                                <td v-if="project.description" class="description">{{ project.description }}</td>
                                <td v-else>-</td>
                                <td>
                                    <div class="row">
                                        <!-- <AppLinkButton :to="'/projects/show'" :type="'solid'" :icon="'eye'"/> -->
                                        <!-- <AppLinkButton :to="'/projects/edit'" :type="'solid'" :icon="'pen'" /> -->
                                        <!-- <AppLinkButton :to="'/projects/delete'" :type="'solid'" :icon="'trash-can'" /> -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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

.description {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 200px;
    height: 1.2em;
    white-space: nowrap;
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