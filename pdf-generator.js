function gerarPDF(dados) {
  // Certifica-se de que jsPDF está disponível
  if (typeof window.jspdf === 'undefined') {
    alert('Biblioteca jsPDF não carregada. Verifique sua conexão com a internet.');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;

  // Título
  doc.setFontSize(22);
  doc.text('Ficha de Anamnese - Lian Huan', margin, y);
  y += 30;
  doc.setFontSize(12);

  function addCampo(label, valor, quebra = true) {
    if (!valor) return;
    doc.text(`${label}: ${valor}`, margin, y);
    y += 20;
    if (y > 750) { doc.addPage(); y = margin; }
  }

  // Dados pessoais
  addCampo('Nome', dados.nome_completo);
  addCampo('Data de Nascimento', dados.data_nasc);
  addCampo('Sexo', dados.sexo);
  addCampo('Telefone', dados.telefone);
  addCampo('E-mail', dados.email_anamnese);
  addCampo('Profissão', dados.profissao);
  addCampo('CPF', dados.cpf);
  const enderecoCompleto = `${dados.rua || ''}, ${dados.numero || ''} - ${dados.bairro || ''}, ${dados.cidade || ''} - ${dados.estado || ''}, ${dados.pais || ''}`.replace(/^,\s+/, '');
  addCampo('Endereço', enderecoCompleto || 'Não informado');
  addCampo('Complemento', dados.complemento);
  addCampo('CEP', dados.cep);
  addCampo('Queixa Principal', dados.queixa_principal);
  addCampo('Histórico', dados.historico);

  // Mapeamento das seções
  const secoes = [
    { label: 'Temperatura', campos: ['temp_friorento','temp_calorento','temp_misto'] },
    { label: 'Emoções', campos: ['emo_ansiedade','emo_raiva','emo_tristeza','emo_preocupacao','emo_medo'] },
    { label: 'Sono', campos: ['sono_insonia','sono_delirio','sono_sonhos','sono_sonolencia'] },
    { label: 'Sede', campos: ['sede_pouca','sede_muita'] },
    { label: 'Digestão', campos: ['dig_diarreia_matinal','dig_gases_sem_emocional','dig_gases_com_emocional','dig_azia','dig_dor_fria','dig_arrotos','dig_dor_ardente','dig_dor_facada'] },
    { label: 'Urina', campos: ['urina_turva','urina_escura','urina_profusa'] },
    { label: 'Intestinos', campos: ['int_ressecadas','int_pastosas','int_tampao','int_muco','int_ardencia'] },
    { label: 'Menstruação', campos: ['men_adianta','men_atrasa','men_irregular','men_tpm_distensao','men_tpm_coagulos'] },
    { label: 'Corrimentos', campos: ['corr_branco','corr_amarelo','corr_vermelho','corr_escuro'] },
    { label: 'Síndromes Bi', campos: ['bi_frio','bi_calor','bi_umidade','bi_vento','bi_ossea'] },
    { label: 'Sangue', campos: ['sangue_tontura','sangue_caimbras','sangue_apetite'] },
    { label: 'Sabores', campos: ['sabor_salgado','sabor_picante','sabor_azedo','sabor_doce','sabor_amargo'] },
    { label: 'Respiração', campos: ['resp_fraca','resp_forcada','resp_falta_ar','resp_dispneia','resp_suspiro','resp_tosse_rouca','resp_tosse_seca','resp_tosse_clara'] },
    { label: 'Olhos e Visão', campos: ['olhos_fraca','olhos_turva','olhos_vermelhidão','olhos_secura','olhos_lacrimejamento'] },
    { label: 'Ouvidos', campos: ['ouv_zumbido','ouv_prurido','ouv_fraca','ouv_surdez','ouv_surdez_subita'] },
    { label: 'Nariz', campos: ['nariz_fraco','nariz_anosmia','nariz_coriza','nariz_prurido','nariz_obstrucao'] },
    { label: 'Tato', campos: ['tato_fraco'] },
    { label: 'Boca e Gosto', campos: ['boca_labios_azulados','boca_labios_palidos','boca_labios_brancos','boca_salivacao','boca_secura','boca_garganta_seca','boca_amarga','boca_sangramentos'] }
  ];

  secoes.forEach(sec => {
    let marcados = sec.campos.filter(campo => dados[campo] === 'sim');
    if (marcados.length > 0) {
      doc.setFontSize(14);
      doc.text(sec.label, margin, y);
      y += 20;
      doc.setFontSize(11);
      marcados.forEach(item => {
        doc.text(`✔ ${item.replace(/_/g, ' ').toUpperCase()}`, margin + 20, y);
        y += 16;
        if (y > 750) { doc.addPage(); y = margin; }
      });
      y += 10;
    }
  });

  // Língua
  doc.setFontSize(14);
  doc.text('Língua', margin, y);
  y += 20;
  doc.setFontSize(11);
  const lingua = [
    `Cor: ${dados.lingua_cor || 'N/A'}`,
    `Forma: ${dados.lingua_forma || 'N/A'}`,
    `Saburra: ${dados.lingua_saburra || 'N/A'}`,
    `Umidade: ${dados.lingua_umidade || 'N/A'}`
  ];
  lingua.forEach(item => {
    doc.text(item, margin + 20, y);
    y += 16;
    if (y > 750) { doc.addPage(); y = margin; }
  });
  const linguaChecks = ['lingua_palida_seca','lingua_palida_umida','lingua_vermelha','lingua_vermelha_areas','lingua_ulcerada','lingua_fissuras','lingua_purpura','lingua_saburra_branca','lingua_saburra_amarela','lingua_sem_saburra','lingua_denteada','lingua_inchada'];
  linguaChecks.forEach(campo => {
    if (dados[campo] === 'sim') {
      doc.text(`✔ ${campo.replace(/_/g, ' ').toUpperCase()}`, margin + 40, y);
      y += 16;
      if (y > 750) { doc.addPage(); y = margin; }
    }
  });

  // Pulso
  const pulso = ['pulso_rapido','pulso_lento','pulso_superficial','pulso_profundo','pulso_cheio','pulso_vazio','pulso_fino','pulso_corda','pulso_escorregadio','pulso_irregular'];
  let pulsosMarcados = pulso.filter(c => dados[c] === 'sim');
  if (pulsosMarcados.length) {
    doc.setFontSize(14);
    doc.text('Pulso', margin, y);
    y += 20;
    doc.setFontSize(11);
    pulsosMarcados.forEach(p => {
      doc.text(`✔ ${p.replace('pulso_','').toUpperCase()}`, margin + 20, y);
      y += 16;
      if (y > 750) { doc.addPage(); y = margin; }
    });
  }

  // Textos longos
  const textosLongos = [
    { label: 'Medicação em uso', campo: 'medicacao' },
    { label: 'Palpação Shu e Mo', campo: 'palpacao_shu_mo' },
    { label: 'Palpação Auricular', campo: 'palpacao_auricular' },
    { label: 'Fitoterápicos', campo: 'fitoterapicos' }
  ];
  textosLongos.forEach(item => {
    if (dados[item.campo]) {
      doc.setFontSize(14);
      doc.text(item.label, margin, y);
      y += 20;
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(dados[item.campo], pageWidth - margin * 2);
      doc.text(lines, margin + 20, y);
      y += lines.length * 16 + 10;
      if (y > 750) { doc.addPage(); y = margin; }
    }
  });

  // Prescrições
  for (let i = 1; i <= 22; i++) {
    const campo = `sessao_${i}`;
    if (dados[campo]) {
      doc.setFontSize(12);
      doc.text(`${i}ª Sessão:`, margin, y);
      y += 16;
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(dados[campo], pageWidth - margin * 2);
      doc.text(lines, margin + 20, y);
      y += lines.length * 14 + 10;
      if (y > 750) { doc.addPage(); y = margin; }
    }
  }

  // Salvar PDF
  doc.save('anamnese_lian_huan.pdf');
}