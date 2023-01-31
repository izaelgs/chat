<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Chat
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg flex" style="min-height: 400px; max-height: 400px;">
                    <!-- List Users-->
                    <div class="w-3/12 bg-gray-200 bg-opacity-25 border-r border-gray-200 overflow-y-scroll">
                        <ul>
                            <li
                                v-for="user in users" :key="user.id"
                                @click="() => {loadMessages(user.id)}"
                                :class="(userActive && userActive.id == user.id ? 'bg-gray-200 bg-opacity-50' : '')"
                                class="p-6 text-lg text-gray-600 leading-7 font-semibold border-b border-gray-200 hover:bg-gray-200 hover:bg-opacity-50 hover:cursor-pointer"
                            >
                                <p class="flex items-center">
                                    {{ user.name }}
                                    <span v-if="user.notification" class="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                </p>
                            </li>
                        </ul>
                    </div>

                    <!-- Box Message -->
                    <div class="w-9/12 flex flex-col justify-between">
                        <!-- Messages -->
                        <div class="w-full h-full p-6 flex flex-col overflow-y-scroll">
                            <div
                                v-for="message in messages"
                                :class="[message.from == $attrs.user.id ? 'text-right' : '']"
                                class="w-full mb-3 message"
                            >
                                <p
                                    :class="[message.from == $attrs.user.id ? 'messageFromMe' : 'messageToMe']"
                                    class="inline-block p-2"
                                    style="max-width: 75%;"
                                >
                                    {{ message.content }}
                                </p>
                                <span class="block mt-1 text-xs text-gray-500">{{ $filters.formatDate(message.created_at) }}</span>
                            </div>
                        </div>
                        <!-- Form -->
                        <div v-if="userActive" class="w-full bg-gray-200 bg-opacity-25 p-6 border-t border-gray-200">
                            <form @submit.prevent="sendMessage()">
                                <div class="flex rounded-md overflow-hidden border border-gray-300">
                                    <input v-model="message" type="text" class="flex-1 px-4 py-2 text-sm focus:outline-none border-none">
                                    <button type="submit" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>

import AppLayout from '@/Layouts/AppLayout.vue';

export default {
    data() {
        return {
            users: [],
            messages: [],

            userActive: false,
            message: '',
        }
    },

    mounted() {
        axios.get('api/users').then(response => {
            this.users = response.data.data;
        });

        window.Echo.private(`user.${this.$attrs.auth.user.id}`).listen('.SendMessage', async (e) => {
            console.log(e);
            if(this.userActive && this.userActive.id == e.message.from) {
                await this.messages.push(e.message);
                this.scrollToBottom();
            } else {
                let user = this.users.filter(user => {
                    if(user.id === e.message.from) {
                        return user;
                    }
                })

                if(user) {
                    user[0]['notification'] = true;
                }
            }
        });
    },

    methods: {

        scrollToBottom() {
            if(this.messages.length) {
                document.querySelectorAll('.message:last-child')[0].scrollIntoView();
            }
        },

        async loadMessages(userId) {

            this.userActive = this.users.find(user => user.id == userId);
            await axios.get(`api/messages/${userId}`).then(response => {
                this.messages = response.data.data.reverse();
            })

            let user = this.users.filter(user => {
                if(user.id === userId) {
                    return user;
                }
            })

            if(user && user[0]['notification']) {
                user[0]['notification'] = false;
            }
            this.scrollToBottom();
        },

        async sendMessage() {
            await axios.post('api/messages', {
                'to': this.userActive.id,
                'content' : this.message,
            }).then(response => {
                this.message = '';
                this.messages.push(response.data.message);
            })

            this.scrollToBottom();
        }
    },

    components: { AppLayout }
}

</script>

<style>

.messageFromMe {
    @apply bg-indigo-300 bg-opacity-25;
}

.messageToMe {
    @apply bg-gray-300 bg-opacity-25;
}

</style>
