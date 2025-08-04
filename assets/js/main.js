// Declare the missing variable
        let lastModalData = null;

        // Add the missing storeModalState function
        function storeModalState() {
            lastModalData = {
                title: document.getElementById('modal-title').textContent,
                type: document.getElementById('modal-type').innerHTML,
                themes: document.getElementById('modal-themes').innerHTML,
                stats: document.getElementById('modal-stats').innerHTML,
                date: document.getElementById('modal-date').textContent,
                author: document.getElementById('modal-author').textContent,
                body: document.getElementById('modal-body').innerHTML,
                relations: document.getElementById('modal-relations')?.innerHTML
            };
        }

        // Content type filtering
        document.querySelectorAll('.type-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const cards = document.querySelectorAll('.card');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-type') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Theme filtering
        document.querySelectorAll('.theme-pill').forEach(pill => {
            pill.addEventListener('click', function() {
                document.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                
                const theme = this.getAttribute('data-theme');
                const cards = document.querySelectorAll('.card');
                
                cards.forEach(card => {
                    if (theme === 'all') {
                        card.style.display = 'flex';
                    } else {
                        const themes = card.getAttribute('data-themes');
                        if (themes && themes.includes(theme)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });

        // Modal functionality
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't open modal if clicking on action buttons
                if (e.target.closest('.card-stats')) return;
                
                openModal(this);
            });
        });

        // Fixed openModal function
        function openModal(card) {
            const modal = document.getElementById('modal');
            const title = card.querySelector('.card-title').textContent;
            const type = card.querySelector('.card-type-label').innerHTML;
            const themes = card.querySelectorAll('.theme-tag');
            const excerpt = card.querySelector('.card-excerpt').textContent;
            const stats = card.querySelector('.card-stats').innerHTML;
            const time = card.querySelector('.card-footer span:last-child').textContent;
            const cardType = card.getAttribute('data-type');
            
            // Update modal content
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-type').innerHTML = type;
            document.getElementById('modal-date').textContent = time;
            document.getElementById('modal-stats').innerHTML = stats.replace(/<span>/g, '').replace(/<\/span>/g, ' ');
            
            // Add theme tags
            const themesContainer = document.getElementById('modal-themes');
            themesContainer.innerHTML = '';
            themes.forEach(theme => {
                themesContainer.appendChild(theme.cloneNode(true));
            });
            
            // Add content based on type
            const body = document.getElementById('modal-body');
            const relations = document.getElementById('modal-relations');
            
            if (cardType === 'legislation') {
                body.innerHTML = `
                    <p>${excerpt}</p>
                    <h4 style="margin: 1.5rem 0 1rem;">Proposed Changes:</h4>
                    <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.875rem;">
                        <div style="color: var(--type-news);">- Developer allocation: 80%</div>
                        <div style="color: var(--theme-2);">+ Community land trust allocation: 80%</div>
                        <div style="color: var(--theme-2);">+ Resident oversight committee required</div>
                    </div>
                `;
                
                // Show relational data for legislation
                relations.style.display = 'block';
                relations.innerHTML = `
                    <div class="sponsors-section">
                        <h4 style="margin-bottom: 1rem;">Sponsors</h4>
                        <p style="font-size: 0.813rem; color: var(--text-secondary); margin-bottom: 1rem;">
                            Recent voting history on housing-related bills (Y=Yes, N=No, A=Abstain)
                        </p>
                        
                        <div class="sponsor-card" onclick="viewLegislatorProfile('cm-johnson')">
                            <div class="sponsor-avatar">CJ</div>
                            <div class="sponsor-info">
                                <div class="sponsor-name">Council Member Carolyn Johnson</div>
                                <div class="sponsor-role">District 5 • Lead Sponsor</div>
                                <div class="voting-record" title="Recent voting record on housing issues">
                                    <div class="vote-indicator vote-yes">Y</div>
                                    <div class="vote-indicator vote-yes">Y</div>
                                    <div class="vote-indicator vote-no">N</div>
                                    <div class="vote-indicator vote-yes">Y</div>
                                    <div class="vote-indicator vote-abstain">A</div>
                                </div>
                            </div>
                            <div class="sponsor-stats">
                                <div class="sponsor-stat">
                                    <span class="sponsor-stat-value">12</span>
                                    <span>Bills</span>
                                </div>
                                <div class="sponsor-stat">
                                    <span class="sponsor-stat-value">83%</span>
                                    <span>Yes</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sponsor-card" onclick="viewLegislatorProfile('cm-davis')">
                            <div class="sponsor-avatar">MD</div>
                            <div class="sponsor-info">
                                <div class="sponsor-name">Council Member Marcus Davis</div>
                                <div class="sponsor-role">District 8 • Co-Sponsor</div>
                                <div class="voting-record" title="Recent voting record on housing issues">
                                    <div class="vote-indicator vote-yes">Y</div>
                                    <div class="vote-indicator vote-yes">Y</div>
                                    <div class="vote-indicator vote-yes">Y</div>
                                    <div class="vote-indicator vote-yes">Y</div>
                                    <div class="vote-indicator vote-no">N</div>
                                </div>
                            </div>
                            <div class="sponsor-stats">
                                <div class="sponsor-stat">
                                    <span class="sponsor-stat-value">8</span>
                                    <span>Bills</span>
                                </div>
                                <div class="sponsor-stat">
                                    <span class="sponsor-stat-value">91%</span>
                                    <span>Yes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="related-section">
                        <h4 style="margin-bottom: 1rem;">Related Legislation by These Sponsors</h4>
                        
                        <div class="related-item">
                            <span class="related-type legislation">BL2024-089</span>
                            <span style="flex: 1;">Tenant Rights Protection Act</span>
                            <span style="color: var(--theme-2); font-size: 0.813rem;">Passed</span>
                        </div>
                        
                        <div class="related-item">
                            <span class="related-type legislation">BL2024-056</span>
                            <span style="flex: 1;">Community Land Trust Pilot Program</span>
                            <span style="color: var(--theme-2); font-size: 0.813rem;">Passed</span>
                        </div>
                        
                        <div class="related-item">
                            <span class="related-type legislation">BL2023-234</span>
                            <span style="flex: 1;">Inclusionary Zoning Update</span>
                            <span style="color: #e74c3c; font-size: 0.813rem;">Failed</span>
                        </div>
                    </div>
                    
                    <div class="timeline-section">
                        <h4 style="margin-bottom: 1rem;">Bill Timeline</h4>
                        
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <div class="timeline-date">Oct 15, 2024</div>
                                <div class="timeline-event">Introduced to Council</div>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <div class="timeline-date">Oct 22, 2024</div>
                                <div class="timeline-event">Housing Committee Review</div>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <div class="timeline-date">Nov 1, 2024</div>
                                <div class="timeline-event">Amendments Added</div>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-marker" style="border-color: var(--theme-4);"></div>
                            <div class="timeline-content">
                                <div class="timeline-date">Nov 15, 2024</div>
                                <div class="timeline-event" style="color: var(--theme-4);">Scheduled for Vote</div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                relations.style.display = 'none';
                body.innerHTML = `<p>${excerpt}</p>
                    <p style="margin-top: 1rem;">Full content would be loaded here, including any additional context, links to related items, and supporting documents.</p>`;
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function viewLegislatorProfile(legislatorId) {
            // Store modal state before closing
            storeModalState();
            
            // Close modal
            closeModal();
            
            // Hide main content
            document.querySelector('.intro').style.display = 'none';
            document.querySelector('.content-types').style.display = 'none';
            document.querySelector('.theme-filters').style.display = 'none';
            document.querySelector('.main-content').style.display = 'none';
            
            // Create legislator profile page
            const profileContent = document.createElement('div');
            profileContent.className = 'full-page-content';
            profileContent.style.cssText = `
                max-width: 1200px;
                margin: 2rem auto;
                padding: 0 2rem;
            `;
            
            const legislatorName = legislatorId === 'cm-johnson' ? 'Carolyn Johnson' : 'Marcus Davis';
            const district = legislatorId === 'cm-johnson' ? '5' : '8';
            
            profileContent.innerHTML = `
                <!-- Breadcrumb -->
                <div style="margin-bottom: 2rem; display: flex; gap: 1rem;">
                    <button onclick="returnToMain()" style="
                        background: none;
                        border: none;
                        color: var(--theme-1);
                        cursor: pointer;
                        font-size: 0.875rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0;
                    ">
                        ← Back to All Updates
                    </button>
                    ${lastModalData ? `
                    <span style="color: var(--text-tertiary);">|</span>
                    <button onclick="restoreModal()" style="
                        background: none;
                        border: none;
                        color: var(--theme-1);
                        cursor: pointer;
                        font-size: 0.875rem;
                        padding: 0;
                    ">
                        Back to Legislation Details
                    </button>
                    ` : ''}
                </div>
                
                <!-- Profile Header -->
                <div style="background: var(--bg-secondary); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; border: 1px solid var(--border);">
                    <div style="display: flex; gap: 2rem; align-items: center;">
                        <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: 600;">
                            ${legislatorId === 'cm-johnson' ? 'CJ' : 'MD'}
                        </div>
                        <div style="flex: 1;">
                            <h1 style="font-size: 2rem; font-family: 'Playfair Display', serif; margin-bottom: 0.5rem;">Council Member ${legislatorName}</h1>
                            <p style="color: var(--text-secondary); margin-bottom: 1rem;">District ${district} • Serving since 2019</p>
                            <div style="display: flex; gap: 3rem;">
                                <div>
                                    <div style="font-size: 1.5rem; font-weight: 600; color: var(--theme-1);">24</div>
                                    <div style="font-size: 0.813rem; color: var(--text-secondary);">Bills Sponsored</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.5rem; font-weight: 600; color: var(--theme-2);">87%</div>
                                    <div style="font-size: 0.813rem; color: var(--text-secondary);">Support Rate</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.5rem; font-weight: 600; color: var(--theme-4);">3</div>
                                    <div style="font-size: 0.813rem; color: var(--text-secondary);">Committees</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <h2 style="margin-bottom: 1.5rem;">Recent Sponsored Legislation</h2>
                <div style="display: grid; gap: 1rem; margin-bottom: 3rem;">
                    <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border); cursor: pointer;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Affordable Housing Trust Fund Restructuring Act</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">Shifts funding to community land trusts with resident oversight</p>
                            </div>
                            <span style="background: rgba(243, 156, 18, 0.1); color: var(--theme-4); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem;">Pending</span>
                        </div>
                    </div>
                    <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border); cursor: pointer;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Tenant Rights Protection Act</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">Enhanced protections against unfair evictions</p>
                            </div>
                            <span style="background: rgba(39, 174, 96, 0.1); color: var(--theme-2); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem;">Passed</span>
                        </div>
                    </div>
                </div>
                
                <!-- Voting Record -->
                <h2 style="margin-bottom: 1.5rem;">Voting Record by Theme</h2>
                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Governing without Coercion</span>
                            <div style="display: flex; gap: 0.25rem;">
                                <div class="vote-indicator vote-yes">Y</div>
                                <div class="vote-indicator vote-yes">Y</div>
                                <div class="vote-indicator vote-yes">Y</div>
                                <div class="vote-indicator vote-no">N</div>
                                <div class="vote-indicator vote-yes">Y</div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Power & Resources</span>
                            <div style="display: flex; gap: 0.25rem;">
                                <div class="vote-indicator vote-yes">Y</div>
                                <div class="vote-indicator vote-yes">Y</div>
                                <div class="vote-indicator vote-abstain">A</div>
                                <div class="vote-indicator vote-yes">Y</div>
                                <div class="vote-indicator vote-yes">Y</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Insert after header
            document.querySelector('.header').insertAdjacentElement('afterend', profileContent);
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        function expandToFullPage() {
            // Store modal state before closing
            storeModalState();
            
            // Store current modal data
            const currentTitle = document.getElementById('modal-title').textContent;
            const currentType = document.getElementById('modal-type').innerHTML;
            const currentThemes = document.getElementById('modal-themes').innerHTML;
            const currentStats = document.getElementById('modal-stats').innerHTML;
            
            // Close modal first
            closeModal();
            
            // Hide main content
            document.querySelector('.intro').style.display = 'none';
            document.querySelector('.content-types').style.display = 'none';
            document.querySelector('.theme-filters').style.display = 'none';
            document.querySelector('.main-content').style.display = 'none';
            
            // Create full page content
            const fullPageContent = document.createElement('div');
            fullPageContent.className = 'full-page-content';
            fullPageContent.style.cssText = `
                max-width: 1200px;
                margin: 2rem auto;
                padding: 0 2rem;
            `;
            
            fullPageContent.innerHTML = `
                <!-- Breadcrumb -->
                <div style="margin-bottom: 2rem; display: flex; gap: 1rem; align-items: center;">
                    <button onclick="returnToMain()" style="
                        background: none;
                        border: none;
                        color: var(--theme-1);
                        cursor: pointer;
                        font-size: 0.875rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0;
                    ">
                        ← Back to All Updates
                    </button>
                    <span style="color: var(--text-tertiary);">|</span>
                    <button onclick="restoreModal()" style="
                        background: none;
                        border: none;
                        color: var(--theme-1);
                        cursor: pointer;
                        font-size: 0.875rem;
                        padding: 0;
                    ">
                        Back to Quick View
                    </button>
                </div>
                
                <!-- Page Header -->
                <div style="background: var(--bg-secondary); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; border: 1px solid var(--border);">
                    <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem;">
                        ${currentType}
                        <div style="margin-left: auto;">${currentStats}</div>
                    </div>
                    <h1 style="font-size: 2rem; font-family: 'Playfair Display', serif; margin-bottom: 1rem;">${currentTitle}</h1>
                    <div class="theme-tags">${currentThemes}</div>
                </div>
                
                <!-- Tab Navigation -->
                <nav style="background: var(--bg-card); margin: 0 -2rem 2rem; padding: 0.5rem 2rem; border-bottom: 1px solid var(--border); overflow-x: auto;">
                    <div style="display: flex; gap: 0.75rem; min-width: fit-content;">
                        <button class="page-tab active" onclick="switchTab('overview')">Overview</button>
                        <button class="page-tab" onclick="switchTab('full-text')">Full Text</button>
                        <button class="page-tab" onclick="switchTab('history')">History</button>
                        <button class="page-tab" onclick="switchTab('votes')">Votes</button>
                        <button class="page-tab" onclick="switchTab('impact')">Impact</button>
                        <button class="page-tab" onclick="switchTab('discussion')">Discussion</button>
                    </div>
                </nav>
                
                <!-- Content Area -->
                <div id="tab-content">
                    <div class="tab-panel" id="overview-panel">
                        <!-- Overview Content -->
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                            <div>
                                <h2 style="margin-bottom: 1rem;">Summary</h2>
                                <p style="line-height: 1.8; margin-bottom: 2rem;">
                                    This legislation proposes significant changes to Nashville's Affordable Housing Trust Fund, 
                                    shifting the allocation model to prioritize community land trusts and establishing 
                                    mandatory resident oversight committees.
                                </p>
                                
                                <h3 style="margin-bottom: 1rem;">Key Changes</h3>
                                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                        <span style="color: var(--type-news);">-</span>
                                        <span>Developer allocation: 80%</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                        <span style="color: var(--theme-2);">+</span>
                                        <span>Community land trust allocation: 80%</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <span style="color: var(--theme-2);">+</span>
                                        <span>Resident oversight committee required</span>
                                    </div>
                                </div>
                                
                                <h3 style="margin: 2rem 0 1rem;">Sponsors</h3>
                                <div id="sponsor-list"></div>
                            </div>
                            
                            <div>
                                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                                    <h4 style="margin-bottom: 1rem;">Quick Stats</h4>
                                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                                        <div>
                                            <div style="font-size: 0.813rem; color: var(--text-secondary);">Status</div>
                                            <div style="font-weight: 600; color: var(--theme-4);">Pending Vote</div>
                                        </div>
                                        <div>
                                            <div style="font-size: 0.813rem; color: var (--text-secondary);">Vote Date</div>
                                            <div style="font-weight: 600;">November 15, 2024</div>
                                        </div>
                                        <div>
                                            <div style="font-size: 0.813rem; color: var(--text-secondary);">Committee</div>
                                            <div style="font-weight: 600;">Housing & Neighborhoods</div>
                                        </div>
                                        <div>
                                            <div style="font-size: 0.813rem; color: var(--text-secondary);">District Impact</div>
                                            <div style="font-weight: 600;">City-wide</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                                    <h4 style="margin-bottom: 1rem;">Related Links</h4>
                                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            📄 Download Full Text (PDF)
                                        </a>
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            📊 Financial Impact Report
                                        </a>
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            🗺️ View District Map
                                        </a>
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            📧 Contact Sponsors
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Insert after header
            document.querySelector('.header').insertAdjacentElement('afterend', fullPageContent);
            
            // Add sponsor data
            const sponsorList = fullPageContent.querySelector('#sponsor-list');
            sponsorList.innerHTML = document.querySelector('.sponsors-section')?.innerHTML || '<p>Loading sponsor information...</p>';
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        function returnToMain() {
            // Remove full page content
            const fullPage = document.querySelector('.full-page-content');
            if (fullPage) fullPage.remove();
            
            // Show main content again
            document.querySelector('.intro').style.display = '';
            document.querySelector('.content-types').style.display = '';
            document.querySelector('.theme-filters').style.display = '';
            document.querySelector('.main-content').style.display = '';
            
            // Clear stored modal state
            lastModalData = null;
        }
        
        function restoreModal() {
            // Return to main first
            returnToMain();
            
            // Restore modal with previous state
            if (lastModalData) {
                const modal = document.getElementById('modal');
                document.getElementById('modal-title').textContent = lastModalData.title;
                document.getElementById('modal-type').innerHTML = lastModalData.type;
                document.getElementById('modal-themes').innerHTML = lastModalData.themes;
                document.getElementById('modal-stats').innerHTML = lastModalData.stats;
                document.getElementById('modal-date').textContent = lastModalData.date;
                document.getElementById('modal-author').textContent = lastModalData.author;
                document.getElementById('modal-body').innerHTML = lastModalData.body;
                
                const relations = document.getElementById('modal-relations');
                if (relations && lastModalData.relations) {
                    relations.innerHTML = lastModalData.relations;
                    relations.style.display = 'block';
                }
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        function switchTab(tabName) {
            // Update active tab
            document.querySelectorAll('.page-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Update content (in real implementation, would load different content)
            const content = document.getElementById('tab-content');
            
            if (tabName === 'overview') {
                content.innerHTML = `
                    <div class="tab-panel" id="overview-panel">
                        <!-- Overview Content -->
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                            <div>
                                <h2 style="margin-bottom: 1rem;">Summary</h2>
                                <p style="line-height: 1.8; margin-bottom: 2rem;">
                                    This legislation proposes significant changes to Nashville's Affordable Housing Trust Fund, 
                                    shifting the allocation model to prioritize community land trusts and establishing 
                                    mandatory resident oversight committees.
                                </p>
                                
                                <h3 style="margin-bottom: 1rem;">Key Changes</h3>
                                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                        <span style="color: var(--type-news);">-</span>
                                        <span>Developer allocation: 80%</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                        <span style="color: var(--theme-2);">+</span>
                                        <span>Community land trust allocation: 80%</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <span style="color: var(--theme-2);">+</span>
                                        <span>Resident oversight committee required</span>
                                    </div>
                                </div>
                                
                                <h3 style="margin: 2rem 0 1rem;">Sponsors</h3>
                                <div id="sponsor-list-full"></div>
                            </div>
                            
                            <div>
                                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                                    <h4 style="margin-bottom: 1rem;">Quick Stats</h4>
                                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                                        <div>
                                            <div style="font-size: 0.813rem; color: var(--text-secondary);">Status</div>
                                            <div style="font-weight: 600; color: var(--theme-4);">Pending Vote</div>
                                        </div>
                                        <div>
                                            <div style="font-size: 0.813rem; color: var(--text-secondary);">Vote Date</div>
                                            <div style="font-weight: 600;">November 15, 2024</div>
                                        </div>
                                        <div>
                                            <div style="font-size: 0.813rem; color: var(--text-secondary);">Committee</div>
                                            <div style="font-weight: 600;">Housing & Neighborhoods</div>
                                        </div>
                                        <div>
                                            <div style="font-size: 0.813rem; color: var(--text-secondary);">District Impact</div>
                                            <div style="font-weight: 600;">City-wide</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                                    <h4 style="margin-bottom: 1rem;">Related Links</h4>
                                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            📄 Download Full Text (PDF)
                                        </a>
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            📊 Financial Impact Report
                                        </a>
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            🗺️ View District Map
                                        </a>
                                        <a href="#" style="color: var(--theme-1); text-decoration: none; font-size: 0.875rem;">
                                            📧 Contact Sponsors
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                // Copy sponsor data if it exists
                const sponsorList = document.querySelector('.sponsors-section');
                if (sponsorList) {
                    const fullSponsorList = content.querySelector('#sponsor-list-full');
                    if (fullSponsorList) {
                        fullSponsorList.innerHTML = sponsorList.innerHTML;
                    }
                }
            } else if (tabName === 'full-text') {
                content.innerHTML = `
                    <div class="tab-panel">
                        <h2 style="margin-bottom: 1.5rem;">Full Legislative Text</h2>
                        <div style="background: var(--bg-card); padding: 2rem; border-radius: 8px; font-family: 'Georgia', serif; line-height: 1.8;">
                            <h3 style="margin-bottom: 1rem;">BL2024-123</h3>
                            <p style="margin-bottom: 1rem;"><strong>AN ORDINANCE</strong> to amend Title 16 of the Metropolitan Code of Laws relative to the Affordable Housing Trust Fund.</p>
                            <p style="margin-bottom: 1rem;"><strong>WHEREAS</strong>, the Metropolitan Government recognizes the critical need for affordable housing; and</p>
                            <p style="margin-bottom: 1rem;"><strong>WHEREAS</strong>, community land trusts have proven effective in preserving long-term affordability...</p>
                            <p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">[Full text would continue here...]</p>
                        </div>
                    </div>
                `;
            } else if (tabName === 'votes') {
                content.innerHTML = `
                    <div class="tab-panel">
                        <h2 style="margin-bottom: 1.5rem;">Council Member Votes</h2>
                        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Vote scheduled for November 15, 2024</p>
                            <p>Current projected votes based on committee positions and public statements:</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
                                <div style="padding: 1rem; background: rgba(39, 174, 96, 0.1); border-radius: 8px;">
                                    <div style="font-weight: 600; color: var(--theme-2);">Supporting (18)</div>
                                    <div style="font-size: 0.813rem; margin-top: 0.5rem;">Districts 1, 3, 5, 8, 9, 11...</div>
                                </div>
                                <div style="padding: 1rem; background: rgba(231, 76, 60, 0.1); border-radius: 8px;">
                                    <div style="font-weight: 600; color: #e74c3c;">Opposing (12)</div>
                                    <div style="font-size: 0.813rem; margin-top: 0.5rem;">Districts 2, 4, 7, 10, 14...</div>
                                </div>
                                <div style="padding: 1rem; background: rgba(160, 170, 180, 0.1); border-radius: 8px;">
                                    <div style="font-weight: 600; color: var(--text-tertiary);">Undecided (7)</div>
                                    <div style="font-size: 0.813rem; margin-top: 0.5rem;">Districts 6, 12, 13...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (tabName === 'history') {
                content.innerHTML = `
                    <div class="tab-panel">
                        <h2 style="margin-bottom: 1.5rem;">Legislative History</h2>
                        <div id="timeline-content"></div>
                    </div>
                `;
                // Copy timeline from modal if it exists
                const timeline = document.querySelector('.timeline-section');
                if (timeline) {
                    document.getElementById('timeline-content').innerHTML = timeline.innerHTML;
                }
            } else if (tabName === 'impact') {
                content.innerHTML = `
                    <div class="tab-panel">
                        <h2 style="margin-bottom: 1.5rem;">Financial & Community Impact</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                                <h3 style="margin-bottom: 1rem; color: var(--theme-2);">Projected Benefits</h3>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: 0.75rem;">✓ 500+ affordable units preserved annually</li>
                                    <li style="margin-bottom: 0.75rem;">✓ $15M redirected to community ownership</li>
                                    <li style="margin-bottom: 0.75rem;">✓ 30% reduction in displacement risk</li>
                                </ul>
                            </div>
                            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                                <h3 style="margin-bottom: 1rem; color: var(--theme-4);">Implementation Costs</h3>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: 0.75rem;">• $250K for oversight committee setup</li>
                                    <li style="margin-bottom: 0.75rem;">• $100K annual administrative costs</li>
                                    <li style="margin-bottom: 0.75rem;">• No net increase to budget</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            } else if (tabName === 'discussion') {
                content.innerHTML = `
                    <div class="tab-panel">
                        <h2 style="margin-bottom: 1.5rem;">Public Discussion</h2>
                        <div style="display: grid; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                    <span style="font-weight: 600;">@housingforall</span>
                                    <span style="color: var(--text-secondary); font-size: 0.813rem;">2 days ago</span>
                                </div>
                                <p>This is exactly what we've been advocating for. Community land trusts have proven successful in other cities at preserving affordability long-term.</p>
                                <div style="display: flex; gap: 1rem; margin-top: 1rem; font-size: 0.813rem; color: var(--text-secondary);">
                                    <span>👍 234</span>
                                    <span>💬 Reply</span>
                                    <span>🔗 Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        function closeModal() {
            const modal = document.getElementById('modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // About modal functions
        function openAboutModal() {
            const modal = document.getElementById('about-modal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeAboutModal() {
            const modal = document.getElementById('about-modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close modals when clicking backdrop
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        document.getElementById('about-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeAboutModal();
            }
        });

        // Close modals with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
                closeAboutModal();
            }
        });
