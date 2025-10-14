// Função para carregar dados da API
async function loadData(entity) {
  try {
    // Mostrar mensagem de carregamento
    const tableBody = document.getElementById(`${entity}-table-body`);
    const colCount = document.querySelector(`#${entity}-content table thead tr`).childElementCount;
    tableBody.innerHTML = `<tr><td colspan="${colCount}" style="text-align: center;">Carregando dados...</td></tr>`;
    
    console.log(`Tentando carregar dados de: ${ENDPOINTS[entity]}`);
    updateApiStatus(`Carregando ${entity}...`);
    
    const response = await fetch(ENDPOINTS[entity]);
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao carregar ${entity}`);
    }
    
    const data = await response.json();
    console.log(`Dados recebidos para ${entity}:`, data);
    
    // Processar os dados para garantir formato consistente
    let processedData = processData(entity, data);
    currentData[entity] = processedData;
    renderTable(entity, processedData);
    
    // Mostrar informações de debug
    showDebugInfo(entity, processedData);
    
    // Atualizar estatísticas se for alunos ou instrutores
    if (entity === 'alunos') {
      document.getElementById('total-alunos').textContent = processedData.length;
    } else if (entity === 'instrutores') {
      document.getElementById('total-instrutores').textContent = processedData.length;
    }
    
    updateApiStatus(`API funcionando para ${entity}`, 'success');
    
  } catch (error) {
    console.error(`Erro ao carregar ${entity}:`, error);
    
    // Usar dados de exemplo se a API não estiver funcionando
    if (EXAMPLE_DATA[entity]) {
      currentData[entity] = EXAMPLE_DATA[entity];
      renderTable(entity, EXAMPLE_DATA[entity]);
      showDebugInfo(entity, EXAMPLE_DATA[entity]);
      
      if (entity === 'alunos') {
        document.getElementById('total-alunos').textContent = EXAMPLE_DATA.alunos.length;
      } else if (entity === 'instrutores') {
        document.getElementById('total-instrutores').textContent = EXAMPLE_DATA.instrutores.length;
      }
      
      updateApiStatus(`Usando dados de exemplo para ${entity} (API não disponível)`, 'error');
      showNotification(`Usando dados de exemplo para ${entity}`, 'warning');
    } else {
      const tableBody = document.getElementById(`${entity}-table-body`);
      const colCount = document.querySelector(`#${entity}-content table thead tr`).childElementCount;
      tableBody.innerHTML = `<tr><td colspan="${colCount}" style="text-align: center; color: red;">Erro: ${error.message}</td></tr>`;
      
      // Mostrar erro no debug também
      const debugElement = document.getElementById(`debug-${entity}`);
      if (debugElement) {
        debugElement.textContent = `ERRO: ${error.message}`;
      }
      
      updateApiStatus(`Erro ao carregar ${entity}: ${error.message}`, 'error');
    }
  }
}

// Função auxiliar para processar dados e garantir formato consistente
function processData(entity, data) {
  // Se os dados vierem em um objeto com propriedade (ex: { alunos: [...] })
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    // Verificar se existe uma propriedade com o nome da entidade
    if (data[entity]) {
      return data[entity];
    }
    // Verificar se existe uma propriedade com nome similar
    const possibleKeys = Object.keys(data).filter(key => 
      key.toLowerCase().includes(entity.toLowerCase().slice(0, -1)) // Remove 's' final
    );
    if (possibleKeys.length > 0) {
      return data[possibleKeys[0]];
    }
  }
  
  // Se já for um array, retornar diretamente
  if (Array.isArray(data)) {
    return data;
  }
  
  // Caso contrário, retornar array vazio
  console.warn(`Formato de dados inesperado para ${entity}:`, data);
  return [];    
}

// Função para mostrar informações de debug
function showDebugInfo(entity, data) {
  const debugElement = document.getElementById(`debug-${entity}`);
  if (debugElement) {
    debugElement.textContent = JSON.stringify(data, null, 2);
  }
}