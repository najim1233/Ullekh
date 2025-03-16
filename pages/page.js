document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.navbar-toggler');
    const icon = toggleButton.querySelector('.navbar-toggle');

    toggleButton.addEventListener('click', function () {
        // Toggle between hamburger and close icon
        icon.classList.toggle('open');
    });
});

// Modal and Popup Functions
function showPopup(title, body) {
    document.getElementById("popupTitle").innerText = title;
    document.getElementById("popupBody").innerText = body;
    document.getElementById("popupModal").classList.add("show");
    document.getElementById("overlayBackground").classList.add("show");
}

function closePopup() {
    document.getElementById("popupModal").classList.remove("show");
    document.getElementById("overlayBackground").classList.remove("show");
}

function addPopupNotice(condition, title, body, extra) {
    switch (condition) {
        case "page-load":
            window.onload = () => showPopup(title, body);
            break;
        case "before-refresh":
            window.addEventListener("beforeunload", (e) => {
                e.preventDefault();
                showPopup(title, body);
            });
            break;
        case "scroll-bottom":
            window.addEventListener("scroll", () => {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) showPopup(title, body);
            });
            break;
        case "scroll-up":
            let lastScroll = window.scrollY;
            window.addEventListener("scroll", () => {
                if (window.scrollY < lastScroll) showPopup(title, body);
                lastScroll = window.scrollY;
            });
            break;
        case "scroll-section":
            document.getElementById(extra).addEventListener("mouseenter", () => showPopup(title, body));
            break;
        case "darkmode":
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
                if (e.matches) showPopup(title, body);
            });
            break;
        case "idle":
            let idleTimer;
            function resetTimer() {
                clearTimeout(idleTimer);
                idleTimer = setTimeout(() => showPopup(title, body), extra * 1000);
            }
            document.addEventListener("mousemove", resetTimer);
            document.addEventListener("keydown", resetTimer);
            resetTimer();
            break;
        case "click":
            document.addEventListener("click", () => showPopup(title, body));
            break;
        case "dblclick":
            document.addEventListener("dblclick", () => showPopup(title, body));
            break;
        case "rightclick":
            document.addEventListener("contextmenu", (e) => { 
                e.preventDefault(); 
                showPopup(title, body); 
            });
            break;
        case "keydown":
            document.addEventListener("keydown", (e) => {
                if (e.key === extra) showPopup(title, body);
            });
            break;
        case "copy":
            document.addEventListener("copy", () => showPopup(title, body));
            break;
        case "cut":
            document.addEventListener("cut", () => showPopup(title, body));
            break;
        case "paste":
            document.addEventListener("paste", () => showPopup(title, body));
            break;
        case "network-off":
            window.addEventListener("offline", () => showPopup(title, body));
            break;
        case "network-on":
            window.addEventListener("online", () => showPopup(title, body));
            break;
        case "battery-low":
            navigator.getBattery().then((battery) => {
                if (battery.level < 0.2) showPopup(title, body);
            });
            break;
        case "tab-switch":
            document.addEventListener("visibilitychange", () => {
                if (!document.hidden) showPopup(title, body);
            });
            break;
        case "device-orientation":
            window.addEventListener("orientationchange", () => showPopup(title, body));
            break;
        case "window-resize":
            window.addEventListener("resize", () => showPopup(title, body));
            break;
        case "specific-time":
            setInterval(() => {
                const now = new Date();
                const formattedTime = `${now.getHours()}:${now.getMinutes()}`;
                if (formattedTime === extra) showPopup(title, body);
            }, 60000);
            break;
        case "first-visit":
            if (!localStorage.getItem("visited")) {
                showPopup(title, body);
                localStorage.setItem("visited", "true");
            }
            break;
        case "returning-visit":
            if (localStorage.getItem("visited")) showPopup(title, body);
            break;
    }
}

// Add Interval Notices
function startIntervalNotices() {
    setTimeout(() => {
        addNotice("Reminder: 7 minutes have passed since the page loaded.");
    }, 7 * 60 * 1000); // 7 minutes

    setInterval(() => {
        addNotice("This is a notice triggered every 5 seconds.");
    }, 5000); // 5 seconds

    setInterval(() => {
        addNotice("This is a notice triggered every 10 minutes.");
    }, 10 * 60 * 1000); // 10 minutes

    setInterval(() => {
        addNotice("This is a notice triggered every 15 minutes.");
    }, 15 * 60 * 1000); // 15 minutes

    setInterval(() => {
        addNotice("This is a notice triggered every 30 minutes.");
    }, 30 * 60 * 1000); // 30 minutes
}

// Add a notice to the page
function addNotice(message) {
    const noticeBox = document.createElement('div');
    noticeBox.className = 'notice';
    noticeBox.innerHTML = `
        <span>${message}</span>
        <button class="close-notice">X</button>
    `;

    const closeButton = noticeBox.querySelector('.close-notice');
    closeButton.addEventListener('click', () => {
        noticeBox.remove();
    });

    document.body.appendChild(noticeBox);
}

// Detecting network status
window.addEventListener('offline', () => {
    addNotice("You are now offline.");
});

window.addEventListener('online', () => {
    addNotice("You are back online.");
});

// Battery status tracking
navigator.getBattery().then(function(battery) {
    function updateBatteryStatus() {
        if (battery.level < 0.2) {
            addNotice("Your battery is running low.");
        }
    }

    battery.addEventListener('levelchange', updateBatteryStatus);
    updateBatteryStatus();
});



// Detecting dark mode preference changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (e.matches) {
        addNotice("You've switched to dark mode.");
    } else {
        addNotice("You've switched to light mode.");
    }
});