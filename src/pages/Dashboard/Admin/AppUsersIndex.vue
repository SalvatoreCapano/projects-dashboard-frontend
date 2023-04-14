<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';
import AppDashboardHeader from '../../../components/AppDashboardHeader.vue';
import AppButton from '../../../components/AppButton.vue';
import AppTable from '../../../components/AppTable.vue';

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
        AppButton,
        AppTable
    },
    data() {
        return {
            store,
            router,
            users: null,
            tableHeaders: ['ID', 'first name', 'last name', 'role', 'level', 'team', 'email', 'added at']
        }
    },
    methods: {
        getUsers() {
            axios.get('http://localhost:8000/api/users')
                .then((response) => {
                    this.users = response.data.users;
                    // console.log('Users', response.data.users);
                })
        },
        cleanDate(string) {
            string = string.substring(0, 10);
            return string;
        },
        testFn() {
            console.log('TEst');
        }
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
    <div class="container dashboard" v-if="store.user">
        <AppSidebar />

        <main>
            <AppDashboardHeader />
            <div class="card">
                <div class="cardHeader">
                    <h1 class="mainTitle">users</h1>
                    <AppButton :to="'/admin/projects/create'" :label="'add a user'" :type="'solid'" :palette="'primary'"
                        :icon="'plus'" />
                </div>
                <div class="cardBody">
                    <!-- <AppTable :headers="tableHeaders" :data="users" :action="testFn"/> -->
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