async function loadTalks() {
    try {
        const response = await fetch('_data/talks.json'); // Changed path
        const talks = await response.json(); // talks is now an array of objects
        
        // Group talks by type
        const groupedTalks = talks.reduce((acc, talk) => {
            // Create array for type if it doesn't exist
            if (!acc[talk.type]) {
                acc[talk.type] = [];
            }
            acc[talk.type].push(talk);
            return acc;
        }, {});

        // Create HTML for each group
        const talksContainer = document.querySelector('.talks-container');
        talksContainer.innerHTML = '';

        // Convert grouped talks object to array and sort by type if needed
        Object.entries(groupedTalks).forEach(([type, talks]) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'content collapsed';
            groupDiv.innerHTML = `
                <h2 class="collapsed">${type}</h2>
                <div class="talks-grid" style="display: none;">
                    ${talks.map(talk => `
                        <div class="talk-card" onclick="showTalkContent(${JSON.stringify(talk).replace(/"/g, '&quot;')})">
                            <img src="${talk.thumbnail || 'default-thumbnail.jpg'}" alt="${talk.title}">
                            <h3>${talk.title}</h3>
                            <p>${talk.organization}</p>
                        </div>
                    `).join('')}
                </div>
            `;

            // Add click handler for the type header
            const header = groupDiv.querySelector('h2');
            const content = groupDiv.querySelector('.talks-grid');
            header.addEventListener('click', () => {
                header.classList.toggle('collapsed');
                content.style.display = content.style.display === 'none' ? 'grid' : 'none';
            });

            talksContainer.appendChild(groupDiv);
        });

    } catch (error) {
        console.error('Error loading talks:', error);
        document.querySelector('.talks-container').innerHTML = '<p>Error loading talks content</p>';
    }
}

function showTalkContent(talk) {
    const talkContent = document.querySelector('.talk-content');
    document.body.style.overflow = 'hidden';
    talkContent.innerHTML = `
        <div class="talk-overlay" onclick="event.stopPropagation()">
            <button class="close-btn" onclick="closeTalkContent()">×</button>
            <h2>${talk.title}</h2>
            ${talk.description ? `<p>${talk.description}</p>` : ''}
            ${talk.link ? `<div class="video-container"><iframe src="${talk.link}" frameborder="0" allowfullscreen></iframe></div>` : ''}
            ${talk.slides ? `<div class="slides-container"><iframe src="${talk.slides}" frameborder="0"></iframe></div>` : ''}
            ${talk.kaggle_notebook ? `<a href="${talk.kaggle_notebook}" target="_blank" class="kaggle-link">View Kaggle Notebook</a>` : ''}
        </div>
    `;
    talkContent.classList.add('active');
    // Add click handler to the background
    talkContent.addEventListener('click', closeTalkContent);
}

function closeTalkContent() {
    const talkContent = document.querySelector('.talk-content');
    // Re-enable body scroll
    document.body.style.overflow = '';
    talkContent.classList.remove('active');
    talkContent.innerHTML = '';
}