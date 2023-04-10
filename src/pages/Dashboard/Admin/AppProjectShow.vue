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
    name: 'AppProjectShow',
    components: {
        AppSidebar,
        AppDashboardHeader,
        AppLinkButton
    },
    data() {
        return {
            store,
            router,
            project: null
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

            <div v-if="project">
                <h1>Title: {{ project.title }}</h1>
                <h2>Slug: {{ project.slug }}</h2>
                <p>Description: {{ project.description }}</p>
                <p>Status: {{ project.status }}</p>
                <p>Deadline: {{ project.deadline }}</p>
                <p>Type: {{ project.type.name }}</p>
                <p>Team ID: {{ project.team_id }}</p>
                <p>Created At: {{ project.created_at }}</p>
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

table {
    border-collapse: collapse;
}

tbody {
    tr {
        &:hover {
            background-color: $light-color-two;
        }
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