class RecintosZoo {
    constructor() {
         // Inicializa os recintos do zoológico com suas características e animais
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana', tamanhoTotal: 7, animais: [{ especie: 'LEAO', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana e rio', tamanhoTotal: 9, animais: [{ especie: 'GAZELA', quantidade: 1 }] }
        ];
          // Informações sobre cada tipo de animal
        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'] },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
            'CROCODILO': { tamanho: 3, biomas: ['rio'] },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, biomas: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
        };
    }
    // Método para analisar quais recintos são viáveis para um determinado animal e quantidade
    analisaRecintos(animal, quantidade) {
         // Verifica se o animal é válido
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }
        // Verifica se a quantidade é válida
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }
        // Obtém as informações do animal
        const animalInfo = this.animais[animal];
        const recintosViaveis = [];
         // Itera sobre os recintos para verificar quais são viáveis
        for (const recinto of this.recintos) {
             // Calcula o espaço ocupado pelos animais já existentes no recinto
            const espacoOcupado = recinto.animais.reduce((acc, a) => acc + (a.quantidade * this.animais[a.especie].tamanho), 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            // Verifica se o recinto é adequado para o animal
            if (animalInfo.biomas.includes(recinto.bioma) && espacoLivre >= (animalInfo.tamanho * quantidade)) {
                 // Verifica o conforto dos animais no recinto
                if (this.verificaConforto(recinto, animal, quantidade)) {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (animalInfo.tamanho * quantidade)} total: ${recinto.tamanhoTotal})`);
                }
            }
        }
         // Se não houver recintos viáveis, retorna um erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
          // Retorna a lista de recintos viáveis
        return { recintosViaveis };
    }
     // Método para verificar se o recinto é confortável para o animal
    verificaConforto(recinto, tipoAnimal, quantidade) {
        const animaisExistentes = recinto.animais.map(a => a.especie);
        const carnivoros = ['LEAO', 'LEOPARDO', 'CROCODILO'];
          // Verifica se carnívoros são compatíveis com outros animais no recinto
        if (carnivoros.includes(tipoAnimal) && animaisExistentes.length > 0 && !animaisExistentes.includes(tipoAnimal)) {
            return false;
        }
        // Verifica se hipopótamos são compatíveis com o bioma do recinto
        if (tipoAnimal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && animaisExistentes.length > 0) {
            return false;
        }
        // Verifica se macacos são compatíveis com um recinto vazio
        if (tipoAnimal === 'MACACO' && !animaisExistentes.length === 0) {
            return false;
        }
         // Verifica se o animal não deve coexistir com outros carnívoros
        for (const animal of recinto.animais) {
            if (carnivoros.includes(animal.especie) && animal.especie == tipoAnimal) {
                return false;
            }
        }

        return true;
    }
}

export { RecintosZoo };

