<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';
import AppDashboardHeader from '../../../components/AppDashboardHeader.vue';
import AppButton from '../../../components/AppButton.vue';
import AppLoading from '../../../components/AppLoading.vue';
import AppDashboardLayout from '../AppDashboardLayout.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppProjectsIndex',
    components: {
        AppDashboardLayout,
        AppSidebar,
        AppDashboardHeader,
        AppButton,
        AppLoading
    },
    data() {
        return {
            store,
            router,
            projects: null,
            visibleProjects: [],
            titleSort: false
        }
    },
    methods: {
        getProjects() {
            axios.get('http://localhost:8000/api/projects')
                .then((response) => {
                    this.projects = response.data.projects;
                    this.visibleProjects = response.data.projects;
                    // console.log('Projects', response.data.projects);
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
        },
        filterSearch() {
            this.visibleProjects = [];
            this.projects.forEach(project => {
                const title = project.title.toLowerCase();
                if (title.includes(store.searchQuery.toLowerCase())) {
                    this.visibleProjects.push(project);
                }
            });
        },
        // toggleTitleSort() {
        //     if (this.titleSort == true) {
        //         this.visibleProjects = null;
        //         // this.visibleProjects = this.projects;
        //         this.visibleProjects = this.projects;
        //         console.log('Not sorted', this.visibleProjects);
        //         console.log('Not sorted', this.projects);
        //         this.titleSort = false;
        //     }
        //     else {
        //         this.visibleProjects.sort(function (a, b) {
        //             const titleA = a.title.toLowerCase();
        //             const titleB = b.title.toLowerCase();
        //             if (titleA < titleB) return -1;
        //             if (titleA > titleB) return 1;
        //             return 0;
        //         });
        //         this.titleSort = true;
        //     }
        // }
    },
    mounted() {
        document.title = 'Projects';
        this.getProjects();

        setTimeout(function () {
            store.clear();
        }, 2);
    }
}
</script>

<template>
    <AppDashboardLayout :hasSearch="true" @searchEvent="filterSearch">
        <div class="card">
            <div class="cardHeader">
                <h1 class="mainTitle">projects</h1>
                <AppButton :to="'/admin/projects/create'" :label="'add a project'" :type="'solid'" :palette="'primary'"
                    :icon="'plus'" />
            </div>
            <div class="cardBody">
                <table v-if="visibleProjects.length > 0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>title</th>
                            <th>status</th>
                            <th>type</th>
                            <th>team</th>
                            <th>deadline</th>
                            <th>created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="project in visibleProjects" @click="showProject(project.slug)">
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
                        </tr>
                    </tbody>
                </table>

                <AppLoading v-else-if="visibleProjects.length == 0 && projects == null" />

                <div class="pageMessage" v-else>
                    No project found
                </div>

            </div>
        </div>
    </AppDashboardLayout>
</template>

<style lang="scss" scoped>
@use '../../../style/variables.scss' as *;
@use '../../../style/mixin.scss' as *;

table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        text-align: left;
        text-transform: capitalize;
        padding: 5px 3px;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:first-child,
        &:nth-child(5) {
            width: 72px !important;
        }

        &:not(:nth-child(2)) {
            width: 12%;
        }
    }

    tbody tr {
        td {
            position: relative;
            z-index: 1;
            cursor: pointer;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: -1;
            }

            &:first-child {
                border-top-left-radius: $small-border-radius;
                border-bottom-left-radius: $small-border-radius;
            }

            &:last-child {
                border-top-right-radius: $small-border-radius;
                border-bottom-right-radius: $small-border-radius;
            }
        }

        &:hover {
            td::before {
                background-color: $light-color-two;
                cursor: pointer;
            }
        }
    }
}

.card {
    .cardHeader {
        @include flexRowSpaceBtwn;
        margin-bottom: 0.5rem;
    }

    .cardBody {
        min-height: 150px;
    }
}
</style>