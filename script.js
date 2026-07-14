// ===== MÁSCARA PARA TELEFONE (lead) =====
document.addEventListener('DOMContentLoaded', function() {
  const inputTel = document.getElementById('whatsapp');
  if (inputTel) {
    inputTel.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 2) {
        value = `(${value.slice(0,2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = value.slice(0, 10) + '-' + value.slice(10);
      }
      e.target.value = value;
    });
  }

  // ===== SALVAR DADOS DO LEAD NO SESSIONSTORAGE =====
  const formLead = document.querySelector('form[name="lead-form"]');
  if (formLead) {
    formLead.addEventListener('submit', function(e) {
      const nome = document.getElementById('nome').value.trim();
      const whatsapp = document.getElementById('whatsapp').value.trim();
      const email = document.getElementById('email').value.trim();
      const cidade = document.getElementById('cidade').value.trim();
      const queixa = document.getElementById('queixa').value.trim();
      sessionStorage.setItem('leadData', JSON.stringify({
        nome, whatsapp, email, cidade, queixa
      }));
    });
  }

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});