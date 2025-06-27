fetch('insights.json')
  .then(res => res.json())
  .then(data => {
    const dashboard = document.querySelector('.wt-dashboard');
    const container = document.querySelector('.wt-container');

    data.insights.forEach(insight => {
      // Create Insight Card
      const card = document.createElement('div');
      card.className = 'wt-card';
      card.innerHTML = `
        <h2>${insight.title}</h2>
        <p class="wt-insight">${insight.summary}</p>
        <a href="#${insight.id}-modal" class="wt-link" data-modal="${insight.id}-modal">🔍 View Details →</a>
      `;
      dashboard.appendChild(card);

      // Create Insight Modal
      const modal = document.createElement('div');
      modal.className = 'wt-modal';
      modal.id = `${insight.id}-modal`;
      modal.innerHTML = `
        <div class="wt-card">
          <h3>${insight.title}</h3>
          <p><strong>Insight:</strong> ${insight.summary}</p>
          <p><strong>Truth Resonance Index:</strong> <span class="wt-resonance">${insight.resonance}</span></p>
          <p><strong>Source:</strong> <a href="${insight.source.url}" class="wt-link" target="_blank">${insight.source.name}</a></p>
          <p><strong>Moral Lens:</strong> ${insight.moral_lens}</p>
          ${insight.actions.map(action => `<a href="#" class="wt-action">${action} →</a>`).join('')}
        </div>
      `;
      container.appendChild(modal);
    });

    // Modal open behavior
    document.querySelectorAll('.wt-link[data-modal]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const modal = document.getElementById(link.getAttribute('data-modal'));
        if (modal) modal.style.display = 'block';
      });
    });

    // Modal close behavior
    document.querySelectorAll('.wt-modal').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
      });
    });
  })
  .catch(err => console.error('💥 Insight loading failed:', err));
