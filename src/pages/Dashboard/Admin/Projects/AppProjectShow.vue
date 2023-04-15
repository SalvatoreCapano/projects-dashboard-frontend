<script>

// Components
import AppButton from '../../../../components/AppButton.vue';
import AppModal from '../../../../components/AppModal.vue';
import AppLoading from '../../../../components/AppLoading.vue';
import AppDashboardLayout from '../../AppDashboardLayout.vue';

// Utilities
import { store } from '../../../../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppProjectShow',
    components: {
        AppDashboardLayout,
        AppButton,
        AppModal,
        AppLoading
    },
    data() {
        return {
            store,
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
    computed: {
        calcTitle() {
            if (this.project) return this.project.title;
        }
    },
    mounted() {
        document.title = 'Projects | Show';
        this.getProject();

        setTimeout(function () {
            store.clear();
        }, 2);
    }
}
</script>

<template>
    <AppDashboardLayout :title="calcTitle" :backTo="'/admin/projects'">
        <div v-if="project">
            <div class="projectData">
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
                <p>
                    <strong>Updated At: </strong>
                    {{ (cleanDate(project.updated_at)) ?? 'Loading Failed' }}
                </p>
            </div>

            <div class="actions">
                <AppButton :to="`/admin/project/edit/${project.slug}`" :label="'edit'" :type="'solid'" :icon="'pen'"
                    :palette="'warning'" />
                <AppButton :action="openModal" :label="'delete'" :type="'solid'" :icon="'trash-can'" :palette="'danger'" />
            </div>
        </div>

        <AppLoading v-else />
    </AppDashboardLayout>

    <AppModal v-if="isModalOpen" :title="'Deleting project...'"
        :message="`Are you sure you want to delete ${project.title}?`" @closeModalEvent="closeModal"
        :action="deleteProject" />
</template>

<style lang="scss" scoped>
@use '../../../../style/variables.scss' as *;
@use '../../../../style/mixin.scss' as *;

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