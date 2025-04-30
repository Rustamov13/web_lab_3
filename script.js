// Dynamic Resume Script with Editable & Addable Sections

document.addEventListener('DOMContentLoaded', () => {
    /*** Lab2: Creative Interactions ***/
    // Typing effect for name header
    const nameEl = document.querySelector('h1');
    const fullText = nameEl.textContent.trim();
    nameEl.textContent = '';
    let idx = 0;
    const typeInterval = setInterval(() => {
      if (idx < fullText.length) nameEl.textContent += fullText[idx++];
      else clearInterval(typeInterval);
    }, 100);
  
    // Fade-in on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.section, .contact, .sidebar img').forEach(el => observer.observe(el));
  
    // Collapsible sidebar
    document.querySelectorAll('.sidebar h2').forEach(heading => {
      const content = heading.nextElementSibling;
      if (content) content.classList.add('collapsed');
      heading.addEventListener('click', () => {
        heading.classList.toggle('open');
        content && content.classList.toggle('collapsed');
      });
    });
  
    // Animate skill bars
    function animateSkillBars() {
      document.querySelectorAll('.skill-bar').forEach(bar => {
        const pct = bar.dataset.level;
        bar.style.width = '0%';
        setTimeout(() => bar.style.width = pct + '%', 300);
      });
    }
  
    /*** Lab3: Dynamic Data ***/
    let resumeData = {
      contact: { phone: '+994-50-123-45-56', email: 'Richard.Qarabala@gmail.com', location: 'Kurdamir', website: 'Qarabala.com' },
      education: [ { degree: 'M.Sc. Computer Science', school: 'Wardiere University', period: '2029 - 2030' }, { degree: 'B.Eng. Computer Engineering', school: 'Wardiere University', period: '2025 - 2029', gpa: '3.8/4.0' } ],
      skills: [ { name: 'JavaScript', level: 90 }, { name: 'React', level: 85 }, { name: 'Node.js', level: 80 } ],
      languages: ['English', 'French', 'German (basic)', 'Spanish (intermediate)'],
      profile: 'I’m a passionate Software Developer with a strong background in building scalable web applications...',
      workExperience: [ { role: 'Full-Stack Developer', company: 'CodeCraft Labs', period: '2029 - Present' }, { role: 'Backend Developer', company: 'DevBridge Studio', period: '2025 - 2029' }, { role: 'Junior Web Developer', company: 'TechNest Solutions', period: '2024 - 2025' } ],
      references: [ { name: 'Estelle Darcy', title: 'CTO, Wardiere Inc.', phone: '+994-50-123-45-56', email: 'Richard.Qarabala@gmail.com' } ]
    };
  
    // Helper to render a section
    function renderSection(selector, html) {
      document.querySelector(selector).innerHTML = html;
    }
  
    // Master render function
    function renderAll() {
      // Contact
      renderSection('.contact', `
        <h2>CONTACT</h2>
        <p>${resumeData.contact.phone}</p>
        <p>${resumeData.contact.email}</p>
        <p>${resumeData.contact.location}</p>
        <p>${resumeData.contact.website}</p>
      `);
  
      // Education
      renderSection('#education', `
        <h2>EDUCATION</h2>
        ${resumeData.education.map((ed, i) => `
          <div class="edu-item">
            <strong>${ed.degree}</strong> @ ${ed.school} | ${ed.period}${ed.gpa ? ' | GPA: ' + ed.gpa : ''}
            <button class="edit-edu" data-index="${i}">Edit</button>
          </div>
        `).join('')}
        <button id="addEdu">Add Education</button>
      `);
  
      // Skills
      renderSection('.skills', `
        <h2>SKILLS</h2>
      `);
  
      // Languages
      renderSection('#languages', `
        <h2>LANGUAGES</h2>
        ${resumeData.languages.map((lang, i) => `
          <div class="lang-item">
            ${lang} <button class="edit-lang" data-index="${i}">Edit</button>
          </div>
        `).join('')}
        <button id="addLang">Add Language</button>
      `);
  
      // Profile
      renderSection('#profile', `
        <h2>PROFILE</h2>
        <p>${resumeData.profile}</p>
        <button id="editProfile">Edit Profile</button>
      `);
  
      // Work Experience
      renderSection('#work-experience', `
        <h2>WORK EXPERIENCE</h2>
        ${resumeData.workExperience.map((we, i) => `
          <div class="we-item">
            <strong>${we.role}</strong> @ ${we.company} | ${we.period}
            <button class="edit-we" data-index="${i}">Edit</button>
          </div>
        `).join('')}
        <button id="addWE">Add Experience</button>
      `);
  
      // References
      renderSection('#reference', `
        <h2>REFERENCES</h2>
        ${resumeData.references.map((ref, i) => `
          <div class="ref-item">
            ${ref.name}, ${ref.title}<br>
            ${ref.phone} | ${ref.email}
            <button class="edit-ref" data-index="${i}">Edit</button>
          </div>
        `).join('')}
        <button id="addRef">Add Reference</button>
      `);
  
      animateSkillBars();
    }
  
    // Initial render
    renderAll();
  
    // Event delegation for edits and adds
    document.body.addEventListener('click', e => {
      const idx = e.target.dataset.index;
      switch (true) {
        case e.target.matches('.edit-edu'):
          const ed = resumeData.education[idx];
          const deg = prompt('Degree:', ed.degree);
          const school = prompt('School:', ed.school);
          const period = prompt('Period:', ed.period);
          const gpa = prompt('GPA (optional):', ed.gpa || '');
          if (deg && school && period) resumeData.education[idx] = { degree: deg, school, period, gpa: gpa || undefined };
          renderAll();
          break;
        case e.target.id === 'addEdu':
          const newDeg = prompt('Degree:');
          const newSchool = prompt('School:');
          const newPeriod = prompt('Period:');
          const newGpa = prompt('GPA (optional):');
          if (newDeg && newSchool && newPeriod) resumeData.education.push({ degree: newDeg, school: newSchool, period: newPeriod, gpa: newGpa || undefined });
          renderAll();
          break;
        case e.target.matches('.edit-skill'):
          const sk = resumeData.skills[idx];
          const name = prompt('Skill name:', sk.name);
          const lvl = prompt('Level (0-100):', sk.level);
          if (name && lvl) resumeData.skills[idx] = { name, level: parseInt(lvl) };
          renderAll();
          break;
        case e.target.id === 'addSkill':
          const addName = prompt('Skill name:');
          const addLvl = prompt('Level (0-100):');
          if (addName && addLvl) resumeData.skills.push({ name: addName, level: parseInt(addLvl) });
          renderAll();
          break;
        case e.target.matches('.edit-lang'):
          const oldLang = resumeData.languages[idx];
          const updatedLang = prompt('Language:', oldLang);
          if (updatedLang) resumeData.languages[idx] = updatedLang;
          renderAll();
          break;
        case e.target.id === 'addLang':
          const newLang = prompt('Language:');
          if (newLang) resumeData.languages.push(newLang);
          renderAll();
          break;
        case e.target.id === 'editProfile':
          const newProf = prompt('Profile text:', resumeData.profile);
          if (newProf) resumeData.profile = newProf;
          renderAll();
          break;
        case e.target.matches('.edit-we'):
          const we = resumeData.workExperience[idx];
          const r = prompt('Role:', we.role);
          const c = prompt('Company:', we.company);
          const p = prompt('Period:', we.period);
          if (r && c && p) resumeData.workExperience[idx] = { role: r, company: c, period: p };
          renderAll();
          break;
        case e.target.id === 'addWE':
          const ar = prompt('Role:'); const ac = prompt('Company:'); const ap = prompt('Period:');
          if (ar && ac && ap) resumeData.workExperience.push({ role: ar, company: ac, period: ap });
          renderAll();
          break;
        case e.target.matches('.edit-ref'):
          const ref = resumeData.references[idx];
          const rn = prompt('Name:', ref.name);
          const rt = prompt('Title:', ref.title);
          const rp = prompt('Phone:', ref.phone);
          const re = prompt('Email:', ref.email);
          if (rn && rt) resumeData.references[idx] = { name: rn, title: rt, phone: rp, email: re };
          renderAll();
          break;
        case e.target.id === 'addRef':
          const newRefName = prompt('Name:');
          const newRefTitle = prompt('Title:');
          const newRefPhone = prompt('Phone:');
          const newRefEmail = prompt('Email:');
          if (newRefName && newRefTitle) resumeData.references.push({ name: newRefName, title: newRefTitle, phone: newRefPhone, email: newRefEmail });
          renderAll();
          break;
      }
    });
  });
  