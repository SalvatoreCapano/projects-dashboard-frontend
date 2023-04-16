<script>

// Components
import AppButton from '../../../../components/AppButton.vue';
import AppModal from '../../../../components/AppModal.vue';
import AppLoading from '../../../../components/AppLoading.vue';
import AppSlider from '../../../../components/AppSlider.vue';
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
        AppLoading,
        AppSlider
    },
    data() {
        return {
            store,
            project: null,
            images: [],
            isModalOpen: false
        }
    },
    methods: {
        getProject() {
            axios.get(`http://localhost:8000/api/projects/${this.$route.params.slug}`)
                .then((response) => {
                    this.project = response.data.project;
                    console.log('Project', response.data);
                    this.getImages();
                })
        },
        getImages() {
            axios.get(`http://localhost:8000/api/images/${this.project.id}`)
                .then((response) => {
                    this.images = response.data.images;
                    console.log('Images', response.data);
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
        },
        calcRemainingDays(deadline) {
            const now = new Date();
            const deadlineObj = new Date(deadline);
            const msPerDay = 86400000; // 1000 millisecondi x 60 secondi x 60 minuti x 24 ore

            const result = Math.floor((deadlineObj - now) / msPerDay);

            return Math.abs(result);
        }
    },
    computed: {
        calcTitle() {
            if (this.project) return this.project.title;
        },
        calcStatusLine() {
            if (this.project.status == 'on_hold') return 'width: 0%';
            else if (this.project.status == 'active') return 'width: 50%';
            else if (this.project.status == 'completed') return 'width: 100%';
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
                <div class="row">
                    <div class="card small">
                        <h3 class="cardTitle">gallery</h3>
                        <AppSlider :images="this.images" />
                    </div>

                    <div class="card large">
                        <h3 class="cardTitle">description</h3>
                        <p class="description">{{ (project.description) ?? 'Loading Failed' }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="card smaller status">
                        <h3 class="cardTitle">status</h3>
                        <span class="cardText">{{ (cleanString(project.status)) ?? 'Loading Failed' }}</span>
                        <div class="line">
                            <div class="completed" :style="calcStatusLine"></div>
                        </div>
                    </div>

                    <div class="card smaller">
                        <h3 class="cardTitle">type</h3>
                        <span class="cardText big">{{ (cleanString(project.type.name)) ?? 'Loading Failed' }}</span>
                    </div>

                    <div class="card smaller">
                        <h3 class="cardTitle">team</h3>
                        <span class="cardText big">#{{ (project.team_id) ?? 'Loading Failed' }}</span>
                    </div>

                    <div class="card smaller">
                        <h3 class="cardTitle">deadline</h3>
                        <span class="cardText big">{{ (project.deadline) ?? 'Loading Failed' }}</span>
                        <span class="cardSubText">{{ calcRemainingDays(project.deadline) }} days left</span>
                    </div>

                    <div class="card smaller">
                        <h3 class="cardTitle">created</h3>
                        <span class="cardText big">{{ (cleanDate(project.created_at)) ?? 'Loading Failed' }}</span>
                        <span class="cardSubText">{{ calcRemainingDays(project.created_at) }} days ago</span>
                    </div>

                    <div class="card smaller">
                        <h3 class="cardTitle">last update</h3>
                        <span class="cardText big">{{ (cleanDate(project.updated_at)) ?? 'Loading Failed' }}</span>
                        <span class="cardSubText">{{ calcRemainingDays(project.updated_at) }} days ago</span>
                    </div>
                </div>
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

.row {
    @include flexRowGap (1rem);
    justify-content: flex-start;
    margin-bottom: 1.5rem;
    width: 100%;
    padding: 0 1rem;

    .card {
        @include card (0.5rem, light);

        &.smaller {
            width: calc(100% / 6);
            height: 140px;
            text-align: center;
        }

        &.small {
            width: calc(100% / 3);
            height: 340px;
        }

        &.large {
            width: calc((100% / 3) * 2);
            height: 340px;
        }

        .cardTitle {
            text-transform: capitalize;
            color: $dark-color-one;
        }

        .cardText {
            display: block;
            text-transform: capitalize;
            margin-bottom: 1rem;

            &.big {
                font-size: 2rem;
            }
        }

        .cardSubText {
            color: gray;
        }
    }
}

.projectData {
    margin-bottom: 1.5rem;
}

.line {
    height: 8px;
    border-radius: 3px;
    background-color: $light-color-two;
    overflow: hidden;

    .completed {
        height: 100%;
        background: linear-gradient(45deg, $color-two-dark, $color-two-light);
    }
}

.actions {
    @include flexRowGap(1rem);
    justify-content: flex-start;
}
</style>