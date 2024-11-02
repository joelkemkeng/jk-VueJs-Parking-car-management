// Accéder à jsPDF via l'objet global
//const { jsPDF } = window.jspdf;

// Accéder à QRCode via l'objet global
const QRCode = window.qrcode;

const routes = [
    { path: '/', component: home_live_scan},
    { path: '/home', component: home },
    { path: '/place', component: place },
    { path: '/managePlace', component: managePlace },
    { path: '/history', component: historyParking },

]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')