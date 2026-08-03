// Banco de dados em memoria para simulacao
const users = [
    { id: 1, nome: "Admin", role: "gerente" },
    { id: 2, nome: "Operador", role: "estoquista" }
];

module.exports = {
    getAll: () => users,
    getById: (id) => users.find(u => u.id === id)
};