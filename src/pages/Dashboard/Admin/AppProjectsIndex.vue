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
        cleanString(string) {
            string = string.replace('_', ' ');
            string = string.replace('.', '');
            return string;
        },
        cleanDate(string) {
            string = string.substring(0, 10);
            return string;
        },
        showProject(slug) {
            router.push(`/admin/projects/${slug}`, {
                slug: slug
            })
        }
    },
    mounted() {
        document.title = 'Projects';

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
                    <h1 class="mainTitle">Projects</h1>
                    <AppLinkButton :to="'/admin/projects/create'" :label="'add a project'" :type="'solid'" :icon="'plus'" />
                </div>
                <div class="cardBody">
                    <table v-if="projects">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>title</th>
                                <th>status</th>
                                <th>type</th>
                                <th>team</th>
                                <th>deadline</th>
                                <th>created at</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in projects" @click="showProject(project.slug)">
                                <td v-if="project.id"><strong>{{ project.id }}</strong></td>
                                <td v-else>-</td>

                                <td v-if="project.title">{{ cleanString(project.title) }}</td>
                                <td v-else>-</td>

                                <td v-if="project.status">{{ cleanString(project.status) }}</td>
                                <td v-else>-</td>

                                <td v-if="project.type">{{ cleanString(project.type.name) }}</td>
                                <td v-else>-</td>

                                <td v-if="project.team_id">{{ project.team_id }}</td>
                                <td v-else>-</td>

                                <td v-if="project.deadline">{{ cleanDate(project.deadline) }}</td>
                                <td v-else>-</td>

                                <td v-if="project.created_at">{{ cleanDate(project.created_at) }}</td>
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

table {
    border-collapse: collapse;
    width: 100%;
}

thead {
    th {
        text-align: left;
        text-transform: capitalize;
    }
}

tbody {
    tr {

        td {
            padding: 5px 0;
            text-transform: capitalize;
        }

        &:hover {
            background-color: $light-color-two;
            cursor: pointer;
        }
    }
}

.card {

    .cardHeader {
        @include flexRowSpaceBtwn;
        margin-bottom: 0.5rem;
        // border-bottom: 1px solid $dark-color-three;

        .cardTitle {
            color: $dark-color-one;
            font-size: 1.75rem;
            user-select: none;
        }
    }
    .cardBody {
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