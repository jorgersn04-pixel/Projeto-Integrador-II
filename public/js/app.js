const API_BASE = 'http://localhost:3000/api';

const state = {
  token: '',
  profissional: null
};

function setStatus(elementId, message, isError = false) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? '#dc2626' : '#16a34a';
}

function bindNavigation() {
  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
      button.classList.add('active');
      const target = document.getElementById(button.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

function getHeaders(extra = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...extra
  };

  if (state.profissional) {
    headers['x-profissional-id'] = String(state.profissional.id);
    headers['x-profissional-cargo'] = state.profissional.cargo;
  }

  return headers;
}

function formatCpf(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function setPacienteFormMasks() {
  const cpfInput = document.querySelector('input[name="cpf"]');
  if (cpfInput) {
    cpfInput.addEventListener('input', (event) => {
      event.target.value = formatCpf(event.target.value);
    });
  }
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: getHeaders(options.headers || {})
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.mensagem || 'Erro na requisição.');
  }

  return data;
}

async function carregarPacientes() {
  const container = document.getElementById('paciente-lista');
  if (!container) return;

  try {
    const pacientes = await fetchJson(`${API_BASE}/pacientes`);
    container.innerHTML = pacientes.length
      ? pacientes.map(p => `
          <div class="patient-item">
            <strong>${p.nome_completo}</strong><br>
            <span class="muted">CPF: ${p.cpf}</span><br>
            <span class="muted">RG: ${p.rg}</span><br>
            <span class="muted">Nascimento: ${p.data_nascimento}</span>
          </div>
        `).join('')
      : '<p>Nenhum paciente cadastrado.</p>';
  } catch (error) {
    container.innerHTML = `<p>${error.message}</p>`;
  }
}

async function carregarPainelMedico() {
  const container = document.getElementById('painel-medico');
  if (!container) return;

  try {
    const atendimentos = await fetchJson(`${API_BASE}/medicos/painel`);
    container.innerHTML = atendimentos.length
      ? atendimentos.map(item => `
          <div class="painel-item">
            <strong>${item.numero_atendimento}</strong><br>
            <span class="muted">Paciente: ${item.nome_paciente}</span><br>
            <span class="muted">Classificação: ${item.classificacao_manchester}</span><br>
            <span class="muted">Queixa: ${item.queixa_principal}</span>
          </div>
        `).join('')
      : '<p>Nenhum atendimento aguardando médico.</p>';
  } catch (error) {
    container.innerHTML = `<p>${error.message}</p>`;
  }
}

async function loginHandler(event) {
  event.preventDefault();

  const payload = {
    email: document.getElementById('email').value,
    senha: document.getElementById('senha').value
  };

  try {
    const result = await fetch(`${API_BASE}/profissionais/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await result.json().catch(() => ({}));

    if (!result.ok) {
      throw new Error(data.mensagem || 'Não foi possível autenticar.');
    }

    state.profissional = {
      id: data.id,
      nome: data.nome,
      cargo: data.cargo
    };

    setStatus('login-status', `Login realizado com sucesso: ${data.nome} (${data.cargo})`);
    await carregarPacientes();
    await carregarPainelMedico();
  } catch (error) {
    setStatus('login-status', error.message, true);
  }
}

async function criarPaciente(event) {
  event.preventDefault();

  const form = event.target;
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    await fetchJson(`${API_BASE}/pacientes`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    form.reset();
    await carregarPacientes();
    setStatus('paciente-lista', 'Paciente cadastrado com sucesso.');
  } catch (error) {
    setStatus('paciente-lista', error.message, true);
  }
}

async function registrarTriagem(event) {
  event.preventDefault();

  const form = event.target;
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    await fetchJson(`${API_BASE}/triagens`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    form.reset();
    setStatus('triagem-status', 'Triagem registrada com sucesso.');
    await carregarPainelMedico();
  } catch (error) {
    setStatus('triagem-status', error.message, true);
  }
}

async function iniciarConsulta() {
  const idAtendimento = document.getElementById('iniciar-atendimento-id').value;

  if (!idAtendimento) {
    setStatus('painel-medico', 'Informe o ID do atendimento.', true);
    return;
  }

  try {
    const response = await fetchJson(`${API_BASE}/medicos/iniciar`, {
      method: 'POST',
      body: JSON.stringify({ id_atendimento: Number(idAtendimento) })
    });

    setStatus('painel-medico', `Consulta iniciada: ${JSON.stringify(response)}`);
    await carregarPainelMedico();
  } catch (error) {
    setStatus('painel-medico', error.message, true);
  }
}

async function finalizarConsulta() {
  const payload = {
    id_atendimento: Number(document.getElementById('finalizar-atendimento-id').value),
    diagnostico: document.getElementById('diagnostico').value,
    medicacoes_prescritas: document.getElementById('medicacoes_prescritas').value,
    observacoes: document.getElementById('observacoes').value
  };

  try {
    const response = await fetchJson(`${API_BASE}/medicos/finalizar`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    setStatus('painel-medico', `Consulta finalizada: ${JSON.stringify(response)}`);
    await carregarPainelMedico();
  } catch (error) {
    setStatus('painel-medico', error.message, true);
  }
}

function bindActions() {
  document.getElementById('login-form')?.addEventListener('submit', loginHandler);
  document.getElementById('paciente-form')?.addEventListener('submit', criarPaciente);
  document.getElementById('triagem-form')?.addEventListener('submit', registrarTriagem);
  document.getElementById('iniciar-consulta-btn')?.addEventListener('click', iniciarConsulta);
  document.getElementById('finalizar-consulta-btn')?.addEventListener('click', finalizarConsulta);
}

bindNavigation();
bindActions();
setPacienteFormMasks();
carregarPacientes();
carregarPainelMedico();
