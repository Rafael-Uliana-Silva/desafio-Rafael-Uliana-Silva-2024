const animais = [
    { especie: "LEAO", habitat: "savana", tamanho: 3, carnivoro: true },
    { especie: "LEOPARDO", habitat: "savana", tamanho: 2, carnivoro: true },
    { especie: "CROCODILO", habitat: "rio", tamanho: 3, carnivoro: true },
    { especie: "MACACO", habitat: ["savana", "floresta"], tamanho: 1, carnivoro: false },
    { especie: "GAZELA", habitat: "savana", tamanho: 2, carnivoro: false },
    { especie: "HIPOPOTAMO", habitat: ["savana", "rio"], tamanho: 4, carnivoro: false },
];

const recintos = [
    { nome: "Recinto 1", bioma: "savana", capacidade: 10, ocupacao: 3, especiesPresentes: ["MACACO"] },
    { nome: "Recinto 2", bioma: "floresta", capacidade: 5, ocupacao: 0, especiesPresentes: [] },
    { nome: "Recinto 3", bioma: ["savana", "rio"], capacidade: 7, ocupacao: 2, especiesPresentes: ["GAZELA"] },
    { nome: "Recinto 4", bioma: "rio", capacidade: 8, ocupacao: 0, especiesPresentes: [] },
    { nome: "Recinto 5", bioma: "savana", capacidade: 9, ocupacao: 3, especiesPresentes: ["LEAO"] },
];

class RecintosZoo {
    biomaCompatível(animalHabitat, recintoBioma) {
        if (Array.isArray(animalHabitat)) {
            return animalHabitat.some(habitat => Array.isArray(recintoBioma) ? recintoBioma.includes(habitat) : habitat === recintoBioma);
        }
        return Array.isArray(recintoBioma) ? recintoBioma.includes(animalHabitat) : animalHabitat === recintoBioma;
    }

    analisaRecintos(animalEspecie, quantidade) {
        const animal = animais.find(a => a.especie === animalEspecie);
        if (!animal) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const recintosViaveis = [];
        const espacoNecessarioTotal = animal.tamanho * quantidade;

        recintos.forEach(recinto => {
            let espacoRestante = recinto.capacidade - recinto.ocupacao;
            let espacoNecessario = espacoNecessarioTotal;

            if (!this.biomaCompatível(animal.habitat, recinto.bioma)) {
                return;
            }

            if (recinto.especiesPresentes.length > 0) {
                const especiePresente = animais.find(a => a.especie === recinto.especiesPresentes[0]);
                if (especiePresente.carnivoro || animal.carnivoro) {
                    return;
                }
                espacoNecessario += 1; 
            }

            if (animalEspecie === "HIPOPOTAMO") {
                if (!recinto.bioma.includes("savana") || !recinto.bioma.includes("rio")) {
                    return;
                }
            }

            if (animalEspecie === "MACACO" && quantidade === 1) {
                return { erro: "Não há recinto viável" };
            }

            if (espacoRestante < espacoNecessario) {
                return;
            }

            recintosViaveis.push(`${recinto.nome} (espaço livre: ${espacoRestante - espacoNecessario} total: ${recinto.capacidade})`);
        });

        return recintosViaveis.length > 0 
            ? { recintosViaveis } 
            : { erro: "Não há recinto viável" };
    }
}

export { RecintosZoo as RecintosZoo };
