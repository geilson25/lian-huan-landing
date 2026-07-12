function gerarPDF(dados) {
  if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
    alert('Bibliotecas não carregadas. Verifique sua conexão com a internet.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const { html2canvas } = window;

  const template = document.createElement('div');
  template.style.position = 'fixed';
  template.style.left = '-9999px';
  template.style.top = '0';
  template.style.width = '794px';
  template.style.background = 'linear-gradient(145deg, #f0f4f8 0%, #d9e2ec 100%)';
  template.style.padding = '40px';
  template.style.fontFamily = "'Open Sans', sans-serif";
  template.style.color = '#1e2b2a';
  template.style.minHeight = '1123px';

  template.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@300;400;600;700&display=swap');
      
      .glass-card {
        background: rgba(255, 255, 255, 0.50);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.35);
        box-shadow: 0 8px 32px rgba(0, 20, 30, 0.10);
        padding: 20px 24px;
        margin-bottom: 18px;
      }
      
      .header {
        text-align: center;
        padding: 20px 0 16px 0;
        margin-bottom: 24px;
        background: rgba(255,255,255,0.30);
        backdrop-filter: blur(8px);
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,0.25);
        box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      }
      .header .logo {
        max-width: 70px;
        height: auto;
        margin-bottom: 6px;
        filter: drop-shadow(0 2px 8px rgba(42,92,58,0.15));
      }
      .header .title {
        font-family: 'Playfair Display', serif;
        font-size: 28px;
        font-weight: 700;
        color: #2a5c3a;
        letter-spacing: 1px;
      }
      .header .title span { color: #b88a1e; }
      .header .subtitle {
        font-size: 14px;
        color: #3a5a4a;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 2px;
      }
      .header .slogan {
        font-size: 13px;
        color: #5a7a6a;
        font-weight: 300;
        letter-spacing: 3px;
      }
      
      .section-title {
        font-family: 'Playfair Display', serif;
        font-size: 18px;
        font-weight: 700;
        color: #2a5c3a;
        border-bottom: 2px solid rgba(212, 160, 23, 0.3);
        padding-bottom: 6px;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .section-title i {
        color: #b88a1e;
        font-size: 20px;
        width: 28px;
        text-align: center;
        filter: drop-shadow(0 2px 4px rgba(184,138,30,0.2));
      }
      
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
        font-size: 12.5px;
        line-height: 1.7;
      }
      .field-label {
        font-weight: 600;
        color: #2a5c3a;
      }
      .field-value {
        font-weight: 400;
        color: #1e2b2a;
      }
      
      .tag-group {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 10px;
        margin-top: 6px;
      }
      .tag {
        background: rgba(42, 92, 58, 0.08);
        padding: 4px 14px;
        border-radius: 30px;
        font-size: 11.5px;
        font-weight: 500;
        color: #2a5c3a;
        border: 1px solid rgba(42, 92, 58, 0.10);
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 6px rgba(0,0,0,0.02);
      }
      .tag::before {
        content: "● ";
        color: #b88a1e;
        font-size: 10px;
      }
      
      .text-block {
        font-size: 12.5px;
        line-height: 1.7;
        background: rgba(255,255,255,0.40);
        padding: 12px 16px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.30);
        backdrop-filter: blur(4px);
        white-space: pre-wrap;
        word-wrap: break-word;
        margin-top: 4px;
      }
      
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #5a6a6a;
        border-top: 1px solid rgba(255,255,255,0.4);
        padding-top: 18px;
        backdrop-filter: blur(4px);
        background: rgba(255,255,255,0.15);
        border-radius: 16px;
        padding: 16px 20px;
      }
      .footer .terapeutas {
        font-weight: 600;
        color: #2a5c3a;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }
      .footer .terapeutas span {
        color: #b88a1e;
      }
      .footer .contato a {
        color: #2a5c3a;
        text-decoration: none;
        margin: 0 8px;
      }
    </style>

    <div class="header">
      <img src="/logo.png" alt="Lian Huan" class="logo" crossorigin="anonymous" onerror="this.style.display='none'">
      <div class="title">LIAN <span>HUAN</span></div>
      <div class="subtitle">Instituto de Medicina Tradicional Chinesa</div>
      <div class="slogan">Equilíbrio · Bem-Estar · Transformação</div>
    </div>

    <div class="glass-card">
      <div class="section-title"><i class="fas fa-id-card"></i> Dados Pessoais</div>
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
      <div class="field" style="margin-top:6px;">
        <span class="field-label">Endereço:</span> 
        <span class="field-value">${[dados.rua, dados.numero, dados.bairro, dados.cidade, dados.estado, dados.pais].filter(Boolean).join(', ') || 'N/I'}</span>
      </div>
      ${dados.complemento ? `<div class="field"><span class="field-label">Complemento:</span> <span class="field-value">${dados.complemento}</span></div>` : ''}
    </div>

    <div class="glass-card">
      <div class="section-title"><i class="fas fa-stethoscope"></i> Queixa Principal</div>
      <div class="text-block">${dados.queixa_principal || 'N/I'}</div>
      ${dados.historico ? `<div style="margin-top:10px;"><span class="field-label">Histórico:</span><div class="text-block">${dados.historico}</div></div>` : ''}
    </div>

    ${gerarSecaoGlass('fa-thermometer-half', 'Temperatura Corporal', ['temp_friorento','temp_calorento','temp_misto'], dados)}
    ${gerarSecaoGlass('fa-heart', 'Emoções', ['emo_ansiedade','emo_raiva','emo_tristeza','emo_preocupacao','emo_medo'], dados)}
    ${gerarSecaoGlass('fa-moon', 'Sono', ['sono_insonia','sono_delirio','sono_sonhos','sono_sonolencia'], dados)}
    ${gerarSecaoGlass('fa-tint', 'Sede', ['sede_pouca','sede_muita'], dados)}
    ${gerarSecaoGlass('fa-utensils', 'Digestão', ['dig_diarreia_matinal','dig_gases_sem_emocional','dig_gases_com_emocional','dig_azia','dig_dor_fria','dig_arrotos','dig_dor_ardente','dig_dor_facada'], dados)}
    ${gerarSecaoGlass('fa-toilet', 'Urina', ['urina_turva','urina_escura','urina_profusa'], dados)}
    ${gerarSecaoGlass('fa-poo', 'Intestinos', ['int_ressecadas','int_pastosas','int_tampao','int_muco','int_ardencia'], dados)}
    ${dados.sexo === 'Feminino' ? gerarSecaoGlass('fa-venus', 'Menstruação', ['men_adianta','men_atrasa','men_irregular','men_tpm_distensao','men_tpm_coagulos'], dados) : ''}
    ${dados.sexo === 'Feminino' ? gerarSecaoGlass('fa-tint', 'Corrimentos', ['corr_branco','corr_amarelo','corr_vermelho','corr_escuro'], dados) : ''}
    ${gerarSecaoGlass('fa-bolt', 'Síndromes Bi', ['bi_frio','bi_calor','bi_umidade','bi_vento','bi_ossea'], dados)}
    ${gerarSecaoGlass('fa-droplet', 'Sangue', ['sangue_tontura','sangue_caimbras','sangue_apetite'], dados)}
    ${gerarSecaoGlass('fa-utensil-spoon', 'Sabores', ['sabor_salgado','sabor_picante','sabor_azedo','sabor_doce','sabor_amargo'], dados)}
    ${gerarSecaoGlass('fa-lungs', 'Respiração', ['resp_fraca','resp_forcada','resp_falta_ar','resp_dispneia','resp_suspiro','resp_tosse_rouca','resp_tosse_seca','resp_tosse_clara'], dados)}
    ${gerarSecaoGlass('fa-eye', 'Olhos e Visão', ['olhos_fraca','olhos_turva','olhos_vermelhidão','olhos_secura','olhos_lacrimejamento'], dados)}
    ${gerarSecaoGlass('fa-ear', 'Ouvidos', ['ouv_zumbido','ouv_prurido','ouv_fraca','ouv_surdez','ouv_surdez_subita'], dados)}
    ${gerarSecaoGlass('fa-nose', 'Nariz', ['nariz_fraco','nariz_anosmia','nariz_coriza','nariz_prurido','nariz_obstrucao'], dados)}
    ${gerarSecaoGlass('fa-hand', 'Tato', ['tato_fraco'], dados)}
    ${gerarSecaoGlass('fa-mouth', 'Boca e Gosto', ['boca_labios_azulados','boca_labios_palidos','boca_labios_brancos','boca_salivacao','boca_secura','boca_garganta_seca','boca_amarga','boca_sangramentos'], dados)}

    <div class="glass-card">
      <div class="section-title"><i class="fa-regular fa-comment"></i> Língua</div>
      <div class="grid-3">
        <div class="field"><span class="field-label">Cor:</span> <span class="field-value">${dados.lingua_cor || 'N/A'}</span></div>
        <div class="field"><span class="field-label">Forma:</span> <span class="field-value">${dados.lingua_forma || 'N/A'}</span></div>
        <div class="field"><span class="field-label">Saburra:</span> <span class="field-value">${dados.lingua_saburra || 'N/A'}</span></div>
        <div class="field"><span class="field-label">Umidade:</span> <span class="field-value">${dados.lingua_umidade || 'N/A'}</span></div>
      </div>
      ${gerarTagsGlass(['lingua_palida_seca','lingua_palida_umida','lingua_vermelha','lingua_vermelha_areas','lingua_ulcerada','lingua_fissuras','lingua_purpura','lingua_saburra_branca','lingua_saburra_amarela','lingua_sem_saburra','lingua_denteada','lingua_inchada'], dados)}
    </div>

    <div class="glass-card">
      <div class="section-title"><i class="fa-regular fa-heart"></i> Pulso</div>
      <div class="tag-group">
        ${['pulso_rapido','pulso_lento','pulso_superficial','pulso_profundo','pulso_cheio','pulso_vazio','pulso_fino','pulso_corda','pulso_escorregadio','pulso_irregular']
          .filter(c => dados[c] === 'sim')
          .map(c => `<span class="tag">${c.replace('pulso_','').toUpperCase()}</span>`).join('') || '<span style="color:#999;">N/A</span>'}
      </div>
    </div>

    ${gerarTextoLongoGlass('Medicação em uso', dados.medicacao, 'fa-pills')}
    ${gerarTextoLongoGlass('Palpação Shu e Mo', dados.palpacao_shu_mo, 'fa-hand-holding-heart')}
    ${gerarTextoLongoGlass('Palpação Auricular', dados.palpacao_auricular, 'fa-ear-listen')}
    ${gerarTextoLongoGlass('Fitoterápicos', dados.fitoterapicos, 'fa-leaf')}
    ${gerarSessoesGlass(dados)}

    <div class="footer">
      <div class="terapeutas">
        José Ivo Sampaio <span>·</span> Terapeuta &nbsp;|&nbsp; Danielle Sampaio <span>·</span> Terapeuta
      </div>
      <div class="contato">
        <a href="https://www.instagram.com/lian_huan_instituto/">@lian_huan_instituto</a>
        · <a href="tel:+5581987361800">(81) 98736-1800</a>
#        · <a href="mailto:contato@lianhuan.com.br">contato@lianhuan.com.br</a>
      </div>
      <div style="font-size:9px; color:#8a9a9a; margin-top:6px;">
        Ficha de Anamnese · Lian Huan Instituto de Medicina Tradicional Chinesa
      </div>
    </div>
  `;

  document.body.appendChild(template);

  function gerarSecaoGlass(icone, titulo, campos, dados) {
    const marcados = campos.filter(c => dados[c] === 'sim');
    if (marcados.length === 0) return '';
    return `
      <div class="glass-card">
        <div class="section-title"><i class="fas ${icone}"></i> ${titulo}</div>
        <div class="tag-group">
          ${marcados.map(c => `<span class="tag">${c.replace(/_/g, ' ').toUpperCase()}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function gerarTagsGlass(campos, dados) {
    const marcados = campos.filter(c => dados[c] === 'sim');
    if (marcados.length === 0) return '';
    return `<div class="tag-group">${marcados.map(c => `<span class="tag">${c.replace(/_/g, ' ').toUpperCase()}</span>`).join('')}</div>`;
  }

  function gerarTextoLongoGlass(titulo, valor, icone) {
    if (!valor) return '';
    return `
      <div class="glass-card">
        <div class="section-title"><i class="fas ${icone}"></i> ${titulo}</div>
        <div class="text-block">${valor}</div>
      </div>
    `;
  }

  function gerarSessoesGlass(dados) {
    let html = '';
    let temSessao = false;
    for (let i = 1; i <= 22; i++) {
      const val = dados[`sessao_${i}`];
      if (val) {
        temSessao = true;
        html += `
          <div style="margin-bottom:10px; padding:10px 14px; background:rgba(255,255,255,0.25); backdrop-filter:blur(6px); border-radius:12px; border:1px solid rgba(255,255,255,0.15);">
            <div style="font-weight:600; color:#2a5c3a; font-size:13px; margin-bottom:4px;">${i}ª Sessão</div>
            <div style="font-size:12px; line-height:1.6;">${val}</div>
          </div>
        `;
      }
    }
    if (!temSessao) return '';
    return `
      <div class="glass-card">
        <div class="section-title"><i class="fas fa-clipboard-list"></i> Prescrições</div>
        ${html}
      </div>
    `;
  }

  setTimeout(() => {
    html2canvas(template, {
      scale: 1.8,
      useCORS: true,
      logging: false,
      backgroundColor: null,
      width: 794,
      height: template.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
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
  }, 400);
}