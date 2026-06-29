// ==================== CONFIG ====================
const PERSON = {
    name: "María José",
    age: 14,
    gender: "mujer"
};

const CLOSING_TEXT = `no sé qué es lo que hice mal para que tú te enamoraras de otra persona, pero espero que, si estas con esa persona te valla bien, esto lo empecé a modificar el 28 de junio no sé porque lo hago, solo quiero que estes con quien estes tu seas feliz y aprende de tus errores por si un día llega alguien que te trate mejor de lo que yo o alguien lo hizo, y aprende de tus errores no los vuelvas a cometer, ya por ultimo espero que este día te la pases bien con quien estes y con tu familia, nunca pienses que nadie te va a querer, pos data esto no lo tenia escrito todo esto lo tuve que reacer ya que ya lo tenia hecho de una forma diferente por lo que sucedio ya que esto estava hecho para pedirte que fueras mi novia por segunda ves pero sucedio lo contrario, espero que seas feliz.`;

const SIGNATURE = "\n\ncon cariño Mapachito";

const TEMPLATES = [
    "¡Feliz cumpleaños, {name}! Que tengas un día lleno de risas, música y sorpresas bonitas.",
    "{name}, ¡felices {age} años! Que este año te traiga canciones nuevas para descubrir y tardes con amigos.",
    "¡Felicidades, {name}! Gracias por las risas y las tardes de música compartida. ¡Que tengas un día genial!",
    "¡Feliz {age}! Que cada playlist de hoy suene tan bien como las tardes que pasamos escuchando música."
];

const BOOK_OF_LIFE_TEMPLATES = [
    "En este día, {name}, que los colores y la música te acompañen. ¡Feliz cumpleaños!",
    "{name}, que este año sea tan vibrante y lleno de vida como la música que te gusta. ¡Felices {age}!",
    "Que las tradiciones, la música y las risas te llenen el día. ¡Feliz cumpleaños, {name}!"
];

const SUBTLE_REFERENCES = [
    "una playlist que suene perfecta en el momento justo",
    "una tarde con música, risas y chocolate",
    "un atardecer con auriculares y buena compañía"
];

const DECORS = ["🖤 — ✦ — 🖤", "☾ • — • ☽", "— • — • —"];

const SONG_SEARCHES = {
    deftones_albums: "https://open.spotify.com/search/deftones%20album",
    cerati_albums: "https://open.spotify.com/search/gustavo%20cerati%20album",
    radiohead_albums: "https://open.spotify.com/search/radiohead%20album",
    user_playlist: "https://open.spotify.com/playlist/4pX4wMeYJowGuWDEOyOjPH?si=gFxI1Y1zQUiprBsoZQr2Hw"
};

const YOUTUBE_TRACK_URL = "https://www.youtube.com/results?search_query=no+matter+where+you+are+the+book+of+life+soundtrack";

// ==================== UTILITY FUNCTIONS ====================
function makeGreeting(theme = "book_of_life") {
    const tmplPool = TEMPLATES.slice();
    if (theme === "book_of_life") {
        tmplPool.push(...BOOK_OF_LIFE_TEMPLATES);
    }
    
    const tmpl = tmplPool[Math.floor(Math.random() * tmplPool.length)];
    const ref = SUBTLE_REFERENCES[Math.floor(Math.random() * SUBTLE_REFERENCES.length)];
    const decor = DECORS[Math.floor(Math.random() * DECORS.length)];
    
    let base = tmpl
        .replace("{name}", PERSON.name)
        .replace("{age}", PERSON.age);
    
    return `${decor}\n${base}\n\nQue este día te regale ${ref}.\n\n${CLOSING_TEXT}${SIGNATURE}\n${decor}`;
}

