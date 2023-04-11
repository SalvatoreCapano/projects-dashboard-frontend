<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';
import AppDashboardHeader from '../../../components/AppDashboardHeader.vue';
import AppButton from '../../../components/AppButton.vue';
import AppModal from '../../../components/AppModal.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppProjectShow',
    components: {
        AppSidebar,
        AppDashboardHeader,
        AppButton,
        AppModal
    },
    data() {
        return {
            store,
            router,
            project: null,
            isModalOpen: false
        }
    },
    methods: {
        getProject() {
            axios.get(`http://localhost:8000/api/projects/${this.$route.params.slug}`)
                .then((response) => {
                    this.project = response.data.project;
                    console.log('Project', response.data);
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
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        deleteProject() {
            axios.delete(`http://localhost:8000/api/projects/${this.project.id}`)
                .then((response) => {
                    console.log('Project Deleted');
                    this.$router.push('/admin/projects');
                })
        }
    },
    mounted() {
        document.title = 'Projects | Show';

        setTimeout(function () {
            store.clear();
        }, 2);

        this.getProject();
    }
}
</script>

<template>
    <div class="container" v-if="store.user">
        <AppSidebar />

        <main>
            <AppDashboardHeader />

            <div class="pageBack">
                <router-link :to="'/admin/projects'" class="customLink">
                    <font-awesome-icon :icon="'fa-solid fa-chevron-left'" class="icon"/>
                    Back
                </router-link>
            </div>

            <div class="projectData" v-if="project">
                <h1 class="mainTitle">{{ (project.title) ?? 'Loading Failed' }}</h1>
                <p>
                    <strong>Slug: </strong>
                    {{ (project.slug) ?? 'Loading Failed' }}
                </p>
                <p>
                    <strong>Description: </strong>
                    {{ (project.description) ?? 'Loading Failed' }}
                </p>
                <p class="capitalize">
                    <strong>Status: </strong>
                    {{ (cleanString(project.status)) ?? 'Loading Failed' }}
                </p>
                <p>
                    <strong>Deadline: </strong>
                    {{ (project.deadline) ?? 'Loading Failed' }}
                </p>
                <p class="capitalize">
                    <strong>Type: </strong>
                    {{ (cleanString(project.type.name)) ?? 'Loading Failed' }}
                </p>
                <p>
                    <strong>Team ID: </strong>
                    {{ (project.team_id) ?? 'Loading Failed' }}
                </p>
                <p>
                    <strong>Created At: </strong>
                    {{ (cleanDate(project.created_at)) ?? 'Loading Failed' }}
                </p>
            </div>

            <div class="actions" v-if="project">
                <AppButton :to="`/admin/project/edit/${project.slug}`" :label="'edit'" :type="'solid'" :icon="'pen'" :palette="'warning'" />
                <AppButton :action="openModal" :label="'delete'" :type="'solid'" :icon="'trash-can'" :palette="'danger'" />
            </div>

        </main>
    </div>

    <AppModal v-if="isModalOpen" :title="'Deleting project...'"
        :message="`Are you sure you want to delete ${project.title}?`" @closeModalEvent="closeModal"
        :action="deleteProject" />
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

.projectData {
    margin-bottom: 1.5rem;
}

.description {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 200px;
    height: 1.2em;
    white-space: nowrap;
}

.actions {
    @include flexRowGap(1rem);
    justify-content: flex-start;
}

table {
    border-collapse: collapse;

    tbody {
        tr {
            &:hover {
                background-color: $light-color-two;
            }
        }
    }
}
</style>