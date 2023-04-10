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
    name: 'AppUsersIndex',
    components: {
        AppSidebar,
        AppDashboardHeader,
        AppLinkButton
    },
    data() {
        return {
            store,
            router,
            users: null
        }
    },
    methods: {
        getUsers() {
            axios.get('http://localhost:8000/api/users')
                .then((response) => {
                    this.users = response.data.users;
                    console.log('Users', response.data.users);
                })
        },
        // cleanString(string) {
        //     string = string.replace('_', ' ');
        //     string = string.replace('.', '');
        //     return string;
        // },
        cleanDate(string) {
            string = string.substring(0, 10);
            return string;
        },
        // showProject(slug) {
        //     router.push(`/admin/projects/${slug}`, {
        //         slug: slug
        //     })
        // }
    },
    mounted() {
        document.title = 'Employees';

        setTimeout(function () {
            store.clear();
        }, 2);

        this.getUsers();
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
                    <h1 class="mainTitle">Users</h1>
                    <AppLinkButton :to="'/admin/projects/create'" :label="'add a user'" :type="'solid'" :icon="'plus'" />
                </div>
                <div class="cardBody">
                    <table v-if="users">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>first name</th>
                                <th>last name</th>
                                <th>role</th>
                                <th>level</th>
                                <th>team</th>
                                <th>email</th>
                                <th>added at</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td v-if="user.id"><strong>{{ user.id }}</strong></td>
                                <td v-else>-</td>

                                <td v-if="user.first_name" class="capitalize">{{ user.first_name }}</td>
                                <td v-else>-</td>

                                <td v-if="user.last_name" class="capitalize">{{ user.last_name }}</td>
                                <td v-else>-</td>

                                <td v-if="user.role">{{ user.role }}</td>
                                <td v-else>-</td>

                                <td v-if="user.level">{{ user.level }}</td>
                                <td v-else>-</td>

                                <td v-if="user.team_id">{{ user.team_id }}</td>
                                <td v-else>-</td>

                                <td v-if="user.email">{{ user.email }}</td>
                                <td v-else>-</td>

                                <td v-if="user.created_at">{{ cleanDate(user.created_at) }}</td>
                                <td v-else>-</td>

                                <td>
                                    <div class="row">

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
            &.capitalize {
                text-transform: capitalize;
            }
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