// ==================== CHUY SPRITE ANIMATION ====================
class ChuySprite {
    constructor(canvas, x, y, vx, vy, angleSpeed) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.angle = 0;
        this.angleSpeed = angleSpeed;
    }

    step(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.angle += this.angleSpeed * dt;

        const w = this.canvas.width;
        if (this.x < -100) this.x = w + 100;
        if (this.x > w + 100) this.x = -100;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        this.drawChuy(ctx);
        ctx.restore();
    }

    drawChuy(ctx) {
        // Cuerpo (círculo principal rosado)
        ctx.fillStyle = "rgba(255, 182, 193, 0.9)";
        ctx.beginPath();
        ctx.ellipse(0, 10, 30, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(180, 60, 90, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Orejas
        ctx.fillStyle = "rgba(255, 182, 193, 0.9)";
        ctx.beginPath();
        ctx.ellipse(-15, -20, 8, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(15, -20, 8, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ojos
        ctx.fillStyle = "rgba(120, 20, 40, 1)";
        ctx.beginPath();
        ctx.arc(-10, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(10, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        // Hocico
        ctx.fillStyle = "rgba(255, 140, 160, 0.9)";
        ctx.beginPath();
        ctx.ellipse(0, 15, 10, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nariz
        ctx.fillStyle = "rgba(180, 60, 90, 1)";
        ctx.beginPath();
        ctx.arc(0, 12, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== MAIN APP CLASS ====================
class BirthdayApp {
    constructor() {
        this.theme = "book_of_life";

        // Elementos del DOM
        this.greetingText = document.getElementById("greetingText");
        this.canvas = document.getElementById("chuyCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.posterImage = document.getElementById("posterImage");
        this.posterPlaceholder = document.getElementById("posterPlaceholder");
        this.audioStatus = document.getElementById("audioStatus");

        // Sprites
        this.sprites = [];
        this.animRunning = false;
        this.animFrameId = null;

        // Inicializar
        this.init();
    }

    init() {
        this.updateGreeting();
        this.startChuyAnimation();
    }

    updateGreeting() {
        this.greetingText.textContent = makeGreeting(this.theme);
    }

    newMessage() {
        this.updateGreeting();
    }

    saveText() {
        const text = this.greetingText.textContent + `\n\n— ${PERSON.name}, ${PERSON.age} años${SIGNATURE}\nGenerado: ${new Date().toLocaleString()}`;
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `felicitacion_${PERSON.name}_${new Date().getTime()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    showThemeArtwork() {
        const queries = ["deftones", "gustavo cerati", "radiohead", "shoegaze"];
        const query = queries[Math.floor(Math.random() * queries.length)];
        this.loadArtwork(query);
    }

    async loadArtwork(query) {
        this.posterPlaceholder.textContent = "Cargando portada...";
        try {
            const response = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1&country=US`
            );
            const data = await response.json();
            
            if (data.resultCount > 0) {
                let imageUrl = data.results[0].artworkUrl100;
                if (imageUrl) {
                    imageUrl = imageUrl.replace("100x100", "600x600");
                    this.posterImage.onload = () => {
                        this.posterPlaceholder.style.display = "none";
                        this.posterImage.style.display = "block";
                    };
                    this.posterImage.onerror = () => {
                        this.posterPlaceholder.textContent = "No se pudo cargar la portada.";
                        this.posterPlaceholder.style.display = "block";
                        this.posterImage.style.display = "none";
                    };
                    this.posterImage.src = imageUrl;
                } else {
                    this.posterPlaceholder.textContent = "No se encontró portada.";
                }
            } else {
                this.posterPlaceholder.textContent = "No se encontró portada.";
            }
        } catch (error) {
            console.error("Error loading artwork:", error);
            this.posterPlaceholder.textContent = "Error al cargar portada.";
        }
    }

    playSong(key) {
        const url = SONG_SEARCHES[key];
        if (url) {
            window.open(url, "_blank");
        }
    }

    openTrackOnYoutube() {
        window.open(YOUTUBE_TRACK_URL, "_blank");
    }
    
    openTikTok() {
        window.open("https://vt.tiktok.com/ZSCUBDfp8/", "_blank");
    }
       
    startChuyAnimation() {
        if (this.animRunning) return;

        this.sprites = [];
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * (-200);
            const vx = Math.random() * 40 - 20;
            const vy = Math.random() * 80 + 40;
            const angleSpeed = Math.random() * 60 - 30;

            const sprite = new ChuySprite(this.canvas, x, y, vx, vy, angleSpeed);
            this.sprites.push(sprite);
        }

        this.animRunning = true;
        this._animateLoop();
    }

    stopChuyAnimation() {
        if (!this.animRunning) return;
        this.animRunning = false;
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _animateLoop = () => {
        if (!this.animRunning) return;

        const dt = 0.016; // ~60 FPS

        // Limpiar canvas
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar y dibujar sprites
        for (let sprite of this.sprites) {
            sprite.step(dt);

            if (sprite.y > this.canvas.height + 120) {
                sprite.x = Math.random() * (this.canvas.width + 100) - 50;
                sprite.y = Math.random() * (-160) - 40;
                sprite.vx = Math.random() * 40 - 20;
                sprite.vy = Math.random() * 80 + 40;
            }

            sprite.draw(this.ctx);
        }

        // Agregar nuevos sprites ocasionalmente
        if (Math.random() < 0.08 && this.sprites.length < 14) {
            const x = Math.random() * (this.canvas.width + 100) - 50;
            const y = Math.random() * (-160) - 40;
            const vx = Math.random() * 40 - 20;
            const vy = Math.random() * 80 + 40;
            const angleSpeed = Math.random() * 60 - 30;

            const sprite = new ChuySprite(this.canvas, x, y, vx, vy, angleSpeed);
            this.sprites.push(sprite);
        }

        this.animFrameId = requestAnimationFrame(this._animateLoop);
    };
}

// ==================== INITIALIZE ====================
window.app = new BirthdayApp();
