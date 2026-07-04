(() => {
  'use strict';

  const loginPanel = document.querySelector('[data-login-panel]');
  const dashboard = document.querySelector('[data-member-dashboard]');
  const status = document.querySelector('[data-member-status]');
  const loginForm = document.querySelector('[data-member-login-form]');

  if (!loginPanel || !dashboard || !loginForm) return;

  const sessionKey = 'brilliant-member-session';
  const attendanceKey = 'brilliant-member-attendance-current';
  const baseResponses = [];

  const labels = {
    yes: '参加',
    late: '遅れる',
    no: '欠席'
  };

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(sessionKey) || 'null');
    } catch {
      return null;
    }
  }

  function setSession(session) {
    localStorage.setItem(sessionKey, JSON.stringify(session));
  }

  function getAttendance() {
    try {
      return JSON.parse(localStorage.getItem(attendanceKey) || 'null');
    } catch {
      return null;
    }
  }

  function setAttendance(attendance) {
    localStorage.setItem(attendanceKey, JSON.stringify(attendance));
  }

  function showDashboard(session) {
    loginPanel.classList.add('hidden');
    dashboard.classList.remove('hidden');
    status.textContent = `${session.name}でログイン中`;
    renderAttendance(session);
    dashboard.scrollIntoView({ block: 'start' });
  }

  function showLogin() {
    loginPanel.classList.remove('hidden');
    dashboard.classList.add('hidden');
    status.textContent = 'ログイン前';
  }

  function renderAttendance(session) {
    const saved = getAttendance();
    const current = saved && saved.email === session.email ? saved : null;
    const answers = document.querySelectorAll('[data-attendance-answer]');
    const message = document.querySelector('[data-attendance-message]');
    const comment = document.querySelector('[data-attendance-comment]');

    answers.forEach(button => {
      button.classList.toggle('is-active', current?.answer === button.dataset.attendanceAnswer);
    });
    if (comment) comment.value = current?.comment || '';
    if (message) {
      message.textContent = current
        ? `${labels[current.answer]}で保存済みです。`
        : 'まだ回答していません。';
    }

    const rows = baseResponses.concat(current ? [{ name: session.name, answer: current.answer, comment: current.comment }] : []);
    const counts = rows.reduce((acc, row) => {
      acc[row.answer] += 1;
      return acc;
    }, { yes: 0, late: 0, no: 0 });

    document.querySelector('[data-count-yes]').textContent = counts.yes;
    document.querySelector('[data-count-late]').textContent = counts.late;
    document.querySelector('[data-count-no]').textContent = counts.no;

    const list = document.querySelector('[data-attendance-list]');
    if (list) {
      list.innerHTML = rows.map(row => `
        <li>
          <b>${row.name}</b>
          <span>${labels[row.answer]}</span>
          <p>${row.comment || 'コメントなし'}</p>
        </li>
      `).join('');
    }
  }

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const session = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim()
    };
    if (!session.name || !session.email) return;
    setSession(session);
    showDashboard(session);
  });

  document.querySelectorAll('[data-attendance-answer]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-attendance-answer]').forEach(item => item.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });

  document.querySelector('[data-attendance-save]')?.addEventListener('click', () => {
    const session = getSession();
    if (!session) return;
    const active = document.querySelector('[data-attendance-answer].is-active');
    const message = document.querySelector('[data-attendance-message]');
    if (!active) {
      if (message) message.textContent = '参加・遅れる・欠席のどれかを選んでください。';
      return;
    }
    const attendance = {
      email: session.email,
      name: session.name,
      answer: active.dataset.attendanceAnswer,
      comment: document.querySelector('[data-attendance-comment]')?.value.trim() || ''
    };
    setAttendance(attendance);
    renderAttendance(session);
  });

  document.querySelector('[data-member-logout]')?.addEventListener('click', () => {
    localStorage.removeItem(sessionKey);
    showLogin();
  });

  const session = getSession();
  if (session) showDashboard(session);
})();
