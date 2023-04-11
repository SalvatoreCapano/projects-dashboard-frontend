<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';
import AppDashboardHeader from '../../../components/AppDashboardHeader.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppProjectEdit',
    components: {
        AppSidebar,
        AppDashboardHeader,
    },
    data() {
        return {
            store,
            router,
            form: {
                title: null,
                description: null,
                deadline: null,
                typeId: '',
                teamId: '',
            },
            types: null,
            teams: null,
            project: null
        }
    },
    methods: {
        getProject() {
            axios.get(`http://localhost:8000/api/projects/${this.$route.params.slug}`)
                .then((response) => {
                    console.log('Project to Edit', response.data.project);
                    this.project = response.data.project;

                    this.form.title = this.project.title;
                    this.form.description = this.project.description;
                    this.form.deadline = this.project.deadline;
                    this.form.typeId = this.project.type_id;
                    this.form.teamId = this.project.team_id;
                })
        },

        handleEditProject() {
            // Front End Validation
            console.log('Validating Edit Project data...');
            this.validateData();
        },
        validateData() {
            let titleInput = document.getElementById('title');
            let deadlineInput = document.getElementById('deadline');
            let typeInput = document.getElementById('type');
            let teamInput = document.getElementById('team');

            // Reset Form Validation
            this.store.errors = [];
            titleInput.classList.remove('invalid');
            deadlineInput.classList.remove('invalid');
            typeInput.classList.remove('invalid');
            teamInput.classList.remove('invalid');

            // Title Length
            if (titleInput.value.length == 0) {
                this.store.errors.push({
                    message: 'title field must be filled'
                });
                titleInput.classList.add('invalid');
            }
            else if (titleInput.value.length < 5) {
                this.store.errors.push({
                    message: 'title field must be longer than 5 characters'
                });
                titleInput.classList.add('invalid');
            }

            // Deadline Validation
            const [year, month, day] = deadlineInput.value.split('-');
            const now = new Date();

            if (deadlineInput.value == '' || deadlineInput.value == null) {
                this.store.errors.push({
                    message: 'you have to set a deadline'
                });
                deadlineInput.classList.add('invalid');
            }
            else {
                if (year < now.getFullYear()) {
                    this.store.errors.push({
                        message: 'you cannot set a past year as a deadline'
                    });
                    deadlineInput.classList.add('invalid');
                }
                if (month < 1 || month > 12) {
                    this.store.errors.push({
                        message: 'months must be between 1 and 12'
                    });
                    deadlineInput.classList.add('invalid');
                }
                if (day < 1 || day > 31) {
                    this.store.errors.push({
                        message: 'days must be between 1 and 31'
                    });
                    deadlineInput.classList.add('invalid');
                }
                if ((year <= now.getFullYear()) && (month <= (now.getMonth() + 1)) && (day <= now.getDate())) {
                    this.store.errors.push({
                        message: 'you cannot set a deadline today or in the past'
                    });
                    deadlineInput.classList.add('invalid');
                }
            }

            // Type Validation
            let typeError = false;
            this.types.every(type => {
                if (type.id == typeInput.value) {
                    typeError = false;
                    return false;
                }
                else {
                    typeError = true;
                    return true;
                }
            })

            if (typeError) {
                typeInput.classList.add('invalid');
                this.store.errors.push({
                    message: 'invalid type value'
                });
            }

            // Team Validation
            let teamError = false;
            this.teams.every(team => {
                if (team.id == teamInput.value) {
                    teamError = false;
                    return false;
                }
                else {
                    teamError = true;
                    return true;
                }
            })

            if (teamError) {
                teamInput.classList.add('invalid');
                this.store.errors.push({
                    message: 'invalid team value'
                });
            }

            if (this.store.errors.length == 0) this.getCookie();
            else console.log('Project Creation Failed');
        },
        getCookie() {
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF', response);

                    this.putData();
                })
                .catch((response) => {
                    console.log('Errore ottenimento Cookie', response);
                    this.store.errors = response.data;
                })
        },
        putData() {
            axios.put(`http://localhost:8000/api/projects/${this.project.id}`, {
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
                    // console.log('Form data', response.data);
                    this.types = response.data.types;
                    this.teams = response.data.teams;
                    console.log('Form Types', this.types);
                    console.log('Form Teams', this.teams);
                })
        },
        cleanString(string) {
            string = string.replace('_', ' ');
            string = string.replace('.', '');
            return string;
        },
    },
    mounted() {

        document.title = 'Projects | Edit';

        this.getFormData();
        this.getProject();

        setTimeout(function () {
            store.clear();
        }, 2);
    },
    computed: {
        calcSlug() {
            let slug = this.form.title;

            if (slug != null) {
                slug = slug
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                return slug;
            }
        }
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

            <h1 class="mainTitle">edit project</h1>
            <form @submit.prevent="handleEditProject()" v-if="project">
                <div class="row inline-center">
                    <div class="group small">
                        <label for="title">title</label>
                        <input type="text" name="title" placeholder="Project title" v-model="form.title" id="title">
                    </div>

                    <div class="group small">
                        <label>slug</label>
                        <p v-if="form.title">{{ calcSlug }}</p>
                        <p v-else>Type a title to see a slug preview</p>
                    </div>
                </div>

                <div class="row">
                    <div class="group">
                        <label for="description">description</label>
                        <textarea name="description" id="description" cols="30" rows="10"
                            placeholder="Add a short description..." v-model="form.description"></textarea>
                    </div>
                </div>

                <div class="row inline-center triple">
                    <div class="group small">
                        <label for="deadline">deadline</label>
                        <input type="date" name="deadline" id="deadline" v-model="form.deadline">
                    </div>

                    <div class="group small">
                        <label for="type">type</label>
                        <select name="type_id" id="type" class="showAll" v-model="form.typeId">
                            <option :value="item.id" v-for="item in this.types">{{ cleanString(item.name) }}</option>
                        </select>
                    </div>

                    <div class="group small">
                        <label for="team">team</label>
                        <select name="team_id" id="team" class="showAll" v-model="form.teamId">
                            <option :value="item.id" v-for="item in this.teams">team #{{ item.id }}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="group large">
                        <button class="solid">
                            <font-awesome-icon icon="fa-solid fa-pen" />
                            save changes
                        </button>
                    </div>
                </div>

            </form>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../style/variables.scss' as *;
@use '../../../style/mixin.scss' as *;
@use '../../../style/form.scss' as *;

.row.inline-center:not(.triple) {
    gap: 2rem;

    .group.small {
        flex-basis: calc(50% - 1rem);
        flex-shrink: 0;
        flex-grow: 1;

        p {
            font-size: 0.95rem;
            line-height: 1.25em;
            padding: 10px;
            border-radius: 10px;
            background-color: $light-color-three;
            color: gray;
        }
    }
}

.row.inline-center.triple {
    justify-content: flex-start;
    gap: 2rem;

    .group {
        flex-basis: 15%;
    }
}

// .group.large {
//     @include flexRowGap (1.5rem);

//     >.group.small {
//         flex-grow: 1;
//     }
// }

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
</style>