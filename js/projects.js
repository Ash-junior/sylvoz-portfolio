// Gestion du filtrage des projets
const tagButtons = document.querySelectorAll('.tag-btn');
const projectCards = document.querySelectorAll('.project-card');

tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tag-btn.active').classList.remove('active');
        btn.classList.add('active');
        const tag = btn.getAttribute('data-tag');
        projectCards.forEach(card => {
            if (tag === 'all' || card.getAttribute('data-tags').includes(tag)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Gestion de la modale projet
const modal = document.getElementById('project-modal');
const modalBody = modal.querySelector('.modal-body');
const closeModal = modal.querySelector('.close-modal');

const projectDetails = {
    1: {
        title: 'Portfolio Personnel',
        description: 'Un site web moderne pour présenter mon parcours, mes compétences et mes réalisations. <br><br><strong>Outils :</strong> HTML, CSS, JavaScript',
        objectif: 'Présenter mon profil professionnel et mes projets de façon élégante et responsive.',
        images: ['images/portfolio_details.png'],
        videos: []
    },
    2: {
        title: 'Insane Parkour',
        description: 'Les joueurs progressent en surmontant les obstacles qui sont devant eux tout le long du parkour. <br><br><strong>Outils :</strong> Unreal Engine, C++, Notion, Blueprints',
        objectif: 'Réaliser le back-end et le front-end d\'un jeu multijoueur pour apprendre la gestion du réseau et la replication.',
        images: ['images/IP_Playmenu.png', 'images/IP_Customisation.png', 'images/IP_HostConfig.png', 'images/IP_Lobby.png', 'images/IP_Freemode1.png', 'images/IP_Freemode2.png'],
        videos: ['videos/InsaneParkour_Lancement.mp4', 'videos/InsaneParkour_CustomisationDePersonnage.mp4', 'videos/InsaneParkour_Profile.mp4', 'videos/InsaneParkour_FreeMode.mp4','videos/InsaneParkour_HostAndLobby.mp4']
    },
    3: {
        title: 'Reconnaissance faciale Python - ESP32 et OpenCV',
        description: 'Une caméra ESP32 que nous devions utilisé pour faire la reconnaissance des visages des étudiants de notre promotion de 4e année et ainsi validé leur présence en classe.Nous avons construit un programme de reconnaissance faciale avec python et une base de données pour stocker les photos des personnes à reconnaître et gérer les présences aux cours de chaque étudiant  <br><br><strong>Outils :</strong> ESP32, OpenCV, Python, Supabase, PostgreSQL, GitHub',
        objectif: 'Expérimenter la reconnaissance faciale avec une caméra embarquée et un microcontrôleur.',
        images: ['images/perseus_details.gif'],
        videos: []
    },
    4: {
        title: 'ECAMBOT 2025 - Robot Piloté par Gestes',
        description: 'Comme projet de fin de 4e année, il nous a été demandé de concevoir, construire et piloté un robot en partant de zéro pour nous affronter sur différentes actions le dernier jour de projet.  <br><br><strong>Outils :</strong> OpenCV, Python, Mediapipe, Arduino, C++, GitHub',
        objectif: 'Gérer un projet, concevoir et piloter un robot avec une reconnaissance de gestes.',
        images: ['images/Ecambot (1).jpg', 'images/Ecambot (2).jpg', 'images/Ecambot (3).jpg'],
        videos: ['videos/ecambot_extrait1.mp4', 'videos/ecambot_extrait2.mp4']
    },
    5: {
        title: '6 Hours',
        description: 'Le joueur se retrouve dans un evironnement semi-open world avec pour objectif de retrouver des personnes disparues en moins de 6 heures. <br><br><strong>Outils :</strong> Unreal Engine, C++, Notion, Blueprints, Cascadeur Animation, Blender',
        objectif: 'Plonger dans la création d\'un jeu de A-Z. Concevoir le gameplay, les mécaniques de jeu, les animations et l\'environnement.',
        images: ['images/sixH_screen1.jpg', 'images/sixH_screen2.jpg', 'images/sixH_screen3.png', 'images/sixH_screen4.png', 'images/sixH_screen5.png'],
        videos: ['videos/project_sixH_extrait.mp4', 'videos/project_sixH_extrait2.mkv'],
    },
    6: {
        title: 'Around',
        description: 'Une boule, qui roule dans un environnement low-poly, sur fond de musique relaxante. Avec d’autres boule présentent ici et là sur la map. Un side project pour consolider mes compétences dans unreal engine. <br><br><strong>Outils :</strong> Unreal Engine, C++, Notion, Blueprints, Blender',
        objectif: 'Consolider mes connaissances de base du moteur de jeu UE5. Approfondir la physique de jeu, la gestion des collisions et les animations.',
        images: ['images/around_extrait1.png', 'images/around_extrait2.png'],
        videos: ['videos/Around_extrait2.mp4']
    },
    7: {
        title: 'Clavier virtuel et reconnaissance d\'expressions - OpenCV',
        description: 'Un projet étudiant qui consiste à utiliser un clavier virtuel pour coder dans un IDE et faire de la programmation pour des personnes en situation de handicap. Le tout controler par les mouvements de tête !   <br><br><strong>Outils :</strong> OpenCV, Python, GitHub',
        objectif: 'Répondre à un besoin social en utilisant la reconnaissance d\'image pour contrôler un clavier virtuel. Renforcer mes compétences en Python et OpenCV.',
        images: ['images/hermes_details.gif', 'images/hermes_details2.gif'],
        videos: []
    },
};

document.querySelectorAll('.see-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-project');
        const proj = projectDetails[id];
        if (proj) {
            let html = `<h3>${proj.title}</h3>`;
            html += `<p>${proj.description}</p>`;
            html += `<p><strong>Objectif :</strong> ${proj.objectif}</p>`;
            // Tabs
            let hasImages = proj.images && proj.images.length;
            let hasVideos = proj.videos && proj.videos.length;
            if (hasImages || hasVideos) {
                html += '<div class="modal-tabs">';
                if (hasImages) html += '<button class="modal-tab-btn active" data-tab="images">Images</button>';
                if (hasVideos) html += '<button class="modal-tab-btn' + (hasImages ? '' : ' active') + '" data-tab="videos">Vidéos</button>';
                html += '</div>';
            }
            // Carrousel images
            if (hasImages) {
                html += '<div class="modal-carousel" id="carousel-images">';
                html += '<button class="carousel-btn" id="prev-img">&#8592;</button>';
                html += `<img src="${proj.images[0]}" alt="${proj.title}" class="carousel-media" id="carousel-img">`;
                html += '<button class="carousel-btn" id="next-img">&#8594;</button>';
                html += '</div>';
            }
            // Carrousel vidéos
            if (hasVideos) {
                html += '<div class="modal-carousel" id="carousel-videos" style="display:' + (hasImages ? 'none' : 'flex') + '">';
                html += '<button class="carousel-btn" id="prev-vid">&#8592;</button>';
                html += `<video src="${proj.videos[0]}" controls class="carousel-media" id="carousel-vid"></video>`;
                html += '<button class="carousel-btn" id="next-vid">&#8594;</button>';
                html += '</div>';
            }
            modalBody.innerHTML = html;
            modal.classList.add('active');

            // JS pour tabs
            const tabBtns = modalBody.querySelectorAll('.modal-tab-btn');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    if (btn.getAttribute('data-tab') === 'images') {
                        const imgCarousel = modalBody.querySelector('#carousel-images');
                        if (imgCarousel) imgCarousel.style.display = 'flex';
                        const vidCarousel = modalBody.querySelector('#carousel-videos');
                        if (vidCarousel) vidCarousel.style.display = 'none';
                    } else {
                        const imgCarousel = modalBody.querySelector('#carousel-images');
                        if (imgCarousel) imgCarousel.style.display = 'none';
                        const vidCarousel = modalBody.querySelector('#carousel-videos');
                        if (vidCarousel) vidCarousel.style.display = 'flex';
                    }
                });
            });
            // JS carrousel images
            if (hasImages) {
                let imgIndex = 0;
                const imgEl = modalBody.querySelector('#carousel-img');
                const prevImg = modalBody.querySelector('#prev-img');
                const nextImg = modalBody.querySelector('#next-img');
                prevImg.addEventListener('click', () => {
                    imgIndex = (imgIndex - 1 + proj.images.length) % proj.images.length;
                    imgEl.src = proj.images[imgIndex];
                });
                nextImg.addEventListener('click', () => {
                    imgIndex = (imgIndex + 1) % proj.images.length;
                    imgEl.src = proj.images[imgIndex];
                });
            }
            // JS carrousel vidéos
            if (hasVideos) {
                let vidIndex = 0;
                const vidEl = modalBody.querySelector('#carousel-vid');
                const prevVid = modalBody.querySelector('#prev-vid');
                const nextVid = modalBody.querySelector('#next-vid');
                prevVid.addEventListener('click', () => {
                    vidIndex = (vidIndex - 1 + proj.videos.length) % proj.videos.length;
                    vidEl.src = proj.videos[vidIndex];
                    vidEl.load();
                });
                nextVid.addEventListener('click', () => {
                    vidIndex = (vidIndex + 1) % proj.videos.length;
                    vidEl.src = proj.videos[vidIndex];
                    vidEl.load();
                });
            }
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    modalBody.innerHTML = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        modalBody.innerHTML = '';
    }
}); 