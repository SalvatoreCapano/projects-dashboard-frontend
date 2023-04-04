<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

// import { store } from '../../store';
import { router } from '../../../router';

export default {
    name: 'AppProjectsIndex',
    data() {
        return {
            // store,
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
    created() {
        this.getProjects();
    }
}
</script>

<template>
    <h1>Projects</h1>

    <main v-if="projects">
        <ul>
            <li v-for="project in projects">
                <div>
                    <span>Title</span>
                    <span>{{ project.title }}</span>
                </div>
                <div>
                    <span>Description</span>
                    <span>{{ project.description }}</span>
                </div>
            </li>
        </ul>
    </main>
</template>

<style lang="scss" scoped>
main, h1 {
    color: white;
}
</style>