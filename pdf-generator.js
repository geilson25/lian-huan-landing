function gerarPDF(dados) {
  // Verifica se as bibliotecas estão carregadas
  if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
    alert('Bibliotecas não carregadas. Verifique sua conexão com a internet.');
    return;
  }
  
  const { jsPDF } = window.jspdf;
  const { html2canvas } = window;

  // Cria um container invisível para o template
  const template = document.createElement('div');
  template.style.position = 'fixed';
  template.style.left = '-9999px';
  template.style.top = '0';
  template.style.width = '794px'; // Tamanho A4 em pixels (96dpi)
  template.style.background = '#ffffff';
  template.style.padding = '40px';
  template.style.fontFamily = "'Open Sans', sans-serif";
  template.style.color = '#1e2b2a';
  
  // Monta o HTML do template
  template.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@300;400;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Open Sans', sans-serif; color: #1e2b2a; }
      .header { 
        text-align: center; 
        border-bottom: 3px solid #d4a017; 
        padding-bottom: 20px; 
        margin-bottom: 25px;
      }
      .header .logo { 
        font-family: 'Playfair Display', serif; 
        font-size: 32px; 
        font-weight: 700; 
        color: #2a5c3a;
        letter-spacing: 2px;
      }
      .header .logo span { color: #d4a017; }
      .header .slogan { 
        font-size: 14px; 
        color: #666; 
        font-weight: 300;
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      .header .subtitle {
        font-size: 16px;
        color: #2a5c3a;
        font-weight: 600;
        margin-top: 4px;
      }
      .section {
        margin-bottom: 18px;
        border: 1px solid #e8e3da;
        border-radius: 8px;
        padding: 14px 18px;
        background: #fcfbf9;
      }
      .section-title {
        font-family: 'Playfair Display', serif;
        font-size: 18px;
        font-weight: 700;
        color: #2a5c3a;
        border-bottom: 2px solid #d4a017;
        padding-bottom: 6px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .section-title i { color: #d4a017; }
      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px 20px;
      }
      .grid-3 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 6px 15px;
      }
      .field {
        font-size: 12px;
        line-height: 1.6;
      }
      .field-label {
        font-weight: 600;
        color: #2a5c3a;
      }
      .field-value {
        font-weight: 400;
        color: #1e2b2a;
      }
      .checkbox-item {
        display: inline-block;
        background: #e8f0e6;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 11px;
        margin: 2px 4px 2px 0;
        color: #2a5c3a;
      }
      .checkbox-item::before {
        content: "✔ ";
        color: #d4a017;
        font-weight: 700;
      }
      .tag {
        display: inline-block;
        background: #f5f0e8;
        padding: 2px 12px;
        border-radius: 12px;
        font-size: 11px;
        margin: 2px 4px 2px 0;
        color: #5a4a3a;
      }
      .text-block {
        font-size: 12px;
        line-height: 1.6;
        background: #f8f6f0;
        padding: 8px 12px;
        border-radius: 6px;
        margin-top: 4px;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      .footer {
        margin-top: 25px;
        text-align: center;
        font-size: 11px;
        color: #888;
        border-top: 1px solid #e8e3da;
        padding-top: 15px;
      }
      .footer a {
        color: #2a5c3a;
        text-decoration: none;
      }
      .badge {
        display: inline-block;
        background: #2a5c3a;
        color: #fff;
        padding: 0 14px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    </style>
    <div class="header">
      <div class="logo">LIAN <span>HUAN</span></div>
      <div class="subtitle">Instituto de Medicina Tradicional Chinesa</div>
      <div class="slogan">Equilíbrio · Bem-Estar · Transformação</div>
    </div>

    <!-- DADOS PESSOAIS -->
    <div class="section">
      <div class="section-title">📋 Dados Pessoais</div>
      <div class="grid-2">
        <div class="field"><span class="field-label">Nome:</span> <span class="field-value">${dados.nome_completo || 'N/I'}</span></div>
        <div class="field"><span class="field-label">Data Nasc.:</span> <span class="field-value">${dados.data_nasc || 'N/I'}</span></div>
        <div class="field"><span class="field-label">Sexo:</span> <span class="field-value">${dados.sexo || 'N/I'}</span></div>
        <div class="field"><span class="field-label">Telefone:</span> <span class="field-value">${dados.telefone || 'N/I'}</span></div>
        <div class="field"><span class="field-label">E-mail:</span> <span class="field-value">${dados.email_anamnese || 'N/I'}</span></div>
        <div class="field"><span class="field-label">Profissão:</span> <span class="field-value">${dados.profissao || 'N/I'}</span></div>
        <div class="field"><span class="field-label">CPF:</span> <span class="field-value">${dados.cpf || 'N/I'}</span></div>
        <div class="field"><span class="field-label">CEP:</span> <span class="field-value">${dados.cep || 'N/I'}</span></div>
      </div>
      <div class="field" style="margin-top:4px;"><span class="field-label">Endereço:</span> <span class="field-value">${[dados.rua, dados.numero, dados.bairro, dados.cidade, dados.estado, dados.pais].filter(Boolean).join(', ') || 'N/I'}</span></div>
      ${dados.complemento ? `<div class="field"><span class="field-label">Complemento:</span> <span class="field-value">${dados.complemento}</span></div>` : ''}
    </div>

    <!-- QUEIXA E HISTÓRICO -->
    <div class="section">
      <div class="section-title">🩺 Queixa Principal</div>
      <div class="text-block">${dados.queixa_principal || 'N/I'}</div>
      ${dados.historico ? `<div style="margin-top:8px;"><span class="field-label">Histórico:</span><div class="text-block">${dados.historico}</div></div>` : ''}
    </div>

    <!-- SEÇÕES DE CHECKBOX -->
    ${gerarSecaoCheckboxes('🌡️ Temperatura Corporal', ['temp_friorento','temp_calorento','temp_misto'], dados)}
    ${gerarSecaoCheckboxes('💗 Emoções', ['emo_ansiedade','emo_raiva','emo_tristeza','emo_preocupacao','emo_medo'], dados)}
    ${gerarSecaoCheckboxes('🌙 Sono', ['sono_insonia','sono_delirio','sono_sonhos','sono_sonolencia'], dados)}
    ${gerarSecaoCheckboxes('💧 Sede', ['sede_pouca','sede_muita'], dados)}
    ${gerarSecaoCheckboxes('🍽️ Digestão', ['dig_diarreia_matinal','dig_gases_sem_emocional','dig_gases_com_emocional','dig_azia','dig_dor_fria','dig_arrotos','dig_dor_ardente','dig_dor_facada'], dados)}
    ${gerarSecaoCheckboxes('🚽 Urina', ['urina_turva','urina_escura','urina_profusa'], dados)}
    ${gerarSecaoCheckboxes('🧻 Intestinos', ['int_ressecadas','int_pastosas','int_tampao','int_muco','int_ardencia'], dados)}
    ${dados.sexo === 'Feminino' ? gerarSecaoCheckboxes('🌸 Menstruação', ['men_adianta','men_atrasa','men_irregular','men_tpm_distensao','men_tpm_coagulos'], dados) : ''}
    ${gerarSecaoCheckboxes('💧 Corrimentos', ['corr_branco','corr_amarelo','corr_vermelho','corr_escuro'], dados)}
    ${gerarSecaoCheckboxes('⚡ Síndromes Bi', ['bi_frio','bi_calor','bi_umidade','bi_vento','bi_ossea'], dados)}
    ${gerarSecaoCheckboxes('🩸 Sangue', ['sangue_tontura','sangue_caimbras','sangue_apetite'], dados)}
    ${gerarSecaoCheckboxes('👅 Sabores', ['sabor_salgado','sabor_picante','sabor_azedo','sabor_doce','sabor_amargo'], dados)}
    ${gerarSecaoCheckboxes('🫁 Respiração', ['resp_fraca','resp_forcada','resp_falta_ar','resp_dispneia','resp_suspiro','resp_tosse_rouca','resp_tosse_seca','resp_tosse_clara'], dados)}
    ${gerarSecaoCheckboxes('👁️ Olhos e Visão', ['olhos_fraca','olhos_turva','olhos_vermelhidão','olhos_secura','olhos_lacrimejamento'], dados)}
    ${gerarSecaoCheckboxes('👂 Ouvidos', ['ouv_zumbido','ouv_prurido','ouv_fraca','ouv_surdez','ouv_surdez_subita'], dados)}
    ${gerarSecaoCheckboxes('👃 Nariz', ['nariz_fraco','nariz_anosmia','nariz_coriza','nariz_prurido','nariz_obstrucao'], dados)}
    ${gerarSecaoCheckboxes('✋ Tato', ['tato_fraco'], dados)}
    ${gerarSecaoCheckboxes('👄 Boca e Gosto', ['boca_labios_azulados','boca_labios_palidos','boca_labios_brancos','boca_salivacao','boca_secura','boca_garganta_seca','boca_amarga','boca_sangramentos'], dados)}

    <!-- LÍNGUA -->
    <div class="section">
      <div class="section-title">👅 Língua</div>
      <div class="grid-3">
        <div class="field"><span class="field-label">Cor:</span> <span class="field-value">${dados.lingua_cor || 'N/A'}</span></div>
        <div class="field"><span class="field-label">Forma:</span> <span class="field-value">${dados.lingua_forma || 'N/A'}</span></div>
        <div class="field"><span class="field-label">Saburra:</span> <span class="field-value">${dados.lingua_saburra || 'N/A'}</span></div>
        <div class="field"><span class="field-label">Umidade:</span> <span class="field-value">${dados.lingua_umidade || 'N/A'}</span></div>
      </div>
      ${gerarTags(['lingua_palida_seca','lingua_palida_umida','lingua_vermelha','lingua_vermelha_areas','lingua_ulcerada','lingua_fissuras','lingua_purpura','lingua_saburra_branca','lingua_saburra_amarela','lingua_sem_saburra','lingua_denteada','lingua_inchada'], dados)}
    </div>

    <!-- PULSO -->
    <div class="section">
      <div class="section-title">💓 Pulso</div>
      <div>
        ${['pulso_rapido','pulso_lento','pulso_superficial','pulso_profundo','pulso_cheio','pulso_vazio','pulso_fino','pulso_corda','pulso_escorregadio','pulso_irregular']
          .filter(c => dados[c] === 'sim')
          .map(c => `<span class="tag">${c.replace('pulso_','').toUpperCase()}</span>`).join('') || 'N/A'}
      </div>
    </div>

    <!-- TEXTOS LONGOS -->
    ${gerarTextoLongo('💊 Medicação em uso', dados.medicacao)}
    ${gerarTextoLongo('🖐️ Palpação Shu e Mo', dados.palpacao_shu_mo)}
    ${gerarTextoLongo('👂 Palpação Auricular', dados.palpacao_auricular)}
    ${gerarTextoLongo('🌿 Fitoterápicos', dados.fitoterapicos)}

    <!-- PRESCRIÇÕES -->
    ${gerarSessoes(dados)}

    <!-- RODAPÉ -->
    <div class="footer">
      <p>
        <a href="https://www.instagram.com/lian_huan_instituto/">@lian_huan_instituto</a> 
        · 📞 (81) 98776-1012 
        · ✉️ contato@lianhuan.com.br
      </p>
      <p style="font-size:9px; color:#aaa; margin-top:4px;">
        Ficha de Anamnese · Lian Huan Instituto de Medicina Tradicional Chinesa
      </p>
    </div>
  `;

  document.body.appendChild(template);

  // Funções auxiliares para gerar as seções
  function gerarSecaoCheckboxes(titulo, campos, dados) {
    const marcados = campos.filter(c => dados[c] === 'sim');
    if (marcados.length === 0) return '';
    return `
      <div class="section">
        <div class="section-title">${titulo}</div>
        <div>
          ${marcados.map(c => `<span class="checkbox-item">${c.replace(/_/g, ' ').toUpperCase()}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function gerarTags(campos, dados) {
    const marcados = campos.filter(c => dados[c] === 'sim');
    if (marcados.length === 0) return '';
    return `<div style="margin-top:6px;">${marcados.map(c => `<span class="tag">${c.replace(/_/g, ' ').toUpperCase()}</span>`).join('')}</div>`;
  }

  function gerarTextoLongo(titulo, valor) {
    if (!valor) return '';
    return `
      <div class="section">
        <div class="section-title">${titulo}</div>
        <div class="text-block">${valor}</div>
      </div>
    `;
  }

  function gerarSessoes(dados) {
    let html = '';
    let temSessao = false;
    for (let i = 1; i <= 22; i++) {
      const val = dados[`sessao_${i}`];
      if (val) {
        temSessao = true;
        html += `
          <div class="section" style="margin-bottom:10px; padding:10px 14px;">
            <div style="font-weight:600; color:#2a5c3a; font-size:13px;">${i}ª Sessão</div>
            <div class="text-block" style="font-size:11px; padding:6px 10px;">${val}</div>
          </div>
        `;
      }
    }
    if (!temSessao) return '';
    return `<div class="section"><div class="section-title">📝 Prescrições</div>${html}</div>`;
  }

  // Aguarda o render do template e converte para imagem
  setTimeout(() => {
    html2canvas(template, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: template.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Se o conteúdo for maior que uma página, divide
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('anamnese_lian_huan.pdf');
      document.body.removeChild(template);
    }).catch(err => {
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar o PDF. Tente novamente.');
      document.body.removeChild(template);
    });
  }, 300);
}