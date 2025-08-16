# 📋 Helper.DB - Documentação Completa

> **Uma biblioteca de banco de dados JavaScript simples, poderosa e versátil**
> 
> Fork do popular quick.db com funcionalidades expandidas e melhorias de performance

---

## 📑 **Índice**

1. [Instalação](#-instalação)
2. [Inicialização Básica](#-inicialização-básica)
3. [Drivers Disponíveis](#-drivers-disponíveis)
4. [API Completa](#-api-completa)
5. [Métodos de Busca](#-métodos-de-busca)
6. [Operações Estatísticas](#-operações-estatísticas)
7. [Sistema de Eventos](#-sistema-de-eventos)
8. [Funcionalidades Avançadas](#-funcionalidades-avançadas)
9. [Configurações](#-configurações)
10. [Exemplos Práticos](#-exemplos-práticos)
11. [Regras de Uso](#-regras-de-uso)

---

## 📦 **Instalação**

### Instalação Base
```bash
npm install helper.db
```

### Instalação com Drivers Específicos

#### SQLite (Padrão - Recomendado)
```bash
npm install helper.db better-sqlite3
```

#### MySQL
```bash
npm install helper.db mysql2
```

#### MariaDB
```bash
npm install helper.db mysql2
```

#### MongoDB
```bash
npm install helper.db mongoose
```

#### JSON (Desenvolvimento)
```bash
npm install helper.db write-file-atomic
```

---

## 🚀 **Inicialização Básica**

### Importação
```javascript
const { HelperDB } = require('helper.db');

// Ou importar drivers específicos
const { 
    HelperDB, 
    SqliteDriver, 
    MySQLDriver, 
    MariaDBDriver, 
    MongoDriver, 
    JSONDriver, 
    MemoryDriver 
} = require('helper.db');
```

### Inicialização Simples
```javascript
// Padrão (SQLite)
const db = new HelperDB();
await db.init();

// Com configurações customizadas
const db = new HelperDB({
    filePath: "minha-base.sqlite",
    table: "dados",
    enableCache: true,
    enableBackup: true
});
await db.init();
```

---

## 🔧 **Drivers Disponíveis**

### 1. 🗄️ **SqliteDriver** (Padrão)

#### Parâmetros de Configuração:
- `path` (string): Caminho do arquivo SQLite

#### Exemplo:
```javascript
const { HelperDB, SqliteDriver } = require('helper.db');

const db = new HelperDB({ 
    driver: new SqliteDriver("./database.sqlite"),
    table: "usuarios"
});

await db.init();
```

#### Regras de Uso:
- ✅ Ideal para desenvolvimento e aplicações pequenas/médias
- ✅ Não requer servidor externo
- ✅ Persistência automática
- ❌ Não suporta múltiplas conexões simultâneas

---

### 2. 🐬 **MySQLDriver**

#### Parâmetros de Configuração:
```javascript
{
    host: "localhost",      // Endereço do servidor
    port: 3306,            // Porta (padrão: 3306)
    user: "usuario",       // Nome de usuário
    password: "senha",     // Senha
    database: "nome_db",   // Nome da database
    connectionLimit: 10,   // Limite de conexões (opcional)
    acquireTimeout: 60000, // Timeout de conexão (opcional)
    timeout: 60000         // Timeout de query (opcional)
}
```

#### Exemplo:
```javascript
const { HelperDB, MySQLDriver } = require('helper.db');

const mysqlDriver = new MySQLDriver({
    host: "localhost",
    user: "root",
    password: "minhasenha",
    database: "meuapp",
    connectionLimit: 20
});

await mysqlDriver.connect();

const db = new HelperDB({ 
    driver: mysqlDriver,
    table: "dados"
});

await db.init();

// Lembre-se de fechar a conexão quando necessário
await mysqlDriver.disconnect();
```

#### Regras de Uso:
- ✅ Ideal para aplicações em produção
- ✅ Suporte a múltiplas conexões
- ✅ Alta performance e escalabilidade
- ❌ Requer servidor MySQL configurado
- ⚠️ Sempre chame `connect()` antes de usar
- ⚠️ Chame `disconnect()` para fechar conexões

---

### 3. 🦭 **MariaDBDriver**

#### Parâmetros de Configuração:
```javascript
{
    host: "localhost",      // Endereço do servidor
    port: 3306,            // Porta (padrão: 3306)
    user: "usuario",       // Nome de usuário
    password: "senha",     // Senha
    database: "nome_db",   // Nome da database
    connectionLimit: 10,   // Limite de conexões (opcional)
    acquireTimeout: 60000, // Timeout de conexão (opcional)
    timeout: 60000         // Timeout de query (opcional)
}
```

#### Exemplo:
```javascript
const { HelperDB, MariaDBDriver } = require('helper.db');

const mariaDriver = new MariaDBDriver({
    host: "db.example.com",
    user: "app_user",
    password: "secure_password",
    database: "production_db"
});

await mariaDriver.connect();

const db = new HelperDB({ 
    driver: mariaDriver,
    table: "sessions"
});

await db.init();
```

#### Regras de Uso:
- ✅ Compatível com MySQL
- ✅ Open source e gratuito
- ✅ Melhor performance que MySQL em alguns casos
- ❌ Requer servidor MariaDB
- ⚠️ Sempre chame `connect()` antes de usar

---

### 4. 🍃 **MongoDriver**

#### Parâmetros de Configuração:
```javascript
// String de conexão
"mongodb://localhost:27017/database"

// Ou objeto de opções
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}
```

#### Exemplo:
```javascript
const { HelperDB, MongoDriver } = require('helper.db');

const mongoDriver = new MongoDriver(
    "mongodb://localhost:27017/meuapp",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10
    }
);

await mongoDriver.connect();

const db = new HelperDB({ 
    driver: mongoDriver,
    table: "users" // Nome da coleção
});

await db.init();

// Fechar conexão quando necessário
await mongoDriver.close();
```

#### Regras de Uso:
- ✅ Ideal para dados não estruturados
- ✅ Escalabilidade horizontal
- ✅ Suporte nativo a JSON
- ❌ Curva de aprendizado maior
- ⚠️ Sempre chame `connect()` antes de usar
- ⚠️ Use `close()` para encerrar conexões

---

### 5. 📄 **JSONDriver**

#### Parâmetros de Configuração:
- `path` (string): Caminho do arquivo JSON

#### Exemplo:
```javascript
const { HelperDB, JSONDriver } = require('helper.db');

const db = new HelperDB({ 
    driver: new JSONDriver("./dados.json"),
    table: "cache"
});

await db.init();
```

#### Regras de Uso:
- ✅ Ideal para desenvolvimento e protótipos
- ✅ Fácil de inspecionar (arquivo JSON legível)
- ✅ Backup automático em arquivo
- ❌ Performance limitada para grandes volumes
- ❌ Não adequado para produção de alta carga

---

### 6. 💾 **MemoryDriver**

#### Parâmetros de Configuração:
Nenhum parâmetro necessário.

#### Exemplo:
```javascript
const { HelperDB, MemoryDriver } = require('helper.db');

const cache = new HelperDB({ 
    driver: new MemoryDriver(),
    table: "sessoes"
});

await cache.init();

// Métodos específicos do MemoryDriver
cache.driver.clear(); // Limpa todos os dados
const stats = cache.driver.getStats(); // Estatísticas de uso
console.log(stats);
// { 
//   sessoes: { 
//     rows: 150, 
//     sizeEstimate: 25000 
//   } 
// }
```

#### Regras de Uso:
- ✅ Máxima performance (RAM)
- ✅ Ideal para cache temporário
- ✅ Não requer dependências externas
- ❌ Dados perdidos ao reiniciar aplicação
- ❌ Limitado pela memória disponível
- ⚠️ Use apenas para dados temporários

---

## 📚 **API Completa**

### **Operações Básicas**

#### `set(key, value)` - Definir Valor
```javascript
await db.set("usuario:1", { nome: "João", idade: 25 });
await db.set("contador", 0);
await db.set("config.tema", "escuro");
```

#### `get(key)` - Obter Valor
```javascript
const usuario = await db.get("usuario:1");
const contador = await db.get("contador");
const tema = await db.get("config.tema");
```

#### `has(key)` - Verificar Existência
```javascript
const existe = await db.has("usuario:1"); // true/false
```

#### `delete(key)` - Deletar
```javascript
await db.delete("usuario:1");
await db.delete("config.tema"); // Remove propriedade específica
```

#### `deleteAll()` - Deletar Tudo
```javascript
await db.deleteAll(); // Remove todos os dados
```

#### `all()` - Listar Todos
```javascript
const todos = await db.all();
// [
//   { id: "usuario:1", value: { nome: "João", idade: 25 } },
//   { id: "contador", value: 0 }
// ]
```

---

### **Operações Matemáticas**

#### `add(key, number)` - Somar
```javascript
await db.add("pontos", 10);        // pontos += 10
await db.add("usuario.idade", 1);  // Aniversário
```

#### `sub(key, number)` - Subtrair
```javascript
await db.sub("vidas", 1);          // vidas -= 1
await db.sub("saldo", 25.50);      // Débito
```

---

### **Operações com Arrays**

#### `push(key, ...values)` - Adicionar ao Final
```javascript
await db.push("lista", "item1", "item2", "item3");
await db.push("usuario.hobbies", "leitura");
```

#### `unshift(key, value)` - Adicionar ao Início
```javascript
await db.unshift("fila", "primeiro");
```

#### `pop(key)` - Remover do Final
```javascript
const ultimo = await db.pop("lista");
```

#### `shift(key)` - Remover do Início
```javascript
const primeiro = await db.shift("fila");
```

#### `pull(key, value, once?)` - Remover por Valor
```javascript
await db.pull("tags", "obsoleto");          // Remove todas as ocorrências
await db.pull("items", "duplicado", true);  // Remove apenas a primeira

// Usando função de filtro
await db.pull("usuarios", (user, index) => user.ativo === false);
```

#### `splice(key, start, deleteCount, ...items)` - Modificar Array
```javascript
// Remove 2 itens da posição 1 e adiciona "novo"
await db.splice("lista", 1, 2, "novo");
```

#### `indexOf(key, element, fromIndex?)` - Encontrar Índice
```javascript
const indice = await db.indexOf("cores", "azul");
```

#### `includes(key, element, fromIndex?)` - Verificar se Contém
```javascript
const contem = await db.includes("tags", "importante");
```

#### `filter(key, callback)` - Filtrar
```javascript
await db.filter("numeros", x => x > 10);
// Mantém apenas números maiores que 10
```

#### `map(key, callback)` - Transformar
```javascript
await db.map("precos", x => x * 1.1); // Aumenta 10%
```

#### `reduce(key, callback, initial?)` - Reduzir
```javascript
const soma = await db.reduce("valores", (acc, curr) => acc + curr, 0);
```

---

### **Operações em Lote**

#### `setMany(entries)` - Definir Múltiplos
```javascript
await db.setMany([
    ["user:1", { nome: "João", idade: 25 }],
    ["user:2", { nome: "Maria", idade: 30 }],
    ["config", { tema: "escuro", idioma: "pt" }]
]);
```

#### `getMany(keys)` - Obter Múltiplos
```javascript
const dados = await db.getMany(["user:1", "user:2", "config"]);
// [
//   { key: "user:1", value: { nome: "João", idade: 25 } },
//   { key: "user:2", value: { nome: "Maria", idade: 30 } },
//   { key: "config", value: { tema: "escuro", idioma: "pt" } }
// ]
```

#### `updateMany(updates)` - Atualizar Múltiplos
```javascript
const resultado = await db.updateMany([
    ["user:1", { nome: "João Silva", idade: 26 }],
    ["user:999", { nome: "Inexistente" }] // Não será atualizado
]);
// [
//   { key: "user:1", updated: true, value: {...} },
//   { key: "user:999", updated: false, value: null }
// ]
```

#### `deleteMany(keys)` - Deletar Múltiplos
```javascript
const deletados = await db.deleteMany(["temp1", "temp2", "cache:old"]);
console.log(`${deletados} registros deletados`);
```

---

## 🔍 **Métodos de Busca**

### **Busca Global**

#### `search(term, property?, options?)` - Busca global avançada
```javascript
// Buscar por qualquer propriedade, case-sensitive por padrão
const usuarios = await db.search("João");

// Buscar em propriedade específica, case-insensitive
const adultos = await db.search("São Paulo", "cidade", { caseSensitive: false });

// Buscar com opções específicas
const resultados = await db.search("Admin", "role", { caseSensitive: true, exactMatch: true });
```

### **Filtros Específicos**

#### `in(term, property?, key?)` - Busca por Inclusão
```javascript
// Buscar registros que contenham o termo
const resultados = await db.in("admin", "tipo");
```

#### `between(min, max, property?, key?)` - Valores Entre Limites
```javascript
// Usuários entre 18 e 65 anos
const adultos = await db.between(18, 65, "idade");

// Produtos em faixa de preço
const produtosFiltrados = await db.between(100, 500, "preco", "produtos");
```

#### `startsWith(query, key?)` - Inicia Com
```javascript
// IDs que começam com "user_"
const usuarios = await db.startsWith("user_");
```

#### `endsWith(query, key?)` - Termina Com
```javascript
// IDs que terminam com "_temp"
const temporarios = await db.endsWith("_temp");
```

#### `regex(pattern, property?, key?)` - Expressão Regular
```javascript
// Buscar emails válidos
const emails = await db.regex(/@gmail\.com$/, "email");

// Buscar telefones brasileiros
const telefones = await db.regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "telefone");
```

#### `compare(property, operator, value, key?)` - Comparação
```javascript
// Operadores: "==", "===", "!=", "!==", ">", "<", ">=", "<="
const ativos = await db.compare("status", "==", "ativo");
const maioresQue100 = await db.compare("pontos", ">", 100);
```

#### `custom(filterFunction, key?)` - Filtro Personalizado
```javascript
const complexo = await db.custom(async (entry) => {
    const { value } = entry;
    return value.idade > 18 && 
           value.cidade === "São Paulo" && 
           value.ativo === true;
});
```

### **Ordenação e Paginação**

#### `sort(key?, field, order?)` - Ordenar
```javascript
// Ordenar por idade (crescente)
const porIdade = await db.sort("", "idade", "asc");

// Ordenar por nome (decrescente)
const porNome = await db.sort("usuarios", "nome", "desc");
```

#### `limit(count, key?)` - Limitar Resultados
```javascript
const primeiros10 = await db.limit(10);
const top5Usuarios = await db.limit(5, "usuarios");
```

#### `skip(count, key?)` - Pular Registros
```javascript
const proximos10 = await db.skip(10); // Pular os primeiros 10
const pagina2 = await db.skip(20); // Para paginação
```

#### `distinct(field, key?)` - Valores Únicos
```javascript
const cidades = await db.distinct("cidade", "usuarios");
const categorias = await db.distinct("categoria", "produtos");
```

---

## 📊 **Operações Estatísticas**

### **Estatísticas Básicas**

#### `count(key?)` - Contar Registros
```javascript
const totalUsuarios = await db.count();
const totalProdutos = await db.count("produtos");
```

#### `sum(field, key?)` - Somar Valores
```javascript
const totalVendas = await db.sum("valor", "vendas");
const pontosTotais = await db.sum("pontos", "usuarios");
```

#### `avg(field, key?)` - Média
```javascript
const mediaIdade = await db.avg("idade", "usuarios");
const mediaPreco = await db.avg("preco", "produtos");
```

#### `min(field, key?)` - Valor Mínimo
```javascript
const menorPreco = await db.min("preco", "produtos");
const menorIdade = await db.min("idade", "usuarios");
```

#### `max(field, key?)` - Valor Máximo
```javascript
const maiorPreco = await db.max("preco", "produtos");
const maiorPontuacao = await db.max("pontos", "ranking");
```

### **Agregações Complexas**

#### `aggregate(operations)` - Múltiplas Operações
```javascript
const estatisticas = await db.aggregate([
    { type: 'count', key: 'usuarios' },
    { type: 'sum', field: 'pontos', key: 'usuarios' },
    { type: 'avg', field: 'idade', key: 'usuarios' },
    { type: 'min', field: 'idade', key: 'usuarios' },
    { type: 'max', field: 'pontos', key: 'usuarios' }
]);

// Resultado:
// {
//   count_all: 1500,
//   sum_pontos: 45000,
//   avg_idade: 28.5,
//   min_idade: 18,
//   max_pontos: 2500
// }
```

---

## 🩺 **Monitoramento e Diagnóstico**

#### `ping()` - Testar Conexão
```javascript
const resultado = await db.ping();
console.log(resultado);
// {
//   status: 'connected',
//   latency: 2.35,
//   timestamp: '2024-01-15T10:30:45.123Z',
//   driver: 'SqliteDriver'
// }

// Verificar saúde da aplicação
if (resultado.status === 'connected' && resultado.latency < 100) {
    console.log("✅ Sistema funcionando perfeitamente!");
} else {
    console.log("⚠️ Possíveis problemas de performance");
}
```

---

## 💾 **Backup e Restauração**

### **Backup Manual**

#### `backup(filePath)` - Criar Backup
```javascript
const backupInfo = await db.backup("./backups/backup-2024-01-15.json");
console.log(`Backup criado com ${backupInfo.data.length} registros`);
```

#### `restore(filePath)` - Restaurar Backup
```javascript
const restoreInfo = await db.restore("./backups/backup-2024-01-15.json");
console.log(`Restaurados ${restoreInfo.restored} registros`);
```

### **Exportação e Importação**

#### `export(format, filePath)` - Exportar Dados
```javascript
// Formatos suportados: 'json', 'csv', 'xml'
await db.export("json", "./exports/dados.json");
await db.export("csv", "./exports/relatorio.csv");
await db.export("xml", "./exports/backup.xml");
```

#### `import(filePath, format)` - Importar Dados
```javascript
const resultado = await db.import("./dados-externos.json", "json");
console.log(`Importados ${resultado.imported} de ${resultado.total} registros`);
```

---

## 📡 **Sistema de Eventos**

### **Eventos de Operações**

```javascript
// Eventos de escrita
db.on('beforeSet', (data) => {
    console.log('⏳ Salvando:', data.key);
});

db.on('set', (data) => {
    console.log('✅ Salvo:', data.key, data.value);
});

// Eventos de leitura
db.on('beforeGet', (data) => {
    console.log('⏳ Buscando:', data.key);
});

db.on('get', (data) => {
    console.log('✅ Encontrado:', data.key, data.value);
});

// Eventos de exclusão
db.on('beforeDelete', (data) => {
    console.log('⏳ Deletando:', data.key);
});

db.on('delete', (data) => {
    console.log('✅ Deletado:', data.key);
});

// Eventos de array
db.on('beforePush', (data) => {
    console.log('⏳ Adicionando ao array:', data.key, data.values);
});

db.on('push', (data) => {
    console.log('✅ Array atualizado:', data.key, 'Tamanho:', data.newLength);
});
```

### **Eventos de Monitoramento**

```javascript
// Eventos de conexão
db.on('beforePing', () => {
    console.log('🔍 Testando conexão...');
});

db.on('ping', (result) => {
    console.log(`🟢 Conexão OK: ${result.latency}ms`);
});

db.on('pingError', (result) => {
    console.log('🔴 Erro de conexão:', result.error);
});

// Eventos de backup
db.on('beforeBackup', (data) => {
    console.log('💾 Iniciando backup:', data.filePath);
});

db.on('backup', (data) => {
    console.log('✅ Backup concluído:', data.recordCount, 'registros');
});
```

---

## ⚡ **Funcionalidades Avançadas**

### **Cache Inteligente**

```javascript
// Habilitar cache
db.enableCache(1000, 300000); // 1000 itens, 5 minutos TTL

// Desabilitar cache
db.disableCache();
```

### **Backup Automático**

```javascript
// Habilitar backup automático
await db.enableAutoBackup({
    interval: 3600000, // 1 hora
    maxBackups: 24,    // Manter 24 backups
    path: "./backups"
});

// Parar backup automático
db.stopAutoBackup();
```

### **Validação de Schema**

```javascript
// Definir schema de validação
db.defineSchema({
    nome: { type: "string", required: true },
    idade: { type: "number", min: 0, max: 150 },
    email: { type: "string", pattern: /\S+@\S+\.\S+/ },
    ativo: { type: "boolean", default: true }
});
```

### **Sistema de Índices**

```javascript
// Criar índice para otimizar buscas
db.createIndex("email");   // Índice simples
db.createIndex("idade");   // Para buscas numéricas
```

### **Transações**

```javascript
// Iniciar transação
const transactionId = await db.beginTransaction();

try {
    await db.set("conta1.saldo", 1000);
    await db.set("conta2.saldo", 2000);

    // Confirmar transação
    await db.commitTransaction(transactionId);
    console.log("✅ Transação concluída");
} catch (error) {
    // Reverter em caso de erro
    await db.rollbackTransaction(transactionId);
    console.log("❌ Transação revertida");
}
```

### **Múltiplas Tabelas**

```javascript
// Trabalhar com diferentes tabelas
const usuarios = db.table("usuarios");
const produtos = db.table("produtos");
const pedidos = db.table("pedidos");

await usuarios.set("1", { nome: "João" });
await produtos.set("1", { nome: "Produto A", preco: 100 });
await pedidos.set("1", { usuario_id: 1, produto_id: 1 });

// Ou async
const logs = await db.tableAsync("logs");
await logs.push("entries", { timestamp: Date.now(), message: "Sistema iniciado" });
```

---

## ⚙️ **Configurações**

### **Configuração Completa**

```javascript
const db = new HelperDB({
    // 📁 Configurações básicas
    table: "minha_tabela",              // Nome da tabela (padrão: "json")
    filePath: "caminho/para/db.sqlite", // Arquivo do banco (padrão: "json.sqlite")
    normalKeys: false,                  // Notação de ponto (padrão: false)
    driver: new SqliteDriver("db.sqlite"), // Driver personalizado

    // 🚀 Cache e Performance
    enableCache: true,      // Habilitar cache (padrão: true)
    cacheSize: 2000,        // Tamanho do cache (padrão: 1000)
    cacheTTL: 600000,       // TTL do cache em ms (padrão: 300000 = 5min)

    // 💾 Sistema de Backup
    enableBackup: true,     // Backup automático (padrão: false)
    backupOptions: {
        interval: 1800000,  // Intervalo em ms (padrão: 3600000 = 1h)
        maxBackups: 5,      // Máximo de backups (padrão: 10)
        path: "./backups"   // Caminho dos backups (padrão: "./backups")
    },

    // ✅ Funcionalidades Avançadas
    enableValidation: true,    // Validação de schema (padrão: false)
    enableIndexing: true,      // Sistema de índices (padrão: false)
    enableTransactions: true   // Suporte a transações (padrão: false)
});
```

### **Configuração por Ambiente**

```javascript
const isProduction = process.env.NODE_ENV === 'production';

const dbConfig = {
    // Desenvolvimento
    development: {
        driver: new SqliteDriver("./dev.sqlite"),
        enableCache: true,
        enableBackup: false
    },

    // Produção
    production: {
        driver: new MySQLDriver({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        }),
        enableCache: true,
        enableBackup: true,
        enableValidation: true,
        enableIndexing: true,
        backupOptions: {
            interval: 3600000, // 1 hora
            maxBackups: 48     // 48 horas de backups
        }
    }
};

const db = new HelperDB(dbConfig[process.env.NODE_ENV || 'development']);
```

---

## 💡 **Exemplos Práticos**

### **Sistema de Usuários**

```javascript
const { HelperDB } = require('helper.db');

class UserManager {
    constructor() {
        this.db = new HelperDB({
            table: "usuarios",
            enableCache: true,
            enableValidation: true
        });

        // Definir schema de validação
        this.db.defineSchema({
            nome: { type: "string", required: true },
            email: { type: "string", pattern: /\S+@\S+\.\S+/, required: true },
            idade: { type: "number", min: 13, max: 120 },
            ativo: { type: "boolean", default: true },
            criado_em: { type: "string", required: true }
        });

        // Índices para performance
        this.db.createIndex("email");
        this.db.createIndex("ativo");
    }

    async init() {
        await this.db.init();
    }

    async criarUsuario(dados) {
        const usuario = {
            ...dados,
            id: this.gerarId(),
            criado_em: new Date().toISOString()
        };

        await this.db.set(`user:${usuario.id}`, usuario);
        return usuario;
    }

    async obterUsuario(id) {
        return await this.db.get(`user:${id}`);
    }

    async atualizarUsuario(id, dados) {
        const usuario = await this.obterUsuario(id);
        if (!usuario) throw new Error("Usuário não encontrado");

        const atualizado = { ...usuario, ...dados };
        await this.db.set(`user:${id}`, atualizado);
        return atualizado;
    }

    async deletarUsuario(id) {
        return await this.db.delete(`user:${id}`);
    }

    async listarUsuarios(filtros = {}) {
        let usuarios = await this.db.startsWith("user:");

        // Aplicar filtros
        if (filtros.ativo !== undefined) {
            usuarios = usuarios.filter(u => u.value.ativo === filtros.ativo);
        }

        if (filtros.idade_min) {
            usuarios = usuarios.filter(u => u.value.idade >= filtros.idade_min);
        }

        return usuarios.map(u => u.value);
    }

    async buscarPorEmail(email) {
        const resultados = await this.db.search(email, "email");
        return resultados.length > 0 ? resultados[0].value : null;
    }

    async estatisticas() {
        return await this.db.aggregate([
            { type: 'count', key: '' },
            { type: 'avg', field: 'idade', key: '' },
            { type: 'min', field: 'idade', key: '' },
            { type: 'max', field: 'idade', key: '' }
        ]);
    }

    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Uso
const userManager = new UserManager();
await userManager.init();

const novoUsuario = await userManager.criarUsuario({
    nome: "João Silva",
    email: "joao@email.com",
    idade: 28
});
```

### **Sistema de Cache com TTL**

```javascript
class CacheManager {
    constructor() {
        this.db = new HelperDB({
            driver: new MemoryDriver(),
            table: "cache"
        });
    }

    async init() {
        await this.db.init();

        // Limpar cache expirado a cada minuto
        setInterval(() => this.limparExpirados(), 60000);
    }

    async set(chave, valor, ttlSegundos = 300) {
        const item = {
            valor,
            expira_em: Date.now() + (ttlSegundos * 1000)
        };

        await this.db.set(chave, item);
    }

    async get(chave) {
        const item = await this.db.get(chave);

        if (!item) return null;

        if (Date.now() > item.expira_em) {
            await this.db.delete(chave);
            return null;
        }

        return item.valor;
    }

    async delete(chave) {
        return await this.db.delete(chave);
    }

    async limparExpirados() {
        const todos = await this.db.all();
        const agora = Date.now();

        for (const entrada of todos) {
            if (entrada.value.expira_em < agora) {
                await this.db.delete(entrada.id);
            }
        }
    }

    async estatisticas() {
        const total = await this.db.count();
        const stats = this.db.driver.getStats();

        return {
            total_itens: total,
            memoria_usada: stats.cache?.sizeEstimate || 0,
            cache_hits: this.hits || 0,
            cache_misses: this.misses || 0
        };
    }
}
```

### **Sistema de Ranking de Jogadores**

```javascript
class RankingManager {
    constructor() {
        this.db = new HelperDB({
            table: "ranking",
            enableCache: true,
            cacheSize: 500
        });
    }

    async init() {
        await this.db.init();
    }

    async adicionarJogador(id, nome, pontos = 0) {
        await this.db.set(`player:${id}`, {
            id,
            nome,
            pontos,
            nivel: this.calcularNivel(pontos),
            ultima_atualizacao: new Date().toISOString()
        });
    }

    async adicionarPontos(id, pontos) {
        const jogador = await this.db.get(`player:${id}`);
        if (!jogador) throw new Error("Jogador não encontrado");

        const novosPontos = jogador.pontos + pontos;
        const novoNivel = this.calcularNivel(novosPontos);

        await this.db.set(`player:${id}`, {
            ...jogador,
            pontos: novosPontos,
            nivel: novoNivel,
            ultima_atualizacao: new Date().toISOString()
        });

        return { pontos: novosPontos, nivel: novoNivel };
    }

    async obterRanking(limite = 10) {
        const jogadores = await this.db.startsWith("player:");

        return jogadores
            .sort((a, b) => b.value.pontos - a.value.pontos)
            .slice(0, limite)
            .map((jogador, index) => ({
                posicao: index + 1,
                ...jogador.value
            }));
    }

    async obterPosicao(id) {
        const ranking = await this.obterRanking(1000); // Top 1000
        const posicao = ranking.findIndex(j => j.id === id);
        return posicao >= 0 ? posicao + 1 : null;
    }

    async estatisticasGerais() {
        return await this.db.aggregate([
            { type: 'count', key: '' },
            { type: 'sum', field: 'pontos', key: '' },
            { type: 'avg', field: 'pontos', key: '' },
            { type: 'max', field: 'pontos', key: '' },
            { type: 'avg', field: 'nivel', key: '' }
        ]);
    }

    calcularNivel(pontos) {
        return Math.floor(Math.sqrt(pontos / 100)) + 1;
    }
}
```

---

## 📋 **Regras de Uso**

### **✅ Boas Práticas**

#### **1. Inicialização**
```javascript
// ✅ CERTO - Sempre aguarde a inicialização
const db = new HelperDB();
await db.init();

// ❌ ERRADO - Não usar sem inicializar
const db = new HelperDB();
await db.set("chave", "valor"); // Pode falhar
```

#### **2. Gerenciamento de Conexões**
```javascript
// ✅ CERTO - Feche conexões quando necessário
const mysqlDriver = new MySQLDriver(config);
await mysqlDriver.connect();
const db = new HelperDB({ driver: mysqlDriver });

// ... uso da aplicação ...

await mysqlDriver.disconnect(); // Importante!

// ✅ CERTO - Reutilize conexões
const driver = new MySQLDriver(config);
await driver.connect();

const db1 = new HelperDB({ driver, table: "usuarios" });
const db2 = new HelperDB({ driver, table: "produtos" });
```

#### **3. Tratamento de Erros**
```javascript
// ✅ CERTO - Sempre trate erros
try {
    const resultado = await db.set("chave", valor);
    console.log("✅ Salvo com sucesso");
} catch (error) {
    console.error("❌ Erro ao salvar:", error.message);
}

// ✅ CERTO - Use eventos para monitoramento
db.on('error', (error) => {
    console.error("Erro no banco:", error);
    // Enviar para sistema de log/monitoramento
});
```

#### **4. Performance**
```javascript
// ✅ CERTO - Use operações em lote
const dados = [
    ["user:1", { nome: "João" }],
    ["user:2", { nome: "Maria" }]
];
await db.setMany(dados); // Muito mais rápido

// ❌ EVITE - Múltiplas operações individuais
await db.set("user:1", { nome: "João" });
await db.set("user:2", { nome: "Maria" }); // Lento
```

#### **5. Estrutura de Dados**
```javascript
// ✅ CERTO - Use chaves organizadas
await db.set("user:123", userData);
await db.set("product:456", productData);
await db.set("order:789", orderData);

// ✅ CERTO - Use notação de ponto para objetos aninhados
await db.set("config.database.host", "localhost");
await db.set("user:123.preferences.theme", "dark");
```

### **⚠️ Limitações e Cuidados**

#### **1. MemoryDriver**
```javascript
// ⚠️ CUIDADO - Dados não persistem
const db = new HelperDB({ driver: new MemoryDriver() });
// Dados são perdidos quando a aplicação reinicia
```

#### **2. JSONDriver**
```javascript
// ⚠️ CUIDADO - Performance limitada
const db = new HelperDB({ driver: new JSONDriver() });
// Não adequado para >10.000 registros ou alta concorrência
```

#### **3. Drivers de Rede**
```javascript
// ⚠️ CUIDADO - Sempre verifique conexão
const driver = new MySQLDriver(config);

// Teste a conexão periodicamente
setInterval(async () => {
    const ping = await db.ping();
    if (ping.status !== 'connected') {
        console.log("⚠️ Problema de conexão:", ping.error);
        // Implementar reconexão automática
    }
}, 30000);
```

#### **4. Transações**
```javascript
// ⚠️ CUIDADO - Nem todos os drivers suportam transações
// Apenas SQLite, MySQL, MariaDB e PostgreSQL
const db = new HelperDB({ 
    driver: new MySQLDriver(config),
    enableTransactions: true 
});

// MemoryDriver e JSONDriver não suportam transações reais
```

### **🔒 Segurança**

#### **1. Validação de Entrada**
```javascript
// ✅ SEMPRE valide dados de entrada
function validarUsuario(dados) {
    if (!dados.email || !dados.email.includes('@')) {
        throw new Error("Email inválido");
    }
    if (dados.idade < 0 || dados.idade > 150) {
        throw new Error("Idade inválida");
    }
}

// Ou use schema validation
db.defineSchema({
    email: { type: "string", pattern: /\S+@\S+\.\S+/, required: true },
    idade: { type: "number", min: 0, max: 150 }
});
```

#### **2. Sanitização**
```javascript
// ✅ CERTO - Sanitize chaves
function sanitizeKey(key) {
    return key.replace(/[^a-zA-Z0-9:._-]/g, '');
}

const chave = sanitizeKey(userInput);
await db.set(chave, valor);
```

### **📈 Monitoramento**

#### **1. Métricas de Performance**
```javascript
// ✅ Monitore latência regularmente
setInterval(async () => {
    const ping = await db.ping();

    if (ping.latency > 100) {
        console.warn(`⚠️ Alta latência: ${ping.latency}ms`);
    }

    // Enviar métricas para sistema de monitoramento
    metrics.gauge('db.latency', ping.latency);
    metrics.gauge('db.status', ping.status === 'connected' ? 1 : 0);
}, 10000);
```

#### **2. Logs de Operações**
```javascript
// ✅ Configure logs detalhados
db.on('set', (data) => {
    logger.info('DB_SET', { key: data.key, size: JSON.stringify(data.value).length });
});

db.on('get', (data) => {
    logger.info('DB_GET', { key: data.key, found: data.value !== null });
});
```

### **🔄 Backup e Recuperação**

#### **1. Estratégia de Backup**
```javascript
// ✅ Configure backups automáticos para produção
const db = new HelperDB({
    enableBackup: true,
    backupOptions: {
        interval: 3600000, // 1 hora
        maxBackups: 48,    // 48 horas de histórico
        path: "./backups"
    }
});

// ✅ Backup manual antes de operações críticas
await db.backup(`./backups/pre-migration-${Date.now()}.json`);
// ... operação crítica ...
```

#### **2. Teste de Recuperação**
```javascript
// ✅ Teste regularmente a recuperação
async function testarBackup() {
    // Criar backup
    await db.backup('./test-backup.json');

    // Criar nova instância
    const testDb = new HelperDB({ filePath: './test.sqlite' });
    await testDb.init();

    // Restaurar backup
    await testDb.restore('./test-backup.json');

    // Verificar dados
    const dados = await testDb.all();
    console.log(`✅ Backup funcional: ${dados.length} registros restaurados`);
}
```

---

## 🎯 **Casos de Uso Recomendados**

### **Por Driver**

| Driver | Ideal Para | Não Recomendado Para |
|--------|------------|---------------------|
| **SqliteDriver** | Desenvolvimento, apps pequenos/médios, prototipagem | Apps com alta concorrência, múltiplas instâncias |
| **MySQLDriver** | Produção, alta concorrência, aplicações web | Desenvolvimento simples, prototipagem rápida |
| **MariaDBDriver** | Alternativa open-source ao MySQL | Casos específicos que precisam de funcionalidades únicas do MySQL |
| **MongoDriver** | Dados não estruturados, JSON complexo, escalabilidade horizontal | Dados relacionais, transações ACID críticas |
| **JSONDriver** | Desenvolvimento, configurações, dados pequenos | Produção, alta performance, dados grandes |
| **MemoryDriver** | Cache, dados temporários, testes | Persistência, dados críticos |

### **Por Tamanho de Dados**

| Tamanho | Driver Recomendado | Observações |
|---------|-------------------|-------------|
| < 1.000 registros | JSONDriver, MemoryDriver | Ideal para desenvolvimento |
| 1.000 - 10.000 | SqliteDriver, JSONDriver | SQLite preferível para performance |
| 10.000 - 100.000 | SqliteDriver, MySQL/MariaDB | Considere indexação |
| 100.000+ | MySQL/MariaDB, MongoDB | Essencial usar índices e cache |

---

## 🔧 **Troubleshooting**

### **Problemas Comuns**

#### **1. "prepare is not a function"**
```javascript
// ❌ ERRADO
const db = new HelperDB({ driver: 'MemoryDriver' });

// ✅ CERTO
const db = new HelperDB({ driver: new MemoryDriver() });
```

#### **2. "Database malformed" (JSONDriver)**
```javascript
// Solução: Deletar arquivo corrompido e recriá-lo
const fs = require('fs');
if (fs.existsSync('./dados.json')) {
    fs.unlinkSync('./dados.json');
}
```

#### **3. Conexão MySQL/MariaDB falhando**
```javascript
// Verificar configuração
const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // Adicionar timeout
    acquireTimeout: 60000,
    timeout: 60000
};

const driver = new MySQLDriver(config);

try {
    await driver.connect();
    console.log("✅ Conectado ao MySQL");
} catch (error) {
    console.error("❌ Erro de conexão:", error.message);
}
```

#### **4. Performance Lenta**
```javascript
// Soluções:
// 1. Habilitar cache
db.enableCache(2000, 600000);

// 2. Usar operações em lote
await db.setMany(dados);

// 3. Criar índices
db.createIndex('campo_pesquisado');

// 4. Monitorar latência
const ping = await db.ping();
if (ping.latency > 100) {
    console.warn('Performance degradada');
}
```

---

## 📞 **Suporte e Recursos**

### **Links Úteis**
- 📦 **NPM**: https://www.npmjs.com/package/helper.db
- 📖 **GitHub**: https://github.com/Lucas46521/Helper.db
- 🐛 **Issues**: https://github.com/Lucas46521/Helper.db/issues
- 💬 **Discussões**: https://github.com/Lucas46521/Helper.db/discussions

### **Versão Atual**
- **v1.4.0** - Sistema Completo de Produção
- Suporte a TypeScript, Transações, Índices, Cache e muito mais

### **Licença**
MIT License - Uso libre com atribuição obrigatória

---

**© 2024 Helper.DB by Lucas46521**
*"Simplicidade e poder em suas mãos"